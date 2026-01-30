'use client'

import { useAuth } from '@/app/providers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import PublicPage from '@/components/pages/public-page'
import Dashboard from '@/components/pages/dashboard'

export default function Home() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="mb-4 text-lg text-foreground">Cargando...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <PublicPage />
  }

  return <Dashboard />
}
