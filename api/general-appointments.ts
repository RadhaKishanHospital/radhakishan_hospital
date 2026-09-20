import type { VercelRequest, VercelResponse } from "@vercel/node"
import { connectDB, formatDoc, GeneralAppointmentModel } from "../server/db"

const requiredFields = ["name", "email", "phone", "date", "time"] as const

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

      const doc = await GeneralAppointmentModel.create({
        ...result.input,
        status: "pending",
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
