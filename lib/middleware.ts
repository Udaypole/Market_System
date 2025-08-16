// Authentication middleware for protecting API routes
import type { NextRequest } from "next/server"
import { auth } from "./auth"
import type { AuthTokenPayload } from "./types"

export interface AuthenticatedRequest extends NextRequest {
  user?: AuthTokenPayload
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<Response>) {
  return async (req: AuthenticatedRequest): Promise<Response> => {
    try {
      const authHeader = req.headers.get("authorization")

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return Response.json({ success: false, error: "Authorization header required" }, { status: 401 })
      }

      const token = authHeader.substring(7)
      const payload = auth.verifyToken(token)

      if (!payload) {
        return Response.json({ success: false, error: "Invalid or expired token" }, { status: 401 })
      }

      req.user = payload
      return handler(req)
    } catch (error) {
      return Response.json({ success: false, error: "Authentication failed" }, { status: 401 })
    }
  }
}

export function withAdminAuth(handler: (req: AuthenticatedRequest) => Promise<Response>) {
  return withAuth(async (req: AuthenticatedRequest): Promise<Response> => {
    if (req.user?.role !== "admin") {
      return Response.json({ success: false, error: "Admin access required" }, { status: 403 })
    }
    return handler(req)
  })
}
