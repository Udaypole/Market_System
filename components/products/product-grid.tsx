"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "./product-card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  filters?: {
    search?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    sortBy?: string
    sortOrder?: string
  }
}

export function ProductGrid({ filters = {} }: ProductGridProps) {
  const [products, setProducts] = useState<(Product & { category?: any })[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  })

  const loadProducts = async (page = 1) => {
    setLoading(true)
    setError("")

    try {
      const response = await apiClient.getProducts({
        ...filters,
        page,
        limit: pagination.limit,
      })

      if (response.success && response.data) {
        setProducts(response.data)
        setPagination(response.pagination || pagination)
      } else {
        setError(response.error || "Failed to load products")
      }
    } catch (error) {
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts(1)
  }, [filters])

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }))
    loadProducts(newPage)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <Skeleton className="aspect-square w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Results info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
          {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} products
        </p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <Button
                  key={pageNum}
                  variant={pagination.page === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className="w-10"
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pagination.page + 1)}
            disabled={pagination.page >= pagination.totalPages}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
