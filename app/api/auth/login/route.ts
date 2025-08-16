// User login API endpoint
import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { auth } from "@/lib/auth"
import { loginSchema } from "@/lib/validation"
import type { ApiResponse, User } from "@/lib/types"

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json()

    // Validate input
    const validation = loginSchema.safeParse(body)
    if (!validation.success) {
      return Response.json(
        {
          success: false,
          error: "Validation failed",
          details: validation.error.errors,
        },
        { status: 400 },
      )
    }

    const { email, password } = validation.data

    // Find user by email
    const user = await db.users.findByEmail(email)
    if (!user) {
      return Response.json({ success: false, error: "Invalid email or password" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = auth.comparePassword(password, user.password)
    if (!isValidPassword) {
      return Response.json({ success: false, error: "Invalid email or password" }, { status: 401 })
    }

    // Generate JWT token
    const token = auth.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Return user data without password
    const { password: _, ...userWithoutPassword } = user
    const response: ApiResponse<{ user: Omit<User, "password">; token: string }> = {
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
      message: "Login successful",
    }

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error("Login error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
