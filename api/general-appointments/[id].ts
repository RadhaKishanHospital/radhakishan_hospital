import type { VercelRequest, VercelResponse } from "@vercel/node"
import mongoose, { Schema } from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || ""
let isConnected = false
async function connectDB() {
  if (isConnected) return
  await mongoose.connect(MONGODB_URI, { dbName: "hospital_db" })
  isConnected = true
}

const GeneralAppointmentSchema = new Schema(
  {
    name: { type: String, required: true },
    fatherName: { type: String, default: "" },
    dob: { type: String, default: "" },
    address: { type: String, default: "" },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String, default: "" },
    status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
    createdAt: { type: Number, default: () => Date.now() },
  },
  { collection: "general_appointments", strict: false }
)

if (mongoose.models.GeneralAppointment) {
  try {
    delete mongoose.models.GeneralAppointment
  } catch (e) {}
}

const GeneralAppointment =
  mongoose.models.GeneralAppointment ||
  mongoose.model("GeneralAppointment", GeneralAppointmentSchema)

function formatDoc(doc: any) {
  const obj = doc.toObject ? doc.toObject() : { ...doc }
  obj.id = obj._id.toString()
  delete obj._id
  delete obj.__v
  return obj
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query as { id: string }
  try {
    await connectDB()
    if (req.method === "PATCH") {
      const updated = await GeneralAppointment.findByIdAndUpdate(id, req.body, { new: true })
      return res.status(200).json(updated ? formatDoc(updated) : { error: "Not found" })
    }
    if (req.method === "DELETE") {
      await GeneralAppointment.findByIdAndDelete(id)
      return res.status(200).json({ success: true })
    }
    return res.status(405).json({ error: "Method not allowed" })
  } catch (err: any) {
    console.error("API error:", err)
    return res.status(500).json({ error: err.message })
  }
}
