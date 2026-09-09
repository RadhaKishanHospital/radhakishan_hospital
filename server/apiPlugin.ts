import type { Plugin, ViteDevServer } from "vite"
import type { IncomingMessage, ServerResponse } from "http"
import {
  connectDB,
  GeneralAppointmentModel,
  DoctorAppointmentModel,
  MessageModel,
  ReviewModel,
  formatDoc,
} from "./db"

// ---------------------------------------------------------------------------
// Sample data used as a fallback when the database is empty or when the
// environment variable `USE_SAMPLE_DATA` is set to "true". This ensures the UI
// always receives data, which is helpful in production environments that may
// experience transient DB connectivity issues.
// ---------------------------------------------------------------------------

const SAMPLE_GENERAL_APPOINTMENTS = [
  {
    name: "John Doe",
    email: "john@example.com",
    phone: "555-1234",
    department: "Cardiology",
    date: "2024-10-01",
    time: "10:00",
    notes: "First visit",
    status: "pending" as const,
    createdAt: Date.now(),
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "555-5678",
    department: "Dermatology",
    date: "2024-10-02",
    time: "14:30",
    notes: "Follow‑up",
    status: "confirmed" as const,
    createdAt: Date.now() - 86400000,
  },
]

const SAMPLE_DOCTOR_APPOINTMENTS = [
  {
    patientName: "Alice Johnson",
    patientEmail: "alice@example.com",
    patientPhone: "555-9012",
    doctorId: "d1",
    doctorName: "Dr. House",
    specialty: "Diagnostics",
    date: "2024-11-05",
    time: "09:00",
    status: "pending" as const,
    createdAt: Date.now(),
  },
]

const SAMPLE_MESSAGES = [
  {
    name: "Visitor",
    phone_no: 1234567890,
    subject: "Inquiry",
    body: "I would like more information about cardiology services.",
    read: false,
    createdAt: Date.now(),
  },
]

const SAMPLE_REVIEWS = [
  {
    name: "Happy Patient",
    description: "Excellent care and friendly staff.",
    rating: 5,
    createdAt: Date.now(),
  },
]

const USE_SAMPLE_DATA = process.env.USE_SAMPLE_DATA === "true"


function parseJsonBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = ""
    req.on("data", (chunk) => {
      body += chunk
    })
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch (e) {
        resolve({})
      }
    })
    req.on("error", reject)
  })
}

function sendJson(res: ServerResponse, status: number, data: any) {
  res.statusCode = status
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(data))
}

