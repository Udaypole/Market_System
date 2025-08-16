"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, ShoppingCart, Heart, Share2 } from "lucide-react"
import { apiClient } from "@/lib/api-client"
import type { Product } from "@/lib/types"

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<(Product & { category?: any }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    const loadProduct = async () => {
      if (!params.id) return

      try {
        const response = await apiClient.getProduct(params.id as string)
        if (response.success && response.data) {
          setProduct(response.data)
        } else {
          setError(response.error || "Product not found")
        }
      } catch (error) {
        setError("Failed to load product")
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full" />
            <div className="flex space-x-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="w-20 h-20" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.imageUrl]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg border">
            <Image
              src={images[selectedImage] || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.status === "inactive" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary" className="text-lg">
                  Out of Stock
                </Badge>
              </div>
            )}
          </div>

          {/* Image thumbnails */}
          {images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden ${
                    selectedImage === index ? "border-accent" : "border-border"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg?height=80&width=80"}
                    alt=""
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              {product.category && (
                <Link href={`/products?category=${product.category.id}`}>
                  <Badge variant="outline" className="hover:bg-accent hover:text-accent-foreground">
                    {product.category.name}
                  </Badge>
                </Link>
              )}
              <Badge variant={product.status === "active" ? "default" : "secondary"}>
                {product.status === "active" ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-2xl font-bold text-accent">${product.price.toFixed(2)}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">SKU:</span>
              <span className="ml-2 text-muted-foreground">{product.sku}</span>
            </div>
            <div>
              <span className="font-medium">Stock:</span>
              <span className="ml-2 text-muted-foreground">{product.inventory} available</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            <Button size="lg" className="w-full" disabled={product.status !== "active"}>
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Heart className="h-4 w-4 mr-2" />
                Add to Wishlist
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Product info card */}
          <Card>
            <CardContent className="p-4">
              <h4 className="font-semibold mb-3">Product Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span>{product.category?.name || "Uncategorized"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability:</span>
                  <span>{product.inventory > 0 ? `${product.inventory} in stock` : "Out of stock"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">SKU:</span>
                  <span>{product.sku}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
