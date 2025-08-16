import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product & { category?: { id: string; name: string; slug: string } }
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <CardContent className="p-0">
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            <Image
              src={product.imageUrl || "/placeholder.svg?height=300&width=300"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-200"
            />
            {product.status === "inactive" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Badge variant="secondary">Out of Stock</Badge>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-accent transition-colors">
                {product.name}
              </h3>
              <div className="text-right ml-2">
                <p className="font-bold text-lg">₹{product.price.toFixed(2)}</p>
              </div>
            </div>
            <p className="text-muted-foreground text-xs line-clamp-2 mb-3">{product.description}</p>
            <div className="flex items-center justify-between">
              {product.category && (
                <Badge variant="outline" className="text-xs">
                  {product.category.name}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">{product.inventory} in stock</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
