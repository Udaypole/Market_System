// Advanced search API endpoint
import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import { searchSchema } from "@/lib/validation"
import type { PaginatedResponse, Product } from "@/lib/types"

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url)
    const queryParams = Object.fromEntries(searchParams.entries())

    // Convert string params to appropriate types
    const searchFilters = {
      ...queryParams,
      minPrice: queryParams.minPrice ? Number.parseFloat(queryParams.minPrice) : undefined,
      maxPrice: queryParams.maxPrice ? Number.parseFloat(queryParams.maxPrice) : undefined,
      page: queryParams.page ? Number.parseInt(queryParams.page) : 1,
      limit: queryParams.limit ? Number.parseInt(queryParams.limit) : 10,
    }

    // Validate search parameters
    const validation = searchSchema.safeParse(searchFilters)
    if (!validation.success) {
      return Response.json(
        {
          success: false,
          error: "Invalid search parameters",
          details: validation.error.errors,
        },
        { status: 400 },
      )
    }

    const { query, category, minPrice, maxPrice, sortBy, sortOrder, page, limit } = validation.data

    // Build search filters
    const filters: any = {
      search: query,
    }

    if (category) filters.category = category
    if (minPrice !== undefined) filters.minPrice = minPrice
    if (maxPrice !== undefined) filters.maxPrice = maxPrice

    // Get filtered products
    const products = await db.products.findAll(filters)

    // Apply sorting
    products.sort((a, b) => {
      let aValue: any, bValue: any

      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
          break
        case "price":
          aValue = a.price
          bValue = b.price
          break
        case "createdAt":
          aValue = new Date(a.createdAt).getTime()
          bValue = new Date(b.createdAt).getTime()
          break
        default:
          aValue = a.name.toLowerCase()
          bValue = b.name.toLowerCase()
      }

      if (sortOrder === "desc") {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      }
    })

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProducts = products.slice(startIndex, endIndex)

    // Get category information for each product
    const productsWithCategories = await Promise.all(
      paginatedProducts.map(async (product) => {
        const categoryInfo = await db.categories.findById(product.categoryId)
        return {
          ...product,
          category: categoryInfo ? { id: categoryInfo.id, name: categoryInfo.name, slug: categoryInfo.slug } : null,
        }
      }),
    )

    const response: PaginatedResponse<Product & { category: any }> = {
      success: true,
      data: productsWithCategories,
      pagination: {
        page,
        limit,
        total: products.length,
        totalPages: Math.ceil(products.length / limit),
      },
    }

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error("Search error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
