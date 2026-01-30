'use client'

import { useState } from 'react'
import { useAuth } from '@/app/providers'
import { useRouter } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface LoginDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotMessage, setForgotMessage] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      console.log('Login successful')
      onOpenChange(false)
      router.push('/')
    } catch (err) {
      setError('Email o contraseña incorrectos')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotMessage('')
    
    try {
      // Aquí iría la llamada a tu API para enviar email de recuperación
      setForgotMessage('Se ha enviado un enlace de recuperación a tu email')
      setTimeout(() => {
        setShowForgotPassword(false)
        setForgotEmail('')
        setForgotMessage('')
      }, 2000)
    } catch (err) {
      setForgotMessage('Error al enviar email de recuperación')
    }
  }

  if (showForgotPassword) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-primary">Recuperar Contraseña</DialogTitle>
            <DialogDescription>
              Ingresa tu email para recibir un enlace de recuperación
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="forgot-email">Email</Label>
              <Input
                id="forgot-email"
                type="email"
                placeholder="tu@email.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                className="border-border"
              />
            </div>

            {forgotMessage && (
              <div className={`rounded-md p-3 text-sm ${
                forgotMessage.includes('Error') 
                  ? 'bg-destructive/10 text-destructive' 
                  : 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300'
              }`}>
                {forgotMessage}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90"
            >
              Enviar Enlace
            </Button>

            <Button 
              type="button"
              variant="outline"
              onClick={() => setShowForgotPassword(false)}
              className="w-full"
            >
              Volver al Login
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-primary">Acceso a la Hermandad</DialogTitle>
          <DialogDescription>
            Ingresa tu email y contraseña para acceder a la plataforma
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border-border"
            />
          </div>

          {error && (
            <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isLoading ? 'Accediendo...' : 'Acceder'}
          </Button>

          <Button 
            type="button"
            variant="ghost"
            onClick={() => setShowForgotPassword(true)}
            className="w-full text-primary hover:text-primary/90"
          >
            ¿Olvidaste tu contraseña?
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
