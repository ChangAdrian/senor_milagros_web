'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Music, Download, Play, ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function HimnoPage() {
  const [isPlaying, setIsPlaying] = useState(false)

  const himno = {
    titulo: "Himno Oficial de la Hermandad",
    compositor: "Compositor Tradicional",
    descripcion: "Himno sagrado dedicado al Señor de los Milagros, símbolo de nuestra fe y devoción comunitaria.",
    letra: `
      Verso 1:
      Señor de los Milagros, tu nombre bendecido,
      Por siempre en nuestros corazones ha de estar,
      Protege a esta hermandad, que en ti ha confiado,
      Tu gloria y tu poder, siempre nos guiarán.

      Coro:
      Alabado sea el Señor de los Milagros,
      Fuente de gracia, de amor y de perdón,
      En cada procesión, en cada oración,
      Vive en nuestras almas tu bendita redención.

      Verso 2:
      Con traje de púrpura, tu majestad nos llama,
      A ser testimonio de tu infinito amor,
      Por los caminos de Madrid, tu gloria proclama,
      Hermanos unidos en oración y en honor.

      Coro:
      Alabado sea el Señor de los Milagros,
      Fuente de gracia, de amor y de perdón,
      En cada procesión, en cada oración,
      Vive en nuestras almas tu bendita redención.
    `
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
            <h1 className="text-2xl font-bold text-primary">Himno de la Hermandad</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Music className="text-primary" size={32} />
            <h2 className="text-4xl font-bold text-foreground">{himno.titulo}</h2>
          </div>
          <p className="text-lg text-foreground/60 mb-2">Compositor: {himno.compositor}</p>
          <p className="text-foreground/70 leading-relaxed">{himno.descripcion}</p>
        </div>

        {/* Audio Player */}
        <Card className="border border-primary/30 bg-gradient-to-r from-primary/10 to-secondary/10 mb-12">
          <CardContent className="pt-8">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  {isPlaying ? (
                    <div className="flex gap-2">
                      <div className="h-1 w-1 rounded-full bg-primary-foreground animate-pulse"></div>
                      <div className="h-1 w-1 rounded-full bg-primary-foreground animate-pulse"></div>
                      <div className="h-1 w-1 rounded-full bg-primary-foreground animate-pulse"></div>
                    </div>
                  ) : (
                    <Play size={32} className="ml-1" />
                  )}
                </button>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="h-1 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                <div className="flex justify-between text-sm text-foreground/60">
                  <span>00:00</span>
                  <span>3:45</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-primary hover:bg-primary/90 gap-2"
                  onClick={() => {}}
                >
                  <Download size={18} />
                  Descargar MP3
                </Button>
                <Button 
                  variant="outline"
                  className="flex-1 gap-2"
                  onClick={() => {}}
                >
                  <Download size={18} />
                  Descargar PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lyrics */}
        <Card className="border border-border">
          <CardContent className="pt-8">
            <h3 className="text-2xl font-bold text-foreground mb-8">Letra</h3>
            <div className="space-y-8">
              {himno.letra.split('\n\n').map((parrafo, idx) => (
                <div key={idx} className="text-foreground/75 whitespace-pre-wrap leading-relaxed">
                  {parrafo.trim()}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
