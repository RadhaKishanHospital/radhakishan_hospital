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
              const list = await GeneralAppointmentModel.find().sort({ createdAt: -1 })
              return sendJson(res, 200, list.map(formatDoc))
            }

            if (method === "POST") {
              const body = await parseJsonBody(req)
              // Mirror the production function's idempotency contract so a
              // local submission is validated and stored the same way.
              const requestId = typeof req.headers["x-idempotency-key"] === "string"
                ? req.headers["x-idempotency-key"]
                : body.requestId
              if (typeof requestId !== "string" || !/^[a-zA-Z0-9_-]{16,128}$/.test(requestId)) {
                return sendJson(res, 400, { error: "A valid appointment request key is required" })
              }
              const doc = await GeneralAppointmentModel.findOneAndUpdate({ requestId }, {
                $setOnInsert: {
                  requestId,
                  name: body.name,
                  email: body.email,
                  phone: body.phone,
                  date: body.date,
                  time: body.time,
                  notes: body.notes || "",
                  status: "pending",
                  createdAt: Date.now(),
                },
              }, { new: true, upsert: true, setDefaultsOnInsert: true })
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
              return sendJson(res, 200, list.map(formatDoc))
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
              return sendJson(res, 200, list.map(formatDoc))
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
              return sendJson(res, 200, list.map(formatDoc))
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