export function expressApiPlugin(): Plugin {
  return {
    name: "express-api-plugin",
    configureServer(server: ViteDevServer) {
      // Trigger DB connection immediately in background
      connectDB().catch((err) => console.error("Database connection error:", err))

      // Register middleware synchronously so it runs before Vite's HTML fallback middleware
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const url = req.url || ""
        const method = req.method || "GET"

        if (!url.startsWith("/api/")) {
          return next()
        }

        try {
          await connectDB()

          // Normalize path by stripping query params
          const pathname = url.split("?")[0]

          // --- 1. GENERAL APPOINTMENTS ---
          if (pathname === "/api/general-appointments" || pathname.startsWith("/api/general-appointments/")) {
            const id = pathname.replace("/api/general-appointments", "").replace("/", "")

            if (method === "GET") {
              // Try to fetch from DB first
              const list = await GeneralAppointmentModel.find().sort({ createdAt: -1 })
              const data = list.length ? list.map(formatDoc) : SAMPLE_GENERAL_APPOINTMENTS
              return sendJson(res, 200, USE_SAMPLE_DATA ? SAMPLE_GENERAL_APPOINTMENTS : data)
            }

            if (method === "POST") {
              const body = await parseJsonBody(req)
              const doc = await GeneralAppointmentModel.create({
                name: body.name,
                email: body.email,
                phone: body.phone,
                department: body.department,
                date: body.date,
                time: body.time,
                notes: body.notes || "",
                status: body.status || "pending",
                createdAt: Date.now(),
              })
              return sendJson(res, 201, formatDoc(doc))
            }

            if (method === "PATCH" && id) {
              const body = await parseJsonBody(req)
              const updated = await GeneralAppointmentModel.findByIdAndUpdate(id, body, { new: true })
              return sendJson(res, 200, updated ? formatDoc(updated) : { error: "Not found" })
            }

            if (method === "DELETE" && id) {
              await GeneralAppointmentModel.findByIdAndDelete(id)
              return sendJson(res, 200, { success: true })
            }
          }

          // --- 2. DOCTOR APPOINTMENTS ---
          if (pathname === "/api/doctor-appointments" || pathname.startsWith("/api/doctor-appointments/")) {
            const id = pathname.replace("/api/doctor-appointments", "").replace("/", "")

            if (method === "GET") {
              const list = await DoctorAppointmentModel.find().sort({ createdAt: -1 })
              const data = list.length ? list.map(formatDoc) : SAMPLE_DOCTOR_APPOINTMENTS
              return sendJson(res, 200, USE_SAMPLE_DATA ? SAMPLE_DOCTOR_APPOINTMENTS : data)
            }

            if (method === "POST") {
              const body = await parseJsonBody(req)
              const doc = await DoctorAppointmentModel.create({
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
              return sendJson(res, 201, formatDoc(doc))
            }

            if (method === "PATCH" && id) {
              const body = await parseJsonBody(req)
              const updated = await DoctorAppointmentModel.findByIdAndUpdate(id, body, { new: true })
              return sendJson(res, 200, updated ? formatDoc(updated) : { error: "Not found" })
            }

            if (method === "DELETE" && id) {
              await DoctorAppointmentModel.findByIdAndDelete(id)
              return sendJson(res, 200, { success: true })
            }
          }

          // --- 3. MESSAGES ---
          if (pathname === "/api/messages" || pathname.startsWith("/api/messages/")) {
            const id = pathname.replace("/api/messages", "").replace("/", "")

            if (method === "GET") {
              const list = await MessageModel.find().sort({ createdAt: -1 })
              const data = list.length ? list.map(formatDoc) : SAMPLE_MESSAGES
              return sendJson(res, 200, USE_SAMPLE_DATA ? SAMPLE_MESSAGES : data)
            }

            if (method === "POST") {
              const body = await parseJsonBody(req)
              const doc = await MessageModel.create({
                name: body.name,
                phone_no: Number(body.phone_no || body.email || body.number || 0) || 0,
                subject: body.subject,
                body: body.body || body.message || "",
                read: false,
                createdAt: Date.now(),
              })
              return sendJson(res, 201, formatDoc(doc))
            }

            if (method === "PATCH" && id) {
              const body = await parseJsonBody(req)
              const updated = await MessageModel.findByIdAndUpdate(id, body, { new: true })
              return sendJson(res, 200, updated ? formatDoc(updated) : { error: "Not found" })
            }

            if (method === "DELETE" && id) {
              await MessageModel.findByIdAndDelete(id)
              return sendJson(res, 200, { success: true })
            }
          }

          // --- 4. REVIEWS ---
          if (pathname === "/api/reviews" || pathname.startsWith("/api/reviews/")) {
            const id = pathname.replace("/api/reviews", "").replace("/", "")

            if (method === "GET") {
              const list = await ReviewModel.find().sort({ createdAt: -1 })
              const data = list.length ? list.map(formatDoc) : SAMPLE_REVIEWS
              return sendJson(res, 200, USE_SAMPLE_DATA ? SAMPLE_REVIEWS : data)
            }

            if (method === "POST") {
              const body = await parseJsonBody(req)
              const doc = await ReviewModel.create({
                name: body.name,
                description: body.description,
                rating: Number(body.rating) || 5,
                createdAt: Date.now(),
              })
              return sendJson(res, 201, formatDoc(doc))
            }

            if (method === "DELETE" && id) {
              await ReviewModel.findByIdAndDelete(id)
              return sendJson(res, 200, { success: true })
            }
          }

          next()
        } catch (err: any) {
          console.error("API error:", err)
          sendJson(res, 500, { error: err.message })
        }
      })
    },
  }
}
