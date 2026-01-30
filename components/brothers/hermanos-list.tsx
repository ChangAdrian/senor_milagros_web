'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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

interface HermanosListProps {
  hermanos: Hermano[]
  onEdit: (hermano: Hermano) => void
  onDelete: (id: string) => void
  onAddSancion: (hermano: Hermano) => void
  canEdit: boolean
}

const estadoBadge = {
  activo: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  inactivo: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  sancionado: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
}

export default function HermanosList({
  hermanos,
  onEdit,
  onDelete,
  onAddSancion,
  canEdit,
}: HermanosListProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (hermanos.length === 0) {
    return (
      <Card className="border border-border">
        <CardContent className="p-12 text-center">
          <p className="text-lg text-foreground/60">No hay hermanos registrados</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Card className="border border-border">
        <CardHeader>
          <CardTitle className="text-primary">Registros de Hermanos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {hermanos.map((hermano) => (
              <div 
                key={hermano.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{hermano.nombre}</h3>
                  <div className="mt-2 grid gap-2 text-sm text-foreground/60">
                    <p>Email: {hermano.email}</p>
                    <p>Teléfono: {hermano.telefono}</p>
                    <p>Cargo: {hermano.cargo}</p>
                    <p>Fecha de Ingreso: {formatDate(hermano.fechaIngreso)}</p>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-2 md:items-end">
                  <Badge className={estadoBadge[hermano.estado]}>
                    {hermano.estado}
                  </Badge>
                  <div className="text-sm font-semibold text-foreground">
                    Sanciones: {hermano.sanciones}
                  </div>

                  {canEdit && (
                    <div className="mt-2 flex gap-2 flex-wrap">
                      <Button
                        onClick={() => onEdit(hermano)}
                        variant="outline"
                        size="sm"
                      >
                        Editar
                      </Button>
                      <Button
                        onClick={() => onDelete(hermano.id)}
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                      >
                        Eliminar
                      </Button>
                      <Button
                        onClick={() => onAddSancion(hermano)}
                        variant="outline"
                        size="sm"
                        className="text-yellow-600 hover:bg-yellow-100 dark:hover:bg-yellow-900"
                      >
                        Sancionar
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
