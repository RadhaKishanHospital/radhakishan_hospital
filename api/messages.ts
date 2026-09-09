import type { VercelRequest, VercelResponse } from "@vercel/node"
import mongoose, { Schema } from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || ""
let isConnected = false
async function connectDB() {
  if (isConnected) return
  await mongoose.connect(MONGODB_URI, { dbName: "hospital_db" })
  isConnected = true
}

const MessageSchema = new Schema(
  {
    name: { type: String, required: true },
    phone_no: { type: Number, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Number, default: () => Date.now() },
  },
  { collection: "messages" }
)
const Message =
  mongoose.models.Message ||
  mongoose.model("Message", MessageSchema)

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
      const list = await Message.find().sort({ createdAt: -1 })
      return res.status(200).json(list.map(formatDoc))
    }
    if (req.method === "POST") {
      const body = req.body
      const doc = await Message.create({
        name: body.name,
        phone_no: Number(body.phone_no || body.number || 0) || 0,
        subject: body.subject,
        body: body.body || body.message || "",
        read: false,
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
