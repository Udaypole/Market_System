"use client"

import { useState } from "react"
import { ProductFilters } from "@/components/products/product-filters"
import { ProductGrid } from "@/components/products/product-grid"

export default function ProductsPage() {
  const [filters, setFilters] = useState({})

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-muted-foreground">Discover amazing products in our marketplace</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters sidebar */}
        <div className="lg:col-span-1">
          <ProductFilters onFiltersChange={setFilters} />
        </div>

        {/* Products grid */}
        <div className="lg:col-span-3">
          <ProductGrid filters={filters} />
        </div>
      </div>
    </div>
  )
}
