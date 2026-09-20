import type { VercelRequest, VercelResponse } from "@vercel/node"
import { connectDB, formatDoc, GeneralAppointmentModel } from "../server/db"

const requiredFields = ["name", "email", "phone", "date", "time"] as const
const idempotencyKeyPattern = /^[a-zA-Z0-9_-]{16,128}$/

function appointmentInput(body: unknown) {
  const value = typeof body === "object" && body !== null ? body as Record<string, unknown> : {}
  const input = Object.fromEntries(
    requiredFields.map((field) => [field, typeof value[field] === "string" ? value[field].trim() : ""]),
  ) as Record<(typeof requiredFields)[number], string>
  const missing = requiredFields.filter((field) => !input[field])

  if (missing.length > 0) return { error: `Missing required fields: ${missing.join(", ")}` }
  if (!/^\S+@\S+\.\S+$/.test(input.email)) return { error: "Please provide a valid email address" }

  return {
    input: {
      ...input,
      notes: typeof value.notes === "string" ? value.notes.trim() : "",
    },
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await connectDB()
    if (req.method === "GET") {
      const list = await GeneralAppointmentModel.find().sort({ createdAt: -1 })
      return res.status(200).json(list.map(formatDoc))
    }
    if (req.method === "POST") {
      const result = appointmentInput(req.body)
      if ("error" in result) return res.status(400).json({ error: result.error })

      // Some proxies and browser privacy extensions remove non-standard
      // request headers. Accept the same key in the JSON payload as a safe
      // fallback, while preferring the header when it is available.
      const requestId = req.headers["x-idempotency-key"]
      const headerKey = Array.isArray(requestId) ? requestId[0] : requestId
      const bodyKey = typeof req.body?.requestId === "string" ? req.body.requestId : undefined
      const key = headerKey || bodyKey
      if (!key || !idempotencyKeyPattern.test(key)) {
        return res.status(400).json({ error: "A valid appointment request key is required" })
      }

      // `upsert` makes a retry return the original appointment instead of
      // inserting a duplicate when a network/serverless timeout occurs after
      // the database write has completed.
      let doc
      try {
        doc = await GeneralAppointmentModel.findOneAndUpdate(
          { requestId: key },
          {
            $setOnInsert: {
              requestId: key,
              ...result.input,
              status: "pending",
              createdAt: Date.now(),
            },
          },
          { new: true, upsert: true, setDefaultsOnInsert: true },
        )
      } catch (error: any) {
        // Concurrent retries may race to insert the same key. MongoDB's
        // unique index correctly rejects one insert; return the successful
        // record instead of reporting that retry as a failed appointment.
        if (error?.code !== 11000) throw error
        doc = await GeneralAppointmentModel.findOne({ requestId: key })
      }

      if (!doc) throw new Error("Appointment request could not be saved")
      return res.status(201).json(formatDoc(doc))
    }
    return res.status(405).json({ error: "Method not allowed" })
  } catch (err: any) {
    console.error("API error:", err)
    return res.status(500).json({ error: err.message })
  }
}
