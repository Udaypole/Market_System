// Client-side API utilities for authentication
import type { ApiResponse, User, Product } from "./types"
import type { RegisterInput, LoginInput } from "./validation"
import type { CreateProductInput, UpdateProductInput, ProductFiltersInput } from "./validation"
import type { CreateCategoryInput, UpdateCategoryInput, SearchInput } from "./validation"

const API_BASE = "/api"

class ApiClient {
  private token: string | null = null

  constructor() {
    // Initialize token from localStorage if available
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("auth_token")
    }
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const url = `${API_BASE}${endpoint}`
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      const data = await response.json()
      return data
    } catch (error) {
      console.error("API request failed:", error)
      return {
        success: false,
        error: "Network error occurred",
      }
    }
  }

  // Authentication methods
  async register(userData: RegisterInput) {
    const response = await this.request<{ user: Omit<User, "password">; token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    })

    if (response.success && response.data) {
      this.setToken(response.data.token)
    }

    return response
  }

  async login(credentials: LoginInput) {
    const response = await this.request<{ user: Omit<User, "password">; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    })

    if (response.success && response.data) {
      this.setToken(response.data.token)
    }

    return response
  }

  async getProfile() {
    return this.request<Omit<User, "password">>("/auth/me")
  }

  logout() {
    this.token = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("auth_token")
    }
  }

  private setToken(token: string) {
    this.token = token
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", token)
    }
  }

  getToken() {
    return this.token
  }

  isAuthenticated() {
    return !!this.token
  }

  // Product methods
  async getProducts(filters?: Partial<ProductFiltersInput>) {
    const queryParams = new URLSearchParams()

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    return this.request<any>(endpoint)
  }

  async getProduct(id: string) {
    return this.request<Product & { category: any }>(`/products/${id}`)
  }

  async createProduct(productData: CreateProductInput) {
    return this.request<Product>("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    })
  }

  async updateProduct(id: string, productData: UpdateProductInput) {
    return this.request<Product>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    })
  }

  async deleteProduct(id: string) {
    return this.request<null>(`/products/${id}`, {
      method: "DELETE",
    })
  }

  // Category methods
  async getCategories() {
    return this.request<any[]>("/categories")
  }

  async getCategory(id: string) {
    return this.request<any>(`/categories/${id}`)
  }

  async createCategory(categoryData: CreateCategoryInput) {
    return this.request<any>("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    })
  }

  async updateCategory(id: string, categoryData: UpdateCategoryInput) {
    return this.request<any>(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
    })
  }

  async deleteCategory(id: string) {
    return this.request<null>(`/categories/${id}`, {
      method: "DELETE",
    })
  }

  // Search methods
  async search(searchParams: Partial<SearchInput>) {
    const queryParams = new URLSearchParams()

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString())
      }
    })

    const endpoint = `/search${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    return this.request<any>(endpoint)
  }

  async getSearchSuggestions(query: string) {
    return this.request<{
      products: any[]
      categories: any[]
    }>(`/search/suggestions?q=${encodeURIComponent(query)}`)
  }
}

export const apiClient = new ApiClient()
