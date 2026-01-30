'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/app/providers'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import HermanosList from '@/components/brothers/hermanos-list'
import HermanoDialog from '@/components/brothers/hermano-dialog'
import SancionDialog from '@/components/brothers/sancion-dialog'
import { useRouter } from 'next/navigation'

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

interface Sancion {
  hermanoId: string
  tipo: string
  razon: string
  fecha: string
  duracion: number
}

export default function HermanosPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [hermanos, setHermanos] = useState<Hermano[]>([])
  const [showDialog, setShowDialog] = useState(false)
  const [showSancionDialog, setShowSancionDialog] = useState(false)
  const [editingHermano, setEditingHermano] = useState<Hermano | null>(null)
  const [selectedHermanoForSancion, setSelectedHermanoForSancion] = useState<Hermano | null>(null)
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

  // Simular carga de hermanos
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
      setIsLoading(false)
    }, 500)
  }, [])

  const handleSaveHermano = (hermano: Hermano) => {
    if (editingHermano) {
      setHermanos(hermanos.map(h => h.id === hermano.id ? hermano : h))
    } else {
      setHermanos([...hermanos, { ...hermano, id: Date.now().toString() }])
    }
    setShowDialog(false)
    setEditingHermano(null)
  }

  const handleEditHermano = (hermano: Hermano) => {
    setEditingHermano(hermano)
    setShowDialog(true)
  }

  const handleDeleteHermano = (id: string) => {
    setHermanos(hermanos.filter(h => h.id !== id))
  }

  const handleAddSancion = (hermano: Hermano) => {
    setSelectedHermanoForSancion(hermano)
    setShowSancionDialog(true)
  }

  const handleSaveSancion = (sancion: Sancion) => {
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

  const canEdit = ['organizacion', 'vocal_organizacion', 'presidente', 'vicepresidente', 'webdesigner'].includes(user?.rol || '')

  if (!user) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestión de Hermanos</h1>
          <p className="mt-2 text-foreground/60">
            Administra el registro de hermanos de la hermandad
          </p>
        </div>
        {canEdit && (
          <Button 
            onClick={() => {
              setEditingHermano(null)
              setShowDialog(true)
            }}
            className="bg-primary hover:bg-primary/90"
          >
            Agregar Hermano
          </Button>
        )}
      </div>

      {isLoading ? (
        <Card className="border border-border">
          <CardContent className="p-8 text-center text-foreground/60">
            Cargando hermanos...
          </CardContent>
        </Card>
      ) : (
        <HermanosList 
          hermanos={hermanos}
          onEdit={handleEditHermano}
          onDelete={handleDeleteHermano}
          onAddSancion={handleAddSancion}
          canEdit={canEdit}
        />
      )}

      <HermanoDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        hermano={editingHermano}
        onSave={handleSaveHermano}
      />

      <SancionDialog
        open={showSancionDialog}
        onOpenChange={setShowSancionDialog}
        hermano={selectedHermanoForSancion}
        onSave={handleSaveSancion}
      />
    </div>
  )
}
