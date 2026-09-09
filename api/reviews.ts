import type { VercelRequest, VercelResponse } from "@vercel/node"
import mongoose, { Schema } from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || ""
let isConnected = false
async function connectDB() {
  if (isConnected) return
  await mongoose.connect(MONGODB_URI, { dbName: "hospital_db" })
  isConnected = true
}

const ReviewSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Number, default: () => Date.now() },
  },
  { collection: "reviews" }
)
const Review =
  mongoose.models.Review ||
  mongoose.model("Review", ReviewSchema)

function formatDoc(doc: any) {
  const obj = doc.toObject ? doc.toObject() : { ...doc }
  obj.id = obj._id.toString()
  delete obj._id
  delete obj.__v
  return obj
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await connectDB()
    if (req.method === "GET") {
      const list = await Review.find().sort({ createdAt: -1 })
      return res.status(200).json(list.map(formatDoc))
    }
    if (req.method === "POST") {
      const body = req.body
      const doc = await Review.create({
        name: body.name,
        description: body.description,
        rating: Number(body.rating) || 5,
        createdAt: Date.now(),
      })
      return res.status(201).json(formatDoc(doc))
    }
    return res.status(405).json({ error: "Method not allowed" })
  } catch (err: any) {
    console.error("API error:", err)
    return res.status(500).json({ error: err.message })
  }
}
