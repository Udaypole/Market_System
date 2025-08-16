// Individual category operations API endpoint
import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { withAdminAuth, type AuthenticatedRequest } from "@/lib/middleware"
import { updateCategorySchema } from "@/lib/validation"
import type { ApiResponse, Category } from "@/lib/types"

interface RouteParams {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: RouteParams): Promise<Response> {
  try {
    const { id } = params

    // Get category by ID
    const category = await db.categories.findById(id)
    if (!category) {
      return Response.json({ success: false, error: "Category not found" }, { status: 404 })
    }

    // Get products in this category
    const products = await db.products.findAll({ category: id })

    const categoryWithProducts = {
      ...category,
      productCount: products.length,
      products: products.slice(0, 5), // Return first 5 products as preview
    }

    const response: ApiResponse<Category & { productCount: number; products: any[] }> = {
      success: true,
      data: categoryWithProducts,
    }

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error("Get category error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

async function updateCategoryHandler(req: AuthenticatedRequest, { params }: RouteParams): Promise<Response> {
  try {
    const { id } = params
    const body = await req.json()

    // Validate input
    const validation = updateCategorySchema.safeParse(body)
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

    const updateData = validation.data

    // Check if category exists
    const existingCategory = await db.categories.findById(id)
    if (!existingCategory) {
      return Response.json({ success: false, error: "Category not found" }, { status: 404 })
    }

    // If slug is being updated, check if it's already taken
    if (updateData.slug && updateData.slug !== existingCategory.slug) {
      const categoryWithSlug = await db.categories.findBySlug(updateData.slug)
      if (categoryWithSlug) {
        return Response.json({ success: false, error: "Category with this slug already exists" }, { status: 409 })
      }
    }

    // Update category
    const updatedCategory = await db.categories.update(id, updateData)

    const response: ApiResponse<Category> = {
      success: true,
      data: updatedCategory!,
      message: "Category updated successfully",
    }

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error("Update category error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

async function deleteCategoryHandler(req: AuthenticatedRequest, { params }: RouteParams): Promise<Response> {
  try {
    const { id } = params

    // Check if category exists
    const existingCategory = await db.categories.findById(id)
    if (!existingCategory) {
      return Response.json({ success: false, error: "Category not found" }, { status: 404 })
    }

    // Check if category has products
    const products = await db.products.findAll({ category: id })
    if (products.length > 0) {
      return Response.json({ success: false, error: "Cannot delete category with existing products" }, { status: 400 })
    }

    // Delete category
    await db.categories.delete(id)

    const response: ApiResponse<null> = {
      success: true,
      message: "Category deleted successfully",
    }

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error("Delete category error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export const PUT = withAdminAuth(updateCategoryHandler)
export const DELETE = withAdminAuth(deleteCategoryHandler)
