'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/providers'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import HermanosList from '@/components/brothers/hermanos-list'
import SancionDialog from '@/components/brothers/sancion-dialog'
import { useRouter } from 'next/navigation'

interface Sancion {
  id: string
  hermano: string
  tipo: string
  razon: string
  fecha: string
  duracion: number
}

interface Hermano {
  id: string
  nombre: string
  email: string
  telefono: string
  fechaIngreso: string
  cargo: string
  estado: 'activo' | 'inactivo' | 'sancionado'
  sanciones: number
}

export default function SancionesPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [sanciones, setSanciones] = useState<Sancion[]>([])
  const [hermanos, setHermanos] = useState<Hermano[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showSancionDialog, setShowSancionDialog] = useState(false)
  const [selectedHermanoForSancion, setSelectedHermanoForSancion] = useState<Hermano | null>(null)

  // Verificar permiso
  useEffect(() => {
    if (!user) return

    const rolesConPermiso = ['fiscal', 'adjunto_fiscal', 'presidente', 'vicepresidente', 'webdesigner']
    const tienePermiso = rolesConPermiso.includes(user.rol)

    if (!tienePermiso) {
      router.push('/dashboard')
    }
  }, [user, router])

  useEffect(() => {
    setTimeout(() => {
      setHermanos([
        {
          id: '1',
          nombre: 'Juan García López',
          email: 'juan@hermandad.es',
          telefono: '+34 666 123 456',
          fechaIngreso: '2020-03-15',
          cargo: 'Capellán',
          estado: 'activo',
          sanciones: 0,
        },
        {
          id: '2',
          nombre: 'María Rodríguez Pérez',
          email: 'maria@hermandad.es',
          telefono: '+34 666 234 567',
          fechaIngreso: '2019-06-22',
          cargo: 'Vocal',
          estado: 'activo',
          sanciones: 1,
        },
        {
          id: '3',
          nombre: 'Carlos Martínez García',
          email: 'carlos@hermandad.es',
          telefono: '+34 666 345 678',
          fechaIngreso: '2021-01-10',
          cargo: 'Hermano',
          estado: 'sancionado',
          sanciones: 2,
        },
      ])

      setSanciones([
        {
          id: '1',
          hermano: 'María Rodríguez Pérez',
          tipo: 'amonestacion',
          razon: 'No asistencia a dos eventos sin justificación',
          fecha: '2025-10-15',
          duracion: 1,
        },
        {
          id: '2',
          hermano: 'Carlos Martínez García',
          tipo: 'suspension',
          razon: 'Incumplimiento de obligaciones',
          fecha: '2025-09-20',
          duracion: 3,
        },
        {
          id: '3',
          hermano: 'Carlos Martínez García',
          tipo: 'amonestacion',
          razon: 'Conducta inapropiada en evento',
          fecha: '2025-08-10',
          duracion: 1,
        },
      ])
      setIsLoading(false)
    }, 500)
  }, [])

  const handleAddSancion = (hermano: Hermano) => {
    setSelectedHermanoForSancion(hermano)
    setShowSancionDialog(true)
  }

  const handleSaveSancion = (sancion: any) => {
    if (selectedHermanoForSancion) {
      setHermanos(hermanos.map(h => 
        h.id === selectedHermanoForSancion.id 
          ? {
              ...h,
              sanciones: h.sanciones + 1,
              estado: h.sanciones + 1 >= 3 ? 'sancionado' : h.estado,
            }
          : h
      ))
    }
    setShowSancionDialog(false)
    setSelectedHermanoForSancion(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const tiposancionBadge = {
    amonestacion: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    suspension: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    expulsion_temporal: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    expulsion_permanente: 'bg-destructive text-destructive-foreground',
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Sanciones</h1>
          <p className="mt-2 text-foreground/60">
            Aplica y visualiza el historial de sanciones
          </p>
        </div>
        <Button 
          onClick={() => setShowSancionDialog(true)}
          className="bg-primary hover:bg-primary/90"
        >
          Nueva Sanción
        </Button>
      </div>

      <Card className="border border-border bg-muted/30">
        <CardHeader>
          <CardTitle className="text-lg">Aplicar Sanción</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-foreground/60">Cargando hermanos...</p>
          ) : (
            <HermanosList 
              hermanos={hermanos}
              onEdit={() => {}}
              onDelete={() => {}}
              onAddSancion={handleAddSancion}
              canEdit={true}
            />
          )}
        </CardContent>
      </Card>

      {/* Historial de sanciones */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Historial de Sanciones</h2>
        {isLoading ? (
          <Card className="border border-border">
            <CardContent className="p-8 text-center text-foreground/60">
              Cargando sanciones...
            </CardContent>
          </Card>
        ) : sanciones.length === 0 ? (
          <Card className="border border-border">
            <CardContent className="p-12 text-center">
              <p className="text-lg text-foreground/60">No hay sanciones registradas</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {sanciones.map((sancion) => (
              <Card key={sancion.id} className="border border-border">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-lg">{sancion.hermano}</h3>
                      <p className="mt-2 text-foreground/70">{sancion.razon}</p>
                      <p className="mt-2 text-sm text-foreground/60">
                        Fecha: {formatDate(sancion.fecha)}
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-2 md:items-end">
                      <Badge className={tiposancionBadge[sancion.tipo as keyof typeof tiposancionBadge]}>
                        {sancion.tipo.replace('_', ' ')}
                      </Badge>
                      <p className="text-sm font-semibold text-foreground">
                        Duración: {sancion.duracion} meses
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <SancionDialog
        open={showSancionDialog}
        onOpenChange={setShowSancionDialog}
        hermano={selectedHermanoForSancion}
        onSave={handleSaveSancion}
      />
    </div>
  )
}
