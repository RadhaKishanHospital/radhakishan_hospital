import {
  connectDB,
  DoctorAppointmentModel,
  formatDoc,
  GeneralAppointmentModel,
  MessageModel,
} from "../server/db"

type Request = {
  method?: string
  query: { resource?: string | string[] }
  body?: Record<string, unknown>
}
type Response = {
  statusCode: number
  setHeader(name: string, value: string): void
  end(body: string): void
}
type Model = typeof GeneralAppointmentModel | typeof DoctorAppointmentModel | typeof MessageModel

const models: Record<string, Model> = {
  "general-appointments": GeneralAppointmentModel,
  "doctor-appointments": DoctorAppointmentModel,
  messages: MessageModel,
}

function send(res: Response, status: number, payload: unknown) {
  res.statusCode = status
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify(payload))
}

function resourcePath(resource: Request["query"]["resource"]) {
  return Array.isArray(resource) ? resource : resource?.split("/").filter(Boolean) ?? []
}

export default async function handler(req: Request, res: Response) {
  const [resource, id] = resourcePath(req.query.resource)
  const model = models[resource]
  if (!model) return send(res, 404, { error: "Not found" })

  try {
    await connectDB()

    if (req.method === "GET" && !id) {
      const documents = await model.find().sort({ createdAt: -1 }).lean()
      return send(res, 200, documents.map(formatDoc))
    }

    if (req.method === "POST" && !id) {
      const document = await model.create(req.body)
      return send(res, 201, formatDoc(document))
    }

    if (req.method === "PATCH" && id) {
      const document = await model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
      return document ? send(res, 200, formatDoc(document)) : send(res, 404, { error: "Not found" })
    }

    if (req.method === "DELETE" && id) {
      const document = await model.findByIdAndDelete(id)
      return document ? send(res, 200, { success: true }) : send(res, 404, { error: "Not found" })
    }

    res.setHeader("Allow", "GET, POST, PATCH, DELETE")
    return send(res, 405, { error: "Method not allowed" })
  } catch (error) {
    console.error("MongoDB API error", error)
    return send(res, 500, { error: "Unable to process the request" })
  }
}
