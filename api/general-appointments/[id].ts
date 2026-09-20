import type { VercelRequest, VercelResponse } from "@vercel/node"
import { connectDB, formatDoc, GeneralAppointmentModel } from "../../server/db"

const statuses = ["pending", "confirmed", "cancelled", "completed"]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { id } = req.query as { id: string }
  try {
    await connectDB()
    if (req.method === "PATCH") {
      const status = req.body?.status
      if (!statuses.includes(status)) return res.status(400).json({ error: "Invalid appointment status" })
      const updated = await GeneralAppointmentModel.findByIdAndUpdate(id, { status }, { new: true })
      return updated
        ? res.status(200).json(formatDoc(updated))
        : res.status(404).json({ error: "Not found" })
    }
    if (req.method === "DELETE") {
      const deleted = await GeneralAppointmentModel.findByIdAndDelete(id)
      return deleted
        ? res.status(200).json({ success: true })
        : res.status(404).json({ error: "Not found" })
    }
    return res.status(405).json({ error: "Method not allowed" })
  } catch (err: any) {
    console.error("API error:", err)
    return res.status(500).json({ error: err.message })
  }
}
