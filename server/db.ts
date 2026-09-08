import mongoose, { Schema, Document } from "mongoose"
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://devdomain15_db_user:yVkYpPQVmEOtFpNH@devdomain02.vnqb2be.mongodb.net/hospital_db?retryWrites=true&w=majority"

let isConnected = false

export async function connectDB() {
  if (isConnected) return
  try {
    const dbName = MONGODB_URI.includes("/?") || MONGODB_URI.endsWith("/") ? "hospital_db" : undefined
    await mongoose.connect(MONGODB_URI, dbName ? { dbName: "hospital_db" } : {})
    isConnected = true
    console.log("Connected to MongoDB via Mongoose successfully")
    await seedInitialData()
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err)
  }
}

// 1. General Appointment Schema & Model
export interface IGeneralAppointment {
  name: string
  email: string
  phone: string
  department: string
  date: string
  time: string
  notes?: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: number
}

const GeneralAppointmentSchema = new Schema<IGeneralAppointment>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String, default: "" },
    status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
    createdAt: { type: Number, default: () => Date.now() },
  },
  { collection: "general_appointments" }
)

export const GeneralAppointmentModel =
  mongoose.models.GeneralAppointment ||
  mongoose.model<IGeneralAppointment>("GeneralAppointment", GeneralAppointmentSchema)

// 2. Doctor Appointment Schema & Model
export interface IDoctorAppointment {
  patientName: string
  patientEmail: string
  patientPhone: string
  doctorId: string
  doctorName: string
  specialty: string
  date: string
  time: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: number
}

const DoctorAppointmentSchema = new Schema<IDoctorAppointment>(
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

export const DoctorAppointmentModel =
  mongoose.models.DoctorAppointment ||
  mongoose.model<IDoctorAppointment>("DoctorAppointment", DoctorAppointmentSchema)

// 3. Messages Schema & Model
export interface IMessage {
  name: string
  phone_no: number
  subject: string
  body: string
  read: boolean
  createdAt: number
}

const MessageSchema = new Schema<IMessage>(
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

export const MessageModel =
  mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema)

async function seedInitialData() {
  const now = Date.now()
  const day = 86_400_000

  const genCount = await GeneralAppointmentModel.countDocuments()
  if (genCount === 0) {
    await GeneralAppointmentModel.insertMany([
      {
        name: "Ramesh Gupta",
        email: "ramesh@example.com",
        phone: "+91 98765 43210",
        department: "General Medicine",
        date: "2026-08-22",
        time: "10:00 AM",
        notes: "Recurring headaches for the past two weeks.",
        status: "pending",
        createdAt: now - day * 0.5,
      },
      {
        name: "Priya Nair",
        email: "priya.nair@example.com",
        phone: "+91 91234 56780",
        department: "Dermatology",
        date: "2026-08-23",
        time: "2:30 PM",
        notes: "Skin allergy consultation.",
        status: "confirmed",
        createdAt: now - day * 2,
      },
      {
        name: "Mohit Sethi",
        email: "mohit.sethi@example.com",
        phone: "+91 99887 66554",
        department: "ENT",
        date: "2026-08-24",
        time: "11:30 AM",
        status: "pending",
        createdAt: now - day * 1.2,
      },
    ])
    console.log("Seeded initial general_appointments")
  }

  const docCount = await DoctorAppointmentModel.countDocuments()
  if (docCount === 0) {
    await DoctorAppointmentModel.insertMany([
      {
        patientName: "Neha Kapoor",
        patientEmail: "neha.k@example.com",
        patientPhone: "+91 90000 11122",
        doctorId: "d1",
        doctorName: "Dr. Sarah Mitchell",
        specialty: "Cardiology",
        date: "2026-08-21",
        time: "9:30 AM",
        status: "confirmed",
        createdAt: now - day * 1,
      },
      {
        patientName: "Arjun Singh",
        patientEmail: "arjun.singh@example.com",
        patientPhone: "+91 98111 22233",
        doctorId: "d2",
        doctorName: "Dr. Rajeev Sharma",
        specialty: "Orthopedics",
        date: "2026-08-25",
        time: "4:00 PM",
        status: "pending",
        createdAt: now - day * 0.2,
      },
    ])
    console.log("Seeded initial doctor_appointments")
  }

  const msgCount = await MessageModel.countDocuments()
  if (msgCount === 0) {
    await MessageModel.insertMany([
      {
        name: "Suresh Kumar",
        phone_no: 987653456,
        subject: "Insurance query",
        body: "Do you accept Star Health insurance for cardiac procedures? Please advise.",
        read: false,
        createdAt: now - day * 0.3,
      },
      {
        name: "Kavita Rao",
        phone_no: 9234504567,
        subject: "Feedback on my visit",
        body: "Thank you to Dr. Verma and the pediatric team — wonderful experience with my daughter.",
        read: true,
        createdAt: now - day * 3,
      },
    ])
    console.log("Seeded initial messages")
  }
}

export function formatDoc(doc: any) {
  const obj = doc.toObject ? doc.toObject() : { ...doc }
  obj.id = obj._id.toString()
  delete obj._id
  delete obj.__v
  return obj
}
