'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import TestimonyDialog from '@/components/testimonies/testimony-dialog'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function TestimoniosPage() {
  const [showTestimonyModal, setShowTestimonyModal] = useState(false)

  const testimonios = [
    {
      id: 1,
      nombre: "Juan Martínez",
      rol: "Hermano",
      testimonio: "La devoción al Señor de los Milagros ha transformado mi vida. Esta hermandad es una familia que te acoge sin importar nada. He encontrado en ella no solo fe, sino el sentido de pertenencia que buscaba.",
      foto: "/thoughtful-man.png"
    },
    {
      id: 2,
      nombre: "María García",
      rol: "Hermana",
      testimonio: "Encontré aquí no solo una comunidad de fe, sino amigos de verdad. Los valores que predicamos son los que vivimos día a día. Cada procesión me recuerda por qué esto es importante.",
      foto: "/portrait-woman.png"
    },
    {
      id: 3,
      nombre: "Carlos López",
      rol: "Capataz",
      testimonio: "Ser parte de esta hermandad es un honor. El compromiso de cada miembro con nuestra misión es simplemente inspirador. Ver a nuevos hermanos unirse cada año reafirma mi fe.",
      foto: "/portrait-man-serious.jpg"
    },
    {
      id: 4,
      nombre: "Ana Rodríguez",
      rol: "Organizadora",
      testimonio: "La organización y el espíritu de servicio que veo en cada evento me recuerda por qué amamos al Señor de los Milagros. Cada detalle de nuestras procesiones es una expresión de fe.",
      foto: "/portrait-woman-smile.jpg"
    },
    {
      id: 5,
      nombre: "Pedro Sánchez",
      rol: "Hermano",
      testimonio: "Mi participación en la hermandad ha sido fundamental para mi crecimiento espiritual. La comunidad me ha apoyado en los momentos más difíciles de mi vida.",
      foto: "/thoughtful-man.png"
    },
    {
      id: 6,
      nombre: "Isabel Fernández",
      rol: "Hermana",
      testimonio: "Aquí aprendí que la fe no es solo personal, sino comunitaria. Compartir estos momentos con mis hermanos es una bendición que atesoro cada día.",
      foto: "/portrait-woman-smile.jpg"
    }
  ]

  const handleTestimonySubmit = () => {
    setShowTestimonyModal(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft size={20} />
              <span className="font-semibold">Volver</span>
            </Link>
            <h1 className="text-2xl font-bold text-primary">Testimonios de Fe</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-4">Historias de Fe y Devoción</h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto mb-8">
            Conoce las historias de transformación y fe de nuestros hermanos devotos del Señor de los Milagros
          </p>
          <Button 
            onClick={() => setShowTestimonyModal(true)}
            className="bg-primary hover:bg-primary/90"
          >
            Compartir tu Testimonio
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonios.map((testimonio) => (
            <Card key={testimonio.id} className="border border-border bg-card hover:shadow-lg transition-all duration-300 h-full">
              <CardContent className="pt-8">
                <div className="flex gap-4 mb-6">
                  <img 
                    src={testimonio.foto || "/placeholder.svg"} 
                    alt={testimonio.nombre}
                    className="h-16 w-16 rounded-full object-cover border-2 border-primary/20 flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground text-lg">{testimonio.nombre}</h4>
                    <p className="text-sm text-primary font-medium">{testimonio.rol}</p>
                  </div>
                </div>
                <div className="mb-4 text-2xl text-primary/40">"</div>
                <blockquote className="italic text-foreground/75 leading-relaxed">
                  {testimonio.testimonio}
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <TestimonyDialog
        open={showTestimonyModal}
        onOpenChange={setShowTestimonyModal}
        onSave={handleTestimonySubmit}
      />
    </div>
  )
}
