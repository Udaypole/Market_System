import { db } from "@/lib/database"
import { withAuth, type AuthenticatedRequest } from "@/lib/middleware"
import type { ApiResponse, User } from "@/lib/types"

async function handler(req: AuthenticatedRequest): Promise<Response> {
  try {
    const userId = req.user!.userId

    // Get user from database
    const user = await db.users.findById(userId)
    if (!user) {
      return Response.json({ success: false, error: "User not found" }, { status: 404 })
    }

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user
    const response: ApiResponse<Omit<User, "password">> = {
      success: true,
      data: userWithoutPassword,
    }

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error("Get profile error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export const GET = withAuth(handler)
