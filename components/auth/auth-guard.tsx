"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requireAdmin?: boolean
  redirectTo?: string
}

export function AuthGuard({ children, requireAdmin = false, redirectTo = "/auth/login" }: AuthGuardProps) {
  const { user, loading, isAuthenticated, isAdmin } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(redirectTo)
        return
      }

      if (requireAdmin && !isAdmin) {
        router.push("/dashboard")
        return
      }
    }
  }, [loading, isAuthenticated, isAdmin, requireAdmin, router, redirectTo])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated || (requireAdmin && !isAdmin)) {
    return null
  }

  return <>{children}</>
}
