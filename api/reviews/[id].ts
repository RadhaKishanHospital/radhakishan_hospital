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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query as { id: string }
  try {
    await connectDB()
    if (req.method === "DELETE") {
      await Review.findByIdAndDelete(id)
      return res.status(200).json({ success: true })
    }
    return res.status(405).json({ error: "Method not allowed" })
  } catch (err: any) {
    console.error("API error:", err)
    return res.status(500).json({ error: err.message })
  }
}
