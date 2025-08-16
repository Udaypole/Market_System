import { RegisterForm } from "@/components/auth/register-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-muted items-center justify-center p-12">
        <div className="max-w-md text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Join Mini Marketplace</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Start your journey as a buyer or seller in our trusted community
          </p>
          <div className="space-y-4 text-muted-foreground">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Free to join</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>Easy setup</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-secondary rounded-full"></div>
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Register form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <RegisterForm />
      </div>
    </div>
  )
}
