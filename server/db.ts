import mongoose, { Schema } from "mongoose"
import dotenv from "dotenv"
import path from "path"

// Vite does not load server-only environment variables. Loading this file is
// useful for local development; Vercel injects MONGODB_URI directly.
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") })

function getMongoUri() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("MONGODB_URI is not configured. Add it to your Vercel project environment variables.")
  }
  return uri
}

/*
 * Serverless‑friendly MongoDB connection helper.
 * Vercel (and other serverless platforms) may spin up separate instances
 * for each request, so a simple in‑memory flag (`isConnected`) does not work.
 * Instead we cache the connection (or the pending promise) on the global
 * object. This ensures that within the same container the connection is
 * reused, while each new container creates its own connection as needed.
 */

type CachedMongoose = {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

// Use a property on the global object to share the cache across imports.
declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var mongooseCache: CachedMongoose | undefined
}

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null }
}

export async function connectDB() {
  const cache = global.mongooseCache!
  if (cache.conn) {
    // Connection already established – reuse it
    return cache.conn
  }
  if (!cache.promise) {
    const MONGODB_URI = getMongoUri()
    const dbName = MONGODB_URI.includes("/?") || MONGODB_URI.endsWith("/") ? "hospital_db" : undefined
    const options = {
      ...(dbName ? { dbName } : {}),
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10_000,
    }
    cache.promise = mongoose.connect(MONGODB_URI, options)
  }
  try {
    cache.conn = await cache.promise
    console.log("✅ Connected to MongoDB via Mongoose (serverless cache)")
    return cache.conn
  } catch (err) {
    // A rejected promise must not be cached: a later serverless invocation may
    // succeed after a transient network failure.
    cache.promise = null
    console.error("❌ Failed to connect to MongoDB:", err)
    throw err
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

// 4. Reviews Schema & Model
export interface IReview {
  name: string
  description: string
  rating: number
  createdAt: number
}

const ReviewSchema = new Schema<IReview>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    rating: { type: Number, required: true },
    createdAt: { type: Number, default: () => Date.now() },
  },
  { collection: "reviews" }
)

export const ReviewModel =
  mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema)

export function formatDoc(doc: any) {
  const obj = doc.toObject ? doc.toObject() : { ...doc }
  obj.id = obj._id.toString()
  delete obj._id
  delete obj.__v
  return obj
}
