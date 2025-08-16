import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Users, Shield, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="text-accent">Mini Marketplace</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your trusted platform for buying and selling quality products. Discover amazing deals and connect with
            sellers worldwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/products">
                <ShoppingBag className="mr-2 h-5 w-5" />
                Browse Products
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Mini Marketplace?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide a secure, user-friendly platform that connects buyers and sellers with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Secure Transactions</h3>
                <p className="text-sm text-muted-foreground">
                  Your payments and personal information are protected with industry-standard security.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Trusted Community</h3>
                <p className="text-sm text-muted-foreground">
                  Join thousands of verified buyers and sellers in our trusted marketplace community.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Fast & Easy</h3>
                <p className="text-sm text-muted-foreground">
                  Quick product discovery with advanced search and filtering capabilities.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Quality Products</h3>
                <p className="text-sm text-muted-foreground">
                  Discover high-quality products across multiple categories from trusted sellers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
            <p className="text-muted-foreground">Explore our wide range of product categories</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Electronics", count: "500+ items" },
              { name: "Clothing", count: "300+ items" },
              { name: "Books", count: "200+ items" },
              { name: "Home & Garden", count: "150+ items" },
              { name: "Sports", count: "100+ items" },
            ].map((category) => (
              <Link key={category.name} href={`/products?category=${category.name.toLowerCase()}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {category.count}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our marketplace today and start buying or selling with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">Create Account</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
