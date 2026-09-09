import type { IncomingMessage, ServerResponse } from "node:http"
import mongoose from "mongoose"
import {
  connectDB,
  DoctorAppointmentModel,
  formatDoc,
  GeneralAppointmentModel,
  MessageModel,
  ReviewModel,
} from "./db"

type ApiRequest = IncomingMessage & { body?: unknown }

const statuses = new Set(["pending", "confirmed", "cancelled", "completed"])

function sendJson(res: ServerResponse, status: number, data: unknown) {
  res.statusCode = status
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.setHeader("Cache-Control", "no-store")
  res.end(JSON.stringify(data))
}

async function readBody(req: ApiRequest): Promise<Record<string, unknown>> {
  if (req.body && typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body as Record<string, unknown>

  return new Promise((resolve, reject) => {
    let body = ""
    req.on("data", (chunk) => { body += chunk })
    req.on("end", () => {
      if (!body) return resolve({})
      try { resolve(JSON.parse(body) as Record<string, unknown>) } catch { reject(new Error("Request body must be valid JSON.")) }
    })
    req.on("error", reject)
  })
}

function requiredString(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) throw new Error(`${field} is required.`)
  return value.trim()
}

function recordNotFound(res: ServerResponse) { return sendJson(res, 404, { error: "Record not found." }) }

function validateId(id: string, res: ServerResponse) {
  if (!mongoose.isValidObjectId(id)) {
    sendJson(res, 400, { error: "Invalid record id." })
    return false
  }
  return true
}

function routeFromUrl(url: string) {
  const parts = new URL(url, "http://localhost").pathname.split("/").filter(Boolean)
  return { resource: parts[1], id: parts[2] }
}

export async function apiHandler(req: ApiRequest, res: ServerResponse) {
  const method = req.method ?? "GET"
  const { resource, id } = routeFromUrl(req.url ?? "/")

  try {
    await connectDB()

    if (resource === "general-appointments") {
      if (method === "GET" && !id) return sendJson(res, 200, (await GeneralAppointmentModel.find().sort({ createdAt: -1 }).lean()).map(formatDoc))
      if (method === "POST" && !id) {
        const body = await readBody(req)
        const doc = await GeneralAppointmentModel.create({
          name: requiredString(body.name, "name"), email: requiredString(body.email, "email"), phone: requiredString(body.phone, "phone"),
          department: requiredString(body.department, "department"), date: requiredString(body.date, "date"), time: requiredString(body.time, "time"),
          notes: typeof body.notes === "string" ? body.notes.trim() : "", status: "pending", createdAt: Date.now(),
        })
        return sendJson(res, 201, formatDoc(doc))
      }
      if (!id || !validateId(id, res)) return
      if (method === "PATCH") {
        const body = await readBody(req)
        if (!statuses.has(String(body.status))) return sendJson(res, 400, { error: "Invalid appointment status." })
        const doc = await GeneralAppointmentModel.findByIdAndUpdate(id, { status: body.status }, { new: true, runValidators: true })
        return doc ? sendJson(res, 200, formatDoc(doc)) : recordNotFound(res)
      }
      if (method === "DELETE") return (await GeneralAppointmentModel.findByIdAndDelete(id)) ? sendJson(res, 200, { success: true }) : recordNotFound(res)
    }

    if (resource === "doctor-appointments") {
      if (method === "GET" && !id) return sendJson(res, 200, (await DoctorAppointmentModel.find().sort({ createdAt: -1 }).lean()).map(formatDoc))
      if (method === "POST" && !id) {
        const body = await readBody(req)
        const doc = await DoctorAppointmentModel.create({
          patientName: requiredString(body.patientName, "patientName"), patientEmail: requiredString(body.patientEmail, "patientEmail"), patientPhone: requiredString(body.patientPhone, "patientPhone"),
          doctorId: requiredString(body.doctorId, "doctorId"), doctorName: requiredString(body.doctorName, "doctorName"), specialty: typeof body.specialty === "string" ? body.specialty.trim() : "",
          date: requiredString(body.date, "date"), time: requiredString(body.time, "time"), status: "pending", createdAt: Date.now(),
        })
        return sendJson(res, 201, formatDoc(doc))
      }
      if (!id || !validateId(id, res)) return
      if (method === "PATCH") {
        const body = await readBody(req)
        if (!statuses.has(String(body.status))) return sendJson(res, 400, { error: "Invalid appointment status." })
        const doc = await DoctorAppointmentModel.findByIdAndUpdate(id, { status: body.status }, { new: true, runValidators: true })
        return doc ? sendJson(res, 200, formatDoc(doc)) : recordNotFound(res)
      }
      if (method === "DELETE") return (await DoctorAppointmentModel.findByIdAndDelete(id)) ? sendJson(res, 200, { success: true }) : recordNotFound(res)
    }

    if (resource === "messages") {
      if (method === "GET" && !id) return sendJson(res, 200, (await MessageModel.find().sort({ createdAt: -1 }).lean()).map(formatDoc))
      if (method === "POST" && !id) {
        const body = await readBody(req)
        const doc = await MessageModel.create({ name: requiredString(body.name, "name"), phone_no: Number(body.phone_no) || 0, subject: requiredString(body.subject, "subject"), body: requiredString(body.body, "body"), read: false, createdAt: Date.now() })
        return sendJson(res, 201, formatDoc(doc))
      }
      if (!id || !validateId(id, res)) return
      if (method === "PATCH") {
        const body = await readBody(req)
        if (typeof body.read !== "boolean") return sendJson(res, 400, { error: "read must be a boolean." })
        const doc = await MessageModel.findByIdAndUpdate(id, { read: body.read }, { new: true, runValidators: true })
        return doc ? sendJson(res, 200, formatDoc(doc)) : recordNotFound(res)
      }
      if (method === "DELETE") return (await MessageModel.findByIdAndDelete(id)) ? sendJson(res, 200, { success: true }) : recordNotFound(res)
    }

    if (resource === "reviews") {
      if (method === "GET" && !id) return sendJson(res, 200, (await ReviewModel.find().sort({ createdAt: -1 }).lean()).map(formatDoc))
      if (method === "POST" && !id) {
        const body = await readBody(req)
        const rating = Number(body.rating)
        if (!Number.isInteger(rating) || rating < 1 || rating > 5) return sendJson(res, 400, { error: "rating must be an integer from 1 to 5." })
        const doc = await ReviewModel.create({ name: requiredString(body.name, "name"), description: requiredString(body.description, "description"), rating, createdAt: Date.now() })
        return sendJson(res, 201, formatDoc(doc))
      }
      if (!id || !validateId(id, res)) return
      if (method === "DELETE") return (await ReviewModel.findByIdAndDelete(id)) ? sendJson(res, 200, { success: true }) : recordNotFound(res)
    }

    return sendJson(res, 405, { error: "Method not allowed." })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected server error."
    const status = message.endsWith("is required.") || message === "Request body must be valid JSON." ? 400 : 500
    console.error("API request failed:", error)
    return sendJson(res, status, { error: status === 500 ? "Unable to complete the request." : message })
  }
}
