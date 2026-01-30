'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    participacion: '',
    mensaje: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Aquí irá la lógica para enviar el email
      // Por ahora solo simulamos
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess(true)
      setFormData({ nombre: '', email: '', telefono: '', participacion: '', mensaje: '' })
      
      setTimeout(() => setSuccess(false), 5000)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-primary">Formulario de Contacto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefono">Teléfono</Label>
            <Input
              id="telefono"
              name="telefono"
              type="tel"
              placeholder="+34 XXX XXX XXX"
              value={formData.telefono}
              onChange={handleChange}
              className="border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="participacion">¿Cómo quieres participar?</Label>
            <select
              id="participacion"
              name="participacion"
              value={formData.participacion}
              onChange={handleChange}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground"
              required
            >
              <option value="">Selecciona una opción</option>
              <option value="hermano">Quiero ser hermano/a</option>
              <option value="evento">Quiero participar en eventos</option>
              <option value="voluntario">Quiero ser voluntario/a</option>
              <option value="informacion">Solo solicito información</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensaje">Mensaje</Label>
            <Textarea
              id="mensaje"
              name="mensaje"
              placeholder="Cuéntanos tu devoción al Señor de los Milagros..."
              value={formData.mensaje}
              onChange={handleChange}
              required
              rows={4}
              className="border-border resize-none"
            />
          </div>

          {success && (
            <div className="rounded-md bg-green-500/10 p-3 text-sm text-green-700 dark:text-green-400">
              ¡Solicitud enviada correctamente! Nos pondremos en contacto en breve.
            </div>
          )}

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isLoading ? 'Enviando...' : 'Enviar Solicitud'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
