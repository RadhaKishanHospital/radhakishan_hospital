import mongoose, { Schema } from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI
const connectionState = globalThis as typeof globalThis & {
  __hospitalMongoConnection?: Promise<typeof mongoose>
}

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured")
  }

  if (mongoose.connection.readyState === 1) return

  connectionState.__hospitalMongoConnection ??= mongoose.connect(MONGODB_URI, {
    dbName: "hospital_db",
    maxPoolSize: 1,
    minPoolSize: 0,
    serverSelectionTimeoutMS: 8_000,
    connectTimeoutMS: 8_000,
  })

  try {
    await connectionState.__hospitalMongoConnection
  } catch (error) {
    connectionState.__hospitalMongoConnection = undefined
    throw error
  }
}

// 1. General Appointment Schema & Model
export interface IGeneralAppointment {
  requestId: string
  name: string
  email: string
  phone: string
  department?: string
  date: string
  time: string
  notes?: string
  status: "pending" | "confirmed" | "cancelled" | "completed"
  createdAt: number
}

const GeneralAppointmentSchema = new Schema<IGeneralAppointment>(
  {
    requestId: { type: String, required: true, immutable: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    // Kept optional so existing records remain readable after the field was
    // removed from the public appointment form.
    department: { type: String },
    date: { type: String, required: true },
    time: { type: String, required: true },
    notes: { type: String, default: "" },
    status: { type: String, enum: ["pending", "confirmed", "cancelled", "completed"], default: "pending" },
    createdAt: { type: Number, default: () => Date.now() },
  },
  { collection: "general_appointments" }
)

// The partial filter keeps the index compatible with appointment records
// created before idempotency keys were introduced. A normal unique index
// treats all missing requestIds as the same value and can fail to build when
// older appointment records exist.
GeneralAppointmentSchema.index(
  { requestId: 1 },
  { unique: true, partialFilterExpression: { requestId: { $type: "string" } } },
)

// Vite keeps Mongoose models alive while the server plugin is hot-reloaded.
// Recreate the model if it came from an older schema that predates requestId;
// otherwise Mongoose rejects the idempotent upsert with strict-mode errors.
const existingGeneralAppointmentModel = mongoose.models.GeneralAppointmentRecord
if (existingGeneralAppointmentModel && !existingGeneralAppointmentModel.schema.path("requestId")) {
  mongoose.deleteModel("GeneralAppointmentRecord")
}
export const GeneralAppointmentModel =
  mongoose.models.GeneralAppointmentRecord ||
  mongoose.model<IGeneralAppointment>("GeneralAppointmentRecord", GeneralAppointmentSchema)

type GeneralAppointmentInsert = Pick<
  IGeneralAppointment,
  "requestId" | "name" | "email" | "phone" | "date" | "time" | "notes"
>

/**
 * Persist a request through MongoDB's native collection API.
 *
 * This deliberately does not use Mongoose's `findOneAndUpdate`. Vite hot
 * reloads can retain an older Mongoose schema in memory, which caused the
 * strict-mode `requestId` error. Native collection operations are also a
 * better fit for short-lived Vercel serverless functions: they use the cached
 * connection and perform one atomic upsert directly in MongoDB.
 */
export async function saveGeneralAppointment(input: GeneralAppointmentInsert) {
  const collection = mongoose.connection.collection<IGeneralAppointment>("general_appointments")
  const now = Date.now()

  try {
    await collection.updateOne(
      { requestId: input.requestId },
      {
        $setOnInsert: {
          ...input,
          status: "pending",
          createdAt: now,
        },
      },
      { upsert: true },
    )
  } catch (error: any) {
    // A simultaneous retry can lose the insert race. The other request has
    // saved the exact same key, so returning that record is a success.
    if (error?.code !== 11000) throw error
  }

  const saved = await collection.findOne({ requestId: input.requestId })
  if (!saved) throw new Error("Appointment request could not be saved")
  return saved
}

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
