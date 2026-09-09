import type { Plugin, ViteDevServer } from "vite"
import type { IncomingMessage, ServerResponse } from "node:http"
import { apiHandler } from "./api"

/**
 * Development adapter for the same request handler used by Vercel. Keeping a
 * single API implementation prevents the local server from masking deployment
 * issues such as missing routes or different validation behaviour.
 */
export function expressApiPlugin(): Plugin {
  return {
    name: "hospital-api",
    configureServer(server: ViteDevServer) {
      server.middlewares.use((req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (!req.url?.startsWith("/api/")) return next()
        void apiHandler(req, res)
      })
    },
  }
}
