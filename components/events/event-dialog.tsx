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
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Evento {
  id: string
  nombre: string
  descripcion: string
  fecha: string
  hora: string
  ubicacion: string
  capacidad: number
  inscritos: number
  estado: 'planeado' | 'en_curso' | 'completado'
  createdAt: string
}

interface EventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  evento: Evento | null
  onSave: (evento: Evento) => void
}

export default function EventDialog({ open, onOpenChange, evento, onSave }: EventDialogProps) {
  const [formData, setFormData] = useState<Omit<Evento, 'id' | 'createdAt'>>({
    nombre: '',
    descripcion: '',
    fecha: '',
    hora: '',
    ubicacion: '',
    capacidad: 0,
    inscritos: 0,
    estado: 'planeado',
  })

  useEffect(() => {
    if (evento) {
      setFormData({
        nombre: evento.nombre,
        descripcion: evento.descripcion,
        fecha: evento.fecha,
        hora: evento.hora,
        ubicacion: evento.ubicacion,
        capacidad: evento.capacidad,
        inscritos: evento.inscritos,
        estado: evento.estado,
      })
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        fecha: '',
        hora: '',
        ubicacion: '',
        capacidad: 0,
        inscritos: 0,
        estado: 'planeado',
      })
    }
  }, [evento, open])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacidad' || name === 'inscritos' ? parseInt(value) : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (evento) {
      onSave({
        ...formData,
        id: evento.id,
        createdAt: evento.createdAt,
      })
    } else {
      onSave({
        ...formData,
        id: '',
        createdAt: new Date().toISOString(),
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-primary">
            {evento ? 'Editar Evento' : 'Crear Nuevo Evento'}
          </DialogTitle>
          <DialogDescription>
            {evento ? 'Actualiza los detalles del evento' : 'Rellena la información del nuevo evento'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre del Evento</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Procesión del Señor"
              required
              className="border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Describe el evento..."
              required
              rows={3}
              className="border-border resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fecha">Fecha</Label>
              <Input
                id="fecha"
                name="fecha"
                type="date"
                value={formData.fecha}
                onChange={handleChange}
                required
                className="border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hora">Hora</Label>
              <Input
                id="hora"
                name="hora"
                type="time"
                value={formData.hora}
                onChange={handleChange}
                required
                className="border-border"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ubicacion">Ubicación</Label>
            <Input
              id="ubicacion"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              placeholder="Ej: Centro Histórico"
              required
              className="border-border"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="capacidad">Capacidad Máxima</Label>
              <Input
                id="capacidad"
                name="capacidad"
                type="number"
                value={formData.capacidad}
                onChange={handleChange}
                placeholder="100"
                required
                className="border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inscritos">Inscritos</Label>
              <Input
                id="inscritos"
                name="inscritos"
                type="number"
                value={formData.inscritos}
                onChange={handleChange}
                placeholder="0"
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
                <SelectItem value="planeado">Planeado</SelectItem>
                <SelectItem value="en_curso">En Curso</SelectItem>
                <SelectItem value="completado">Completado</SelectItem>
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
              {evento ? 'Actualizar' : 'Crear'} Evento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
