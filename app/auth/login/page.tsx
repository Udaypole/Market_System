import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-muted items-center justify-center p-12">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Mini Marketplace</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your trusted platform for buying and selling quality products
          </p>
          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Secure transactions</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Quality products</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Trusted sellers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <LoginForm />
      </div>
    </div>
  )
}
