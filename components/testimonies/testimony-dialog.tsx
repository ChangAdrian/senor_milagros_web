'use client'

import { useState } from 'react'
import { Testimony } from '@/app/providers'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface TestimonyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (testimony: Omit<Testimony, 'id' | 'estado' | 'fechaCreacion' | 'fechaAprobacion'>) => void
}

export default function TestimonyDialog({
  open,
  onOpenChange,
  onSave,
}: TestimonyDialogProps) {
  const [formData, setFormData] = useState({
    nombreAutor: '',
    contenido: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nombreAutor.trim() || !formData.contenido.trim()) {
      alert('Por favor completa todos los campos')
      return
    }

    onSave({
      nombreAutor: formData.nombreAutor,
      contenido: formData.contenido,
    })

    setFormData({ nombreAutor: '', contenido: '' })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[color:var(--color-section-testimonies-border)]">
            Nuevo Testimonio de Fe
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombreAutor">Tu Nombre</Label>
            <Input
              id="nombreAutor"
              placeholder="Ingresa tu nombre completo"
              value={formData.nombreAutor}
              onChange={(e) =>
                setFormData({ ...formData, nombreAutor: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contenido">Tu Testimonio</Label>
            <Textarea
              id="contenido"
              placeholder="Comparte tu testimonio de fe..."
              value={formData.contenido}
              onChange={(e) =>
                setFormData({ ...formData, contenido: e.target.value })
              }
              rows={5}
            />
          </div>

          <p className="text-xs text-foreground/60">
            Tu testimonio será revisado y aprobado por la organización antes de publicarse.
          </p>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false)
                setFormData({ nombreAutor: '', contenido: '' })
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-[color:var(--color-section-testimonies-border)] hover:opacity-90"
            >
              Enviar Testimonio
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
