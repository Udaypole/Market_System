import { AuthGuard } from "@/components/auth/auth-guard"

function DashboardContent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
          <p className="text-muted-foreground">You have successfully logged into the marketplace system.</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p className="text-muted-foreground">Browse and manage products in the marketplace.</p>
        </div>
        <div className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p className="text-muted-foreground">View and track your orders and transactions.</p>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  )
}
