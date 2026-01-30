'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/providers'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import EventsList from '@/components/events/events-list'
import EventDialog from '@/components/events/event-dialog'
import { useRouter } from 'next/navigation'

interface Evento {
  id: string
  nombre: string
  type: string
  idType: number
  fecha: string
  hora: string
  lugar: string
  repetitiva: boolean
  caduca: boolean
  organizadorId: number
  asistentes: Array<{ id: string; nombre: string; email: string }>
  soloHermanos: boolean
}

export default function EventosPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [eventos, setEventos] = useState<Evento[]>([])
  const [showDialog, setShowDialog] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Evento | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar permiso
  useEffect(() => {
    if (!user) return

    const rolesConPermisoEditar = ['capataz', 'subcapataz', 'organizacion', 'vocal_organizacion', 'patron_andas', 'presidente', 'vicepresidente', 'webdesigner']
    const tienePermisoEditar = rolesConPermisoEditar.includes(user.rol)

    if (!tienePermisoEditar) {
      router.push('/dashboard')
    }
  }, [user, router])

  useEffect(() => {
    setTimeout(() => {
      setEventos([
        {
          id: '1',
          nombre: 'Procesión del Señor de los Milagros',
          type: 'Procesion',
          idType: 1,
          fecha: '2025-10-18',
          hora: '14:00',
          lugar: 'Centro Histórico de Madrid',
          repetitiva: true,
          caduca: false,
          organizadorId: 1,
          asistentes: [
            { id: '1', nombre: 'Juan García', email: 'juan@hermandad.es' },
            { id: '2', nombre: 'María López', email: 'maria@hermandad.es' },
          ],
          soloHermanos: true,
        },
        {
          id: '2',
          nombre: 'Vigilia de Oración',
          type: 'Vigilia',
          idType: 2,
          fecha: '2025-10-17',
          hora: '20:00',
          lugar: 'Capilla de la Hermandad',
          repetitiva: false,
          caduca: false,
          organizadorId: 2,
          asistentes: [],
          soloHermanos: false,
        },
      ])
      setIsLoading(false)
    }, 500)
  }, [])

  const handleSave = (evento: Evento) => {
    if (editingEvent) {
      setEventos(eventos.map(e => e.id === evento.id ? evento : e))
    } else {
      setEventos([...eventos, { ...evento, id: Date.now().toString() }])
    }
    setShowDialog(false)
    setEditingEvent(null)
  }

  const handleEdit = (evento: Evento) => {
    setEditingEvent(evento)
    setShowDialog(true)
  }

  const handleDelete = (id: string) => {
    setEventos(eventos.filter(e => e.id !== id))
  }

  const canEdit = ['capataz', 'subcapataz', 'organizacion', 'vocal_organizacion', 'patron_andas', 'presidente', 'vicepresidente', 'webdesigner'].includes(user?.rol || '')

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Eventos</h1>
          <p className="mt-2 text-foreground/60">
            Organiza y coordina procesiones y eventos de la hermandad
          </p>
        </div>
        {canEdit && (
          <Button 
            onClick={() => {
              setEditingEvent(null)
              setShowDialog(true)
            }}
            className="bg-[color:var(--color-section-events-border)] hover:opacity-90"
          >
            Crear Evento
          </Button>
        )}
      </div>

      {isLoading ? (
        <Card className="border-2 border-[color:var(--color-section-events-border)] bg-[color:var(--color-section-events)]">
          <CardContent className="p-8 text-center text-foreground/60">
            Cargando eventos...
          </CardContent>
        </Card>
      ) : (
        <EventsList 
          eventos={eventos}
          onEdit={handleEdit}
          onDelete={handleDelete}
          canEdit={canEdit}
        />
      )}

      <EventDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        evento={editingEvent}
        onSave={handleSave}
      />
    </div>
  )
}
