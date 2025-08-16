// Products listing and creation API endpoint
import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { withAdminAuth, type AuthenticatedRequest } from "@/lib/middleware"
import { createProductSchema, productFiltersSchema } from "@/lib/validation"
import type { ApiResponse, PaginatedResponse, Product } from "@/lib/types"

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())

    // Convert string params to appropriate types
    const filters = {
      ...queryParams,
      minPrice: queryParams.minPrice ? Number.parseFloat(queryParams.minPrice) : undefined,
      maxPrice: queryParams.maxPrice ? Number.parseFloat(queryParams.maxPrice) : undefined,
      page: queryParams.page ? Number.parseInt(queryParams.page) : 1,
      limit: queryParams.limit ? Number.parseInt(queryParams.limit) : 10,
    }

    // Validate filters
    const validation = productFiltersSchema.safeParse(filters)
    if (!validation.success) {
      return Response.json(
        {
          success: false,
          error: "Invalid filters",
          details: validation.error.errors,
        },
        { status: 400 },
      )
    }

    const { page, limit, ...productFilters } = validation.data

    // Get filtered products
    const allProducts = await db.products.findAll(productFilters)

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = allProducts.slice(startIndex, endIndex)

    // Get category information for each product
    const productsWithCategories = await Promise.all(
      paginatedProducts.map(async (product) => {
        const category = await db.categories.findById(product.categoryId)
        return {
          ...product,
          category: category ? { id: category.id, name: category.name, slug: category.slug } : null,
        }
      }),
    )

    const response: PaginatedResponse<Product & { category: any }> = {
      success: true,
      data: productsWithCategories,
      pagination: {
        page,
        limit,
        total: allProducts.length,
        totalPages: Math.ceil(allProducts.length / limit),
      },
    }

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error("Get products error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

async function createProductHandler(req: AuthenticatedRequest): Promise<Response> {
  try {
    const body = await req.json()

    // Validate input
    const validation = createProductSchema.safeParse(body)
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

    const productData = validation.data

    // Check if category exists
    const category = await db.categories.findById(productData.categoryId)
    if (!category) {
      return Response.json({ success: false, error: "Category not found" }, { status: 404 })
    }

    // Create product
    const newProduct = await db.products.create(productData)

    const response: ApiResponse<Product> = {
      success: true,
      data: newProduct,
      message: "Product created successfully",
    }

    return Response.json(response, { status: 201 })
  } catch (error) {
    console.error("Create product error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export const POST = withAdminAuth(createProductHandler)
