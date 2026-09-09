import mongoose, { Schema } from "mongoose"
import dotenv from "dotenv"

// Vite's server plugin runs in Node, so load the local development value here.
// On Vercel, MONGODB_URI is supplied through the project's environment settings.
dotenv.config({ path: ".env.local" })

/**
 * Keep the connection promise on the Node global so a warm Vercel function
 * reuses it instead of opening a new connection for every request.
 */
declare global {
  // eslint-disable-next-line no-var
  var mongooseConnection: Promise<typeof mongoose> | undefined
}

export async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose

  const uri = (globalThis as typeof globalThis & {
    process?: { env?: Record<string, string | undefined> }
  }).process?.env?.MONGODB_URI
  if (!uri) {
    throw new Error("MONGODB_URI is not configured")
  }

  mongoose.set("bufferCommands", false)
  globalThis.mongooseConnection ??= mongoose.connect(uri)

  try {
    return await globalThis.mongooseConnection
  } catch (error) {
    globalThis.mongooseConnection = undefined
    throw error
  }
}

const statusValues = ["pending", "confirmed", "cancelled", "completed"] as const

const GeneralAppointmentSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String, default: "", trim: true },
    status: { type: String, enum: statusValues, default: "pending" },
    createdAt: { type: Number, default: Date.now },
  },
  { collection: "general_appointments" },
)

const DoctorAppointmentSchema = new Schema(
  {
    patientName: { type: String, required: true, trim: true },
    patientEmail: { type: String, required: true, trim: true },
    patientPhone: { type: String, required: true, trim: true },
    doctorId: { type: String, required: true },
    doctorName: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, enum: statusValues, default: "pending" },
    createdAt: { type: Number, default: Date.now },
  },
  { collection: "doctor_appointments" },
)

const MessageSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    phone_no: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    body: { type: String, required: true, trim: true },
    read: { type: Boolean, default: false },
    createdAt: { type: Number, default: Date.now },
  },
  { collection: "messages" },
)

export const GeneralAppointmentModel = mongoose.models.GeneralAppointment ?? mongoose.model("GeneralAppointment", GeneralAppointmentSchema)
export const DoctorAppointmentModel = mongoose.models.DoctorAppointment ?? mongoose.model("DoctorAppointment", DoctorAppointmentSchema)
export const MessageModel = mongoose.models.Message ?? mongoose.model("Message", MessageSchema)

export function formatDoc(doc: { toObject?: () => Record<string, unknown>; _id?: { toString: () => string } }) {
  const object = doc.toObject ? doc.toObject() : { ...doc }
  return {
    ...object,
    id: doc._id?.toString(),
    _id: undefined,
    __v: undefined,
  }
}
