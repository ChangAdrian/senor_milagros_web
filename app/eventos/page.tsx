'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import EventsList from '@/components/events/events-list'
import { Calendar, MapPin, Clock, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function EventosPage() {
  const eventos = [
    {
      id: '1',
      nombre: 'Vigilia de Oración',
      type: 'Vigilia',
      idType: 2,
      fecha: new Date(2025, 9, 16).toISOString(),
      hora: '8:00 PM',
      lugar: 'Capilla de la Hermandad',
      repetitiva: true,
      caduca: false,
      organizadorId: 1,
      asistentes: [],
      soloHermanos: false
    },
    {
      id: '2',
      nombre: 'Reunión de Hermanos',
      type: 'Reunion',
      idType: 3,
      fecha: new Date(2025, 9, 18).toISOString(),
      hora: '5:00 PM',
      lugar: 'Sede de la Hermandad',
      repetitiva: true,
      caduca: false,
      organizadorId: 1,
      asistentes: [],
      soloHermanos: false
    },
    {
      id: '3',
      nombre: 'Procesión Solemne',
      type: 'Procesion',
      idType: 1,
      fecha: new Date(2025, 9, 5).toISOString(),
      hora: '6:00 PM',
      lugar: 'Centro de Madrid',
      repetitiva: false,
      caduca: true,
      organizadorId: 1,
      asistentes: [],
      soloHermanos: false
    }
  ]

  const eventosActivos = eventos.filter(e => !e.caduca)
  const eventosCaducados = eventos.filter(e => e.caduca)

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <ArrowLeft size={20} />
              <span className="font-semibold">Volver</span>
            </Link>
            <h1 className="text-2xl font-bold text-primary">Todos los Eventos</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Eventos Vigentes</h2>
          <p className="text-foreground/60">Procesiones, vigilias y reuniones activas</p>
        </div>

        {eventosActivos.length > 0 ? (
          <EventsList 
            eventos={eventosActivos}
            onEdit={() => {}}
            onDelete={() => {}}
            canEdit={false}
          />
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground/60">No hay eventos vigentes en este momento</p>
          </div>
        )}
      </section>

      {eventosCaducados.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 border-t">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Eventos Pasados</h2>
            <p className="text-foreground/60">Historias de procesiones y eventos ya realizados</p>
          </div>

          <EventsList 
            eventos={eventosCaducados}
            onEdit={() => {}}
            onDelete={() => {}}
            canEdit={false}
          />
        </section>
      )}
    </div>
  )
}
