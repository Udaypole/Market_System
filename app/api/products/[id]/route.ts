// Individual product operations API endpoint
import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { withAdminAuth, type AuthenticatedRequest } from "@/lib/middleware"
import { updateProductSchema } from "@/lib/validation"
import type { ApiResponse, Product } from "@/lib/types"

interface RouteParams {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: RouteParams): Promise<Response> {
  try {
    const { id } = params

    // Get product by ID
    const product = await db.products.findById(id)
    if (!product) {
      return Response.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    // Get category information
    const category = await db.categories.findById(product.categoryId)
    const productWithCategory = {
      ...product,
      category: category ? { id: category.id, name: category.name, slug: category.slug } : null,
    }

    const response: ApiResponse<Product & { category: any }> = {
      success: true,
      data: productWithCategory,
    }

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error("Get product error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

async function updateProductHandler(req: AuthenticatedRequest, { params }: RouteParams): Promise<Response> {
  try {
    const { id } = params
    const body = await req.json()

    // Validate input
    const validation = updateProductSchema.safeParse(body)
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

    // Check if product exists
    const existingProduct = await db.products.findById(id)
    if (!existingProduct) {
      return Response.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    // If categoryId is being updated, check if category exists
    if (updateData.categoryId) {
      const category = await db.categories.findById(updateData.categoryId)
      if (!category) {
        return Response.json({ success: false, error: "Category not found" }, { status: 404 })
      }
    }

    // Update product
    const updatedProduct = await db.products.update(id, updateData)

    const response: ApiResponse<Product> = {
      success: true,
      data: updatedProduct!,
      message: "Product updated successfully",
    }

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error("Update product error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

async function deleteProductHandler(req: AuthenticatedRequest, { params }: RouteParams): Promise<Response> {
  try {
    const { id } = params

    // Check if product exists
    const existingProduct = await db.products.findById(id)
    if (!existingProduct) {
      return Response.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    // Delete product
    await db.products.delete(id)

    const response: ApiResponse<null> = {
      success: true,
      message: "Product deleted successfully",
    }

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error("Delete product error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export const PUT = withAdminAuth(updateProductHandler)
export const DELETE = withAdminAuth(deleteProductHandler)
