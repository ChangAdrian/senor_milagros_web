'use client'

import { useState } from 'react'
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
import { Textarea } from '@/components/ui/textarea'
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

interface SancionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  hermano: Hermano | null
  onSave: (sancion: any) => void
}

export default function SancionDialog({ open, onOpenChange, hermano, onSave }: SancionDialogProps) {
  const [formData, setFormData] = useState({
    tipo: 'amonestacion',
    razon: '',
    duracion: 1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duracion' ? parseInt(value) : value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, tipo: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    onSave({
      hermanoId: hermano?.id,
      tipo: formData.tipo,
      razon: formData.razon,
      fecha: new Date().toISOString().split('T')[0],
      duracion: formData.duracion,
    })

    setFormData({ tipo: 'amonestacion', razon: '', duracion: 1 })
  }

  if (!hermano) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-destructive">Agregar Sanción</DialogTitle>
          <DialogDescription>
            Registrando sanción para: {hermano.nombre}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Sanción</Label>
            <Select 
              value={formData.tipo}
              onValueChange={handleSelectChange}
            >
              <SelectTrigger className="border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="amonestacion">Amonestación</SelectItem>
                <SelectItem value="suspension">Suspensión</SelectItem>
                <SelectItem value="expulsion_temporal">Expulsión Temporal</SelectItem>
                <SelectItem value="expulsion_permanente">Expulsión Permanente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="razon">Motivo de la Sanción</Label>
            <Textarea
              id="razon"
              name="razon"
              value={formData.razon}
              onChange={handleChange}
              placeholder="Describe el motivo de la sanción..."
              required
              rows={4}
              className="border-border resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duracion">Duración (en meses)</Label>
            <Input
              id="duracion"
              name="duracion"
              type="number"
              value={formData.duracion}
              onChange={handleChange}
              placeholder="1"
              min="1"
              required
              className="border-border"
            />
          </div>

          <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
            Esta acción registrará una sanción permanente en el historial del hermano.
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
              className="bg-destructive hover:bg-destructive/90"
            >
              Registrar Sanción
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
