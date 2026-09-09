import type { IncomingMessage, ServerResponse } from "node:http"
import { apiHandler } from "../server/api"

// Vercel deploys files in /api as serverless functions. The catch-all route
// keeps the browser API contract identical in development and production.
export default function handler(req: IncomingMessage, res: ServerResponse) {
  return apiHandler(req, res)
}
