// Categories listing and creation API endpoint
import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { withAdminAuth, type AuthenticatedRequest } from "@/lib/middleware"
import { createCategorySchema } from "@/lib/validation"
import type { ApiResponse, Category } from "@/lib/types"

export async function GET(request: NextRequest): Promise<Response> {
  try {
    // Get all categories
    const categories = await db.categories.findAll()

    // Get product count for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const products = await db.products.findAll({ category: category.id })
        return {
          ...category,
          productCount: products.length,
        }
      }),
    )

    const response: ApiResponse<(Category & { productCount: number })[]> = {
      success: true,
      data: categoriesWithCounts,
    }

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error("Get categories error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

async function createCategoryHandler(req: AuthenticatedRequest): Promise<Response> {
  try {
    const body = await req.json()

    // Validate input
    const validation = createCategorySchema.safeParse(body)
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

    const categoryData = validation.data

    // Check if category with same slug already exists
    const existingCategory = await db.categories.findBySlug(categoryData.slug)
    if (existingCategory) {
      return Response.json({ success: false, error: "Category with this slug already exists" }, { status: 409 })
    }

    // Create category
    const newCategory = await db.categories.create(categoryData)

    const response: ApiResponse<Category> = {
      success: true,
      data: newCategory,
      message: "Category created successfully",
    }

    return Response.json(response, { status: 201 })
  } catch (error) {
    console.error("Create category error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export const POST = withAdminAuth(createCategoryHandler)
