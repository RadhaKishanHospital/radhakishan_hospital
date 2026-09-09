import type { VercelRequest, VercelResponse } from "@vercel/node"
import mongoose, { Schema } from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI || ""
let isConnected = false
async function connectDB() {
  if (isConnected) return
  await mongoose.connect(MONGODB_URI, { dbName: "hospital_db" })
  isConnected = true
}

const DoctorAppointmentSchema = new Schema(
  {
    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },
    patientPhone: { type: String, required: true },
    doctorId: { type: String, default: "d1" },
    doctorName: { type: String, required: true },
    specialty: { type: String, default: "" },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
    createdAt: { type: Number, default: () => Date.now() },
  },
  { collection: "doctor_appointments" }
)
const DoctorAppointment =
  mongoose.models.DoctorAppointment ||
  mongoose.model("DoctorAppointment", DoctorAppointmentSchema)

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
      const list = await DoctorAppointment.find().sort({ createdAt: -1 })
      return res.status(200).json(list.map(formatDoc))
    }
    if (req.method === "POST") {
      const body = req.body
      const doc = await DoctorAppointment.create({
        patientName: body.patientName || body.name,
        patientEmail: body.patientEmail || body.email,
        patientPhone: body.patientPhone || body.mobile || body.phone,
        doctorId: body.doctorId || "d1",
        doctorName: body.doctorName,
        specialty: body.specialty || "General Medicine",
        date: body.date,
        time: body.time || body.slot || "10:00 AM",
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
