'use client'

import { useState, useEffect } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

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

interface HermanoDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hermano: Hermano | null
  onSave: (hermano: Hermano) => void
}

export default function HermanoDialog({ open, onOpenChange, hermano, onSave }: HermanoDialogProps) {
  const [formData, setFormData] = useState<Omit<Hermano, 'id' | 'sanciones'>>({
    nombre: '',
    email: '',
    telefono: '',
    fechaIngreso: '',
    cargo: '',
    estado: 'activo',
  })

  useEffect(() => {
    if (hermano) {
      setFormData({
        nombre: hermano.nombre,
        email: hermano.email,
        telefono: hermano.telefono,
        fechaIngreso: hermano.fechaIngreso,
        cargo: hermano.cargo,
        estado: hermano.estado,
      })
    } else {
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        fechaIngreso: new Date().toISOString().split('T')[0],
        cargo: '',
        estado: 'activo',
      })
    }
  }, [hermano, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (hermano) {
      onSave({
        ...formData,
        id: hermano.id,
        sanciones: hermano.sanciones,
      })
    } else {
      onSave({
        ...formData,
        id: '',
        sanciones: 0,
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-primary">
            {hermano ? 'Editar Hermano' : 'Agregar Nuevo Hermano'}
          </DialogTitle>
          <DialogDescription>
            {hermano ? 'Actualiza los datos del hermano' : 'Ingresa la información del nuevo hermano'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Juan García López"
              required
              className="border-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="juan@example.com"
                required
                className="border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+34 666 123 456"
                required
                className="border-border"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fechaIngreso">Fecha de Ingreso</Label>
              <Input
                id="fechaIngreso"
                name="fechaIngreso"
                type="date"
                value={formData.fechaIngreso}
                onChange={handleChange}
                required
                className="border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cargo">Cargo</Label>
              <Input
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                placeholder="Ej: Hermano, Vocal, etc"
                required
                className="border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="estado">Estado</Label>
            <Select 
              value={formData.estado} 
              onValueChange={(value) => handleSelectChange('estado', value)}
            >
              <SelectTrigger className="border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="activo">Activo</SelectItem>
                <SelectItem value="inactivo">Inactivo</SelectItem>
                <SelectItem value="sancionado">Sancionado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90"
            >
              {hermano ? 'Actualizar' : 'Agregar'} Hermano
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
