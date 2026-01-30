'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { MapPin, Clock } from 'lucide-react'

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
  asistentes: Asistente[]
  soloHermanos: boolean
}

interface Asistente {
  id: string
  nombre: string
  email: string
}

interface EventsListProps {
  eventos: Evento[]
  onEdit: (evento: Evento) => void
  onDelete: (id: string) => void
  canEdit: boolean
}

const typeColors: Record<string, string> = {
  Procesion: 'bg-purple-900 text-white',
  Vigilia: 'bg-amber-900 text-white',
  Reunion: 'bg-blue-900 text-white',
  Evento: 'bg-indigo-900 text-white',
}

const estadoBadge = {
  planeado: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  en_curso: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
  completado: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
}

export default function EventsList({ eventos, onEdit, onDelete, canEdit }: EventsListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (eventos.length === 0) {
    return (
      <Card className="border border-border">
        <CardContent className="p-12 text-center">
          <p className="text-lg text-foreground/60">No hay eventos registrados</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {eventos.map((evento) => (
        <div key={evento.id} className="group relative">
          <Card className="border border-[color:var(--color-section-events-border)] overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-900 to-purple-700">
              <img 
                src="/hermandad-evento-procesi-n.jpg" 
                alt={evento.nombre}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <Badge className={`absolute top-4 right-4 ${typeColors[evento.type] || 'bg-gray-600 text-white'}`}>
                {evento.type}
              </Badge>
              {evento.repetitiva && (
                <Badge className="absolute top-4 left-4 bg-yellow-600 text-white">
                  Repetitivo
                </Badge>
              )}
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-[color:var(--color-section-events-border)] line-clamp-2">{evento.nombre}</CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4 flex-1">
              {/* Fecha y Hora */}
              <div className="flex gap-3 items-start">
                <Clock size={18} className="text-[color:var(--color-section-events-border)] flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground/60">Fecha y Hora</p>
                  <p className="font-semibold text-foreground text-sm">
                    {formatDate(evento.fecha)} a las {evento.hora}
                  </p>
                </div>
              </div>

              {/* Ubicación */}
              <div className="flex gap-3 items-start">
                <MapPin size={18} className="text-[color:var(--color-section-events-border)] flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground/60">Ubicación</p>
                  <p className="font-semibold text-foreground text-sm truncate">{evento.lugar}</p>
                </div>
              </div>

              {/* Botones */}
              {canEdit && (
                <div className="mt-4 pt-4 border-t border-border flex gap-2">
                  <Button
                    onClick={() => onEdit(evento)}
                    variant="outline"
                    size="sm"
                    className="flex-1 border-[color:var(--color-section-events-border)] text-[color:var(--color-section-events-border)] hover:bg-[color:var(--color-section-events-border)]/10"
                  >
                    Editar
                  </Button>
                  <Button
                    onClick={() => onDelete(evento.id)}
                    variant="outline"
                    size="sm"
                    className="flex-1 text-destructive hover:bg-destructive/10"
                  >
                    Eliminar
                  </Button>
                </div>
              )}

              {!canEdit && (
                <Button className="w-full bg-[color:var(--color-section-events-border)] hover:opacity-90 text-white">
                  Más Información
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}
