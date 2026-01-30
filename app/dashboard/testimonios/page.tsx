'use client'

import { useState, useEffect } from 'react'
import { useAuth, Testimony } from '@/app/providers'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import TestimonyDialog from '@/components/testimonies/testimony-dialog'
import { useRouter } from 'next/navigation'

export default function TestimoniosPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [testimonies, setTestimonies] = useState<Testimony[]>([])
  const [showDialog, setShowDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar permiso
  useEffect(() => {
    if (!user) return

    const rolesConPermiso = ['organizacion', 'vocal_organizacion', 'presidente', 'vicepresidente', 'webdesigner']
    const tienePermiso = rolesConPermiso.includes(user.rol)

    if (!tienePermiso) {
      router.push('/dashboard')
    }
  }, [user, router])

  // Simular carga de testimonios
  useEffect(() => {
    setTimeout(() => {
      setTestimonies([
        {
          id: '1',
          nombreAutor: 'Juan Pérez',
          contenido: 'Mi fe en el Señor de los Milagros me ha transformado profundamente. Esta hermandad es mi hogar espiritual.',
          estado: 'aprobado',
          fechaCreacion: '2025-11-10',
          fechaAprobacion: '2025-11-11',
        },
        {
          id: '2',
          nombreAutor: 'María González',
          contenido: 'La comunidad de hermanos me ayudó en momentos difíciles. Su solidaridad es verdadera y auténtica.',
          estado: 'pendiente',
          fechaCreacion: '2025-11-12',
        },
        {
          id: '3',
          nombreAutor: 'Carlos López',
          contenido: 'Aquí he encontrado paz y propósito en mi vida espiritual.',
          estado: 'aprobado',
          fechaCreacion: '2025-11-05',
          fechaAprobacion: '2025-11-06',
        },
      ])
      setIsLoading(false)
    }, 500)
  }, [])

  const handleAddTestimony = (testimony: Omit<Testimony, 'id' | 'estado' | 'fechaCreacion' | 'fechaAprobacion'>) => {
    const newTestimony: Testimony = {
      id: Date.now().toString(),
      ...testimony,
      estado: 'pendiente',
      fechaCreacion: new Date().toISOString().split('T')[0],
    }
    setTestimonies([newTestimony, ...testimonies])
    setShowDialog(false)
  }

  const handleApprove = (id: string) => {
    setTestimonies(
      testimonies.map(t =>
        t.id === id
          ? { ...t, estado: 'aprobado', fechaAprobacion: new Date().toISOString().split('T')[0] }
          : t
      )
    )
  }

  const handleReject = (id: string) => {
    setTestimonies(
      testimonies.map(t =>
        t.id === id
          ? { ...t, estado: 'rechazado' }
          : t
      )
    )
  }

  const handleDelete = (id: string) => {
    setTestimonies(testimonies.filter(t => t.id !== id))
  }

  const canManage = ['organizacion', 'vocal_organizacion', 'presidente', 'vicepresidente', 'webdesigner'].includes(user?.rol || '')
  const pendingCount = testimonies.filter(t => t.estado === 'pendiente').length
  const approvedCount = testimonies.filter(t => t.estado === 'aprobado').length

  if (!user) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Testimonios de Fe</h1>
          <p className="mt-2 text-foreground/60">
            Administra los testimonios de fe de los hermanos
          </p>
        </div>
        <Button 
          onClick={() => setShowDialog(true)}
          className="bg-[color:var(--color-section-testimonies-border)] hover:opacity-90"
        >
          Nuevo Testimonio
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-2 border-[color:var(--color-section-testimonies-border)] bg-[color:var(--color-section-testimonies)]">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground/70">Total de Testimonios</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-[color:var(--color-section-testimonies-border)]">{testimonies.length}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-yellow-600 bg-yellow-50 dark:bg-yellow-900/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground/70">Pendientes de Aprobación</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-600 bg-green-50 dark:bg-green-900/20">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-foreground/70">Aprobados</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
          </CardContent>
        </Card>
      </div>

      {/* Testimonies List */}
      {isLoading ? (
        <Card className="border-2 border-[color:var(--color-section-testimonies-border)]">
          <CardContent className="p-8 text-center text-foreground/60">
            Cargando testimonios...
          </CardContent>
        </Card>
      ) : testimonies.length === 0 ? (
        <Card className="border-2 border-[color:var(--color-section-testimonies-border)]">
          <CardContent className="p-12 text-center">
            <p className="text-lg text-foreground/60">No hay testimonios registrados</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {testimonies.map((testimony) => (
            <Card 
              key={testimony.id} 
              className="border-2 border-[color:var(--color-section-testimonies-border)] bg-[color:var(--color-section-testimonies)] hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-[color:var(--color-section-testimonies-border)]">
                      {testimony.nombreAutor}
                    </CardTitle>
                    <p className="mt-2 text-sm text-foreground/60">
                      {new Date(testimony.fechaCreacion).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      className={
                        testimony.estado === 'aprobado'
                          ? 'bg-green-600'
                          : testimony.estado === 'pendiente'
                          ? 'bg-yellow-600'
                          : 'bg-red-600'
                      }
                    >
                      {testimony.estado}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-foreground italic">"{testimony.contenido}"</p>

                {testimony.estado === 'pendiente' && canManage && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleApprove(testimony.id)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Aprobar
                    </Button>
                    <Button
                      onClick={() => handleReject(testimony.id)}
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Rechazar
                    </Button>
                  </div>
                )}

                {canManage && (
                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleDelete(testimony.id)}
                      size="sm"
                      variant="outline"
                      className="text-destructive hover:bg-destructive/10"
                    >
                      Eliminar
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <TestimonyDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        onSave={handleAddTestimony}
      />
    </div>
  )
}
