// User registration API endpoint
import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { auth } from "@/lib/auth"
import { registerSchema } from "@/lib/validation"
import type { ApiResponse, User } from "@/lib/types"

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json()

    // Validate input
    const validation = registerSchema.safeParse(body)
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

    const { email, password, firstName, lastName } = validation.data

    // Check if user already exists
    const existingUser = await db.users.findByEmail(email)
    if (existingUser) {
      return Response.json({ success: false, error: "User already exists with this email" }, { status: 409 })
    }

    // Hash password and create user
    const hashedPassword = auth.hashPassword(password)
    const newUser = await db.users.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: "user",
    })

    // Generate JWT token
    const token = auth.generateToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
    })

    // Return user data without password
    const { password: _, ...userWithoutPassword } = newUser
    const response: ApiResponse<{ user: Omit<User, "password">; token: string }> = {
      success: true,
      data: {
        user: userWithoutPassword,
        token,
      },
      message: "User registered successfully",
    }

    return Response.json(response, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
