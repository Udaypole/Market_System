"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Search, X } from "lucide-react"
import { apiClient } from "@/lib/api-client"

interface ProductFiltersProps {
  onFiltersChange: (filters: {
    search?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    sortBy?: string
    sortOrder?: string
  }) => void
  initialFilters?: {
    search?: string
    category?: string
    minPrice?: number
    maxPrice?: number
    sortBy?: string
    sortOrder?: string
  }
}

export function ProductFilters({ onFiltersChange, initialFilters = {} }: ProductFiltersProps) {
  const [search, setSearch] = useState(initialFilters.search || "")
  const [category, setCategory] = useState(initialFilters.category || "all")
  const [priceRange, setPriceRange] = useState([initialFilters.minPrice || 0, initialFilters.maxPrice || 1000])
  const [sortBy, setSortBy] = useState(initialFilters.sortBy || "name")
  const [sortOrder, setSortOrder] = useState(initialFilters.sortOrder || "asc")
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    // Load categories
    const loadCategories = async () => {
      const response = await apiClient.getCategories()
      if (response.success && response.data) {
        setCategories(response.data)
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    // Debounce search input
    const timer = setTimeout(() => {
      handleFiltersChange()
    }, 300)

    return () => clearTimeout(timer)
  }, [search, category, priceRange, sortBy, sortOrder])

  const handleFiltersChange = () => {
    onFiltersChange({
      search: search || undefined,
      category: category === "all" ? undefined : category,
      minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < 1000 ? priceRange[1] : undefined,
      sortBy,
      sortOrder,
    })
  }

  const clearFilters = () => {
    setSearch("")
    setCategory("all")
    setPriceRange([0, 1000])
    setSortBy("name")
    setSortOrder("asc")
  }

  const hasActiveFilters = search || category !== "all" || priceRange[0] > 0 || priceRange[1] < 1000

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Products</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Price Range</Label>
          <div className="px-2">
            <Slider value={priceRange} onValueChange={setPriceRange} max={1000} min={0} step={10} className="w-full" />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>

        {/* Sort */}
        <div className="space-y-2">
          <Label>Sort By</Label>
          <div className="grid grid-cols-2 gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="createdAt">Date Added</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
