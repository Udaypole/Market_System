// Search suggestions API endpoint
import type { NextRequest } from "next/server"
import { db } from "@/lib/database"
import type { ApiResponse } from "@/lib/types"

export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query || query.length < 2) {
      return Response.json({
        success: true,
        data: {
          products: [],
          categories: [],
        },
      })
    }

    const searchTerm = query.toLowerCase()

    // Get matching products (limit to 5)
    const allProducts = await db.products.findAll()
    const matchingProducts = allProducts
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm),
      )
      .slice(0, 5)
      .map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
      }))

    // Get matching categories (limit to 3)
    const allCategories = await db.categories.findAll()
    const matchingCategories = allCategories
      .filter(
        (category) =>
          category.name.toLowerCase().includes(searchTerm) || category.description.toLowerCase().includes(searchTerm),
      )
      .slice(0, 3)
      .map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
      }))

    const response: ApiResponse<{
      products: any[]
      categories: any[]
    }> = {
      success: true,
      data: {
        products: matchingProducts,
        categories: matchingCategories,
      },
    }

    return Response.json(response, { status: 200 })
  } catch (error) {
    console.error("Search suggestions error:", error)
    return Response.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
