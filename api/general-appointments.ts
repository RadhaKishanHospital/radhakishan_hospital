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
  try {
    await connectDB()
    if (req.method === "GET") {
      const list = await GeneralAppointment.find().sort({ createdAt: -1 })
      return res.status(200).json(list.map(formatDoc))
    }
    if (req.method === "POST") {
      const body = req.body
      const doc = await GeneralAppointment.create({
        name: body.name,
        fatherName: body.fatherName || body.father_name || body.father || "",
        dob: body.dob || body.dateOfBirth || body.date_of_birth || "",
        address: body.address || body.fullAddress || body.location || "",
        email: body.email,
        phone: body.phone,
        date: body.date,
        time: body.time,
        notes: body.notes || body.message || "",
        status: body.status || "pending",
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
