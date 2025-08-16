// Database entity types for the marketplace system

export interface User {
  id: string
  email: string
  password: string // In real app, this would be hashed
  firstName: string
  lastName: string
  role: "admin" | "user"
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  imageUrl: string
  images: string[]
  inventory: number
  sku: string
  status: "active" | "inactive"
  createdAt: string
  updatedAt: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Search and filter types
export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  search?: string
  status?: "active" | "inactive"
}

export interface AuthTokenPayload {
  userId: string
  email: string
  role: string
}
