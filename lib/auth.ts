// Authentication utilities and JWT handling
import type { AuthTokenPayload } from "./types"

// Simple JWT simulation (in production, use proper JWT library)
export const auth = {
  generateToken: (payload: AuthTokenPayload): string => {
    return Buffer.from(JSON.stringify(payload)).toString("base64")
  },

  verifyToken: (token: string): AuthTokenPayload | null => {
    try {
      return JSON.parse(Buffer.from(token, "base64").toString("utf-8"))
    } catch {
      return null
    }
  },

  hashPassword: (password: string): string => {
    // In production: use bcrypt
    return password // Simplified for demo
  },

  comparePassword: (password: string, hash: string): boolean => {
    // In production: use bcrypt.compare
    return password === hash // Simplified for demo
  },
}
