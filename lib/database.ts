// Mock database implementation for the marketplace system
import type { User, Category, Product } from "./types"

// In-memory storage (in production, this would be a real database)
const users: User[] = [
  {
    id: "1",
    email: "admin@marketplace.com",
    password: "admin123", // In production: bcrypt.hashSync('admin123', 10)
    firstName: "Admin",
    lastName: "User",
    role: "admin",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    email: "john@example.com",
    password: "user123",
    firstName: "John",
    lastName: "Doe",
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    email: "jane@example.com",
    password: "user123",
    firstName: "Jane",
    lastName: "Smith",
    role: "user",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    description: "Electronic devices and gadgets",
    slug: "electronics",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Clothing",
    description: "Fashion and apparel",
    slug: "clothing",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Books",
    description: "Books and educational materials",
    slug: "books",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Home & Garden",
    description: "Home improvement and gardening supplies",
    slug: "home-garden",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Sports",
    description: "Sports equipment and accessories",
    slug: "sports",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    categoryId: "1",
    imageUrl: "/placeholder-4i3s1.png",
    images: ["/placeholder-4i3s1.png"],
    inventory: 50,
    sku: "WBH-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Smartphone Case",
    description: "Protective case for smartphones with drop protection",
    price: 29.99,
    categoryId: "1",
    imageUrl: "/placeholder-uzrzw.png",
    images: ["/placeholder-uzrzw.png"],
    inventory: 100,
    sku: "SPC-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt in various colors",
    price: 24.99,
    categoryId: "2",
    imageUrl: "/plain-cotton-tee.png",
    images: ["/plain-cotton-tee.png"],
    inventory: 75,
    sku: "CTS-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Denim Jeans",
    description: "Classic fit denim jeans with premium quality",
    price: 79.99,
    categoryId: "2",
    imageUrl: "/denim-jeans.png",
    images: ["/denim-jeans.png"],
    inventory: 30,
    sku: "DJ-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "JavaScript Programming Guide",
    description: "Complete guide to modern JavaScript programming",
    price: 39.99,
    categoryId: "3",
    imageUrl: "/javascript-programming-book.png",
    images: ["/javascript-programming-book.png"],
    inventory: 25,
    sku: "JPG-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "React Programming Book",
    description: "Learn React.js from basics to advanced concepts",
    price: 44.99,
    categoryId: "3",
    imageUrl: "/react-programming-book.png",
    images: ["/react-programming-book.png"],
    inventory: 20,
    sku: "RPB-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with precision tracking",
    price: 49.99,
    categoryId: "1",
    imageUrl: "/wireless-mouse.png",
    images: ["/wireless-mouse.png"],
    inventory: 60,
    sku: "WM-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Mechanical Keyboard",
    description: "RGB mechanical keyboard with blue switches",
    price: 129.99,
    categoryId: "1",
    imageUrl: "/mechanical-keyboard.png",
    images: ["/mechanical-keyboard.png"],
    inventory: 25,
    sku: "MK-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Running Shoes",
    description: "Lightweight running shoes for daily training",
    price: 89.99,
    categoryId: "5",
    imageUrl: "/running-shoes.png",
    images: ["/running-shoes.png"],
    inventory: 40,
    sku: "RS-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Yoga Mat",
    description: "Non-slip yoga mat for home workouts",
    price: 34.99,
    categoryId: "5",
    imageUrl: "/yoga-mat.png",
    images: ["/yoga-mat.png"],
    inventory: 80,
    sku: "YM-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "11",
    name: "Garden Hose",
    description: "50ft expandable garden hose with spray nozzle",
    price: 39.99,
    categoryId: "4",
    imageUrl: "/garden-hose.png",
    images: ["/garden-hose.png"],
    inventory: 35,
    sku: "GH-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "12",
    name: "Plant Pot Set",
    description: "Set of 3 ceramic plant pots with drainage",
    price: 24.99,
    categoryId: "4",
    imageUrl: "/plant-pot-set.png",
    images: ["/plant-pot-set.png"],
    inventory: 50,
    sku: "PPS-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "13",
    name: "Winter Jacket",
    description: "Waterproof winter jacket with insulation",
    price: 149.99,
    categoryId: "2",
    imageUrl: "/winter-jacket.png",
    images: ["/winter-jacket.png"],
    inventory: 20,
    sku: "WJ-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "14",
    name: "Sneakers",
    description: "Casual sneakers for everyday wear",
    price: 69.99,
    categoryId: "2",
    imageUrl: "/sneakers.png",
    images: ["/sneakers.png"],
    inventory: 45,
    sku: "SN-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "15",
    name: "Tablet Stand",
    description: "Adjustable aluminum tablet stand",
    price: 19.99,
    categoryId: "1",
    imageUrl: "/tablet-stand.png",
    images: ["/tablet-stand.png"],
    inventory: 70,
    sku: "TS-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "16",
    name: "Cookbook Collection",
    description: "Set of 3 popular cookbooks",
    price: 59.99,
    categoryId: "3",
    imageUrl: "/cookbook-collection.png",
    images: ["/cookbook-collection.png"],
    inventory: 15,
    sku: "CC-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "17",
    name: "Fitness Tracker",
    description: "Waterproof fitness tracker with heart rate monitor",
    price: 99.99,
    categoryId: "5",
    imageUrl: "/fitness-tracker.png",
    images: ["/fitness-tracker.png"],
    inventory: 30,
    sku: "FT-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "18",
    name: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with USB charging",
    price: 54.99,
    categoryId: "4",
    imageUrl: "/led-desk-lamp.png",
    images: ["/led-desk-lamp.png"],
    inventory: 40,
    sku: "LDL-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "19",
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 12-hour battery",
    price: 79.99,
    categoryId: "1",
    imageUrl: "/bluetooth-speaker.png",
    images: ["/bluetooth-speaker.png"],
    inventory: 55,
    sku: "BS-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "20",
    name: "Baseball Cap",
    description: "Adjustable baseball cap in multiple colors",
    price: 19.99,
    categoryId: "2",
    imageUrl: "/baseball-cap.png",
    images: ["/baseball-cap.png"],
    inventory: 90,
    sku: "BC-001",
    status: "active",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// Database operations
export const db = {
  // User operations
  users: {
    findAll: () => Promise.resolve([...users]),
    findById: (id: string) => Promise.resolve(users.find((u) => u.id === id)),
    findByEmail: (email: string) => Promise.resolve(users.find((u) => u.email === email)),
    create: (userData: Omit<User, "id" | "createdAt" | "updatedAt">) => {
      const newUser: User = {
        ...userData,
        id: (users.length + 1).toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      users.push(newUser)
      return Promise.resolve(newUser)
    },
    update: (id: string, userData: Partial<User>) => {
      const index = users.findIndex((u) => u.id === id)
      if (index === -1) return Promise.resolve(null)
      users[index] = { ...users[index], ...userData, updatedAt: new Date().toISOString() }
      return Promise.resolve(users[index])
    },
    delete: (id: string) => {
      const index = users.findIndex((u) => u.id === id)
      if (index === -1) return Promise.resolve(false)
      users.splice(index, 1)
      return Promise.resolve(true)
    },
  },

  // Category operations
  categories: {
    findAll: () => Promise.resolve([...categories]),
    findById: (id: string) => Promise.resolve(categories.find((c) => c.id === id)),
    findBySlug: (slug: string) => Promise.resolve(categories.find((c) => c.slug === slug)),
    create: (categoryData: Omit<Category, "id" | "createdAt" | "updatedAt">) => {
      const newCategory: Category = {
        ...categoryData,
        id: (categories.length + 1).toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      categories.push(newCategory)
      return Promise.resolve(newCategory)
    },
    update: (id: string, categoryData: Partial<Category>) => {
      const index = categories.findIndex((c) => c.id === id)
      if (index === -1) return Promise.resolve(null)
      categories[index] = { ...categories[index], ...categoryData, updatedAt: new Date().toISOString() }
      return Promise.resolve(categories[index])
    },
    delete: (id: string) => {
      const index = categories.findIndex((c) => c.id === id)
      if (index === -1) return Promise.resolve(false)
      categories.splice(index, 1)
      return Promise.resolve(true)
    },
  },

  // Product operations
  products: {
    findAll: (filters?: { category?: string; minPrice?: number; maxPrice?: number; search?: string }) => {
      let filteredProducts = [...products]

      if (filters?.category) {
        filteredProducts = filteredProducts.filter((p) => p.categoryId === filters.category)
      }

      if (filters?.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter((p) => p.price >= filters.minPrice!)
      }

      if (filters?.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter((p) => p.price <= filters.maxPrice!)
      }

      if (filters?.search) {
        const searchTerm = filters.search.toLowerCase()
        filteredProducts = filteredProducts.filter(
          (p) => p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm),
        )
      }

      return Promise.resolve(filteredProducts)
    },
    findById: (id: string) => Promise.resolve(products.find((p) => p.id === id)),
    create: (productData: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
      const newProduct: Product = {
        ...productData,
        id: (products.length + 1).toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      products.push(newProduct)
      return Promise.resolve(newProduct)
    },
    update: (id: string, productData: Partial<Product>) => {
      const index = products.findIndex((p) => p.id === id)
      if (index === -1) return Promise.resolve(null)
      products[index] = { ...products[index], ...productData, updatedAt: new Date().toISOString() }
      return Promise.resolve(products[index])
    },
    delete: (id: string) => {
      const index = products.findIndex((p) => p.id === id)
      if (index === -1) return Promise.resolve(false)
      products.splice(index, 1)
      return Promise.resolve(true)
    },
  },
}
