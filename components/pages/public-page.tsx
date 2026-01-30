'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import LoginDialog from '@/components/auth/login-dialog'
import ContactForm from '@/components/forms/contact-form'
import TestimonyDialog from '@/components/testimonies/testimony-dialog'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, Heart, Users, Cable as Candle, Calendar, Music } from 'lucide-react'
import EventsList from '@/components/events/events-list'
import Link from 'next/link'

export default function PublicPage() {
  const [showLogin, setShowLogin] = useState(false)
  const [showTestimonyModal, setShowTestimonyModal] = useState(false)

  const testimonios = [
    {
      id: 1,
      nombre: "Juan Martínez",
      rol: "Hermano",
      testimonio: "La devoción al Señor de los Milagros ha transformado mi vida. Esta hermandad es una familia que te acoge sin importar nada.",
      foto: "/thoughtful-man.png"
    },
    {
      id: 2,
      nombre: "María García",
      rol: "Hermana",
      testimonio: "Encontré aquí no solo una comunidad de fe, sino amigos de verdad. Los valores que predicamos son los que vivimos día a día.",
      foto: "/portrait-woman.png"
    },
    {
      id: 3,
      nombre: "Carlos López",
      rol: "Capataz",
      testimonio: "Ser parte de esta hermandad es un honor. El compromiso de cada miembro con nuestra misión es simplemente inspirador.",
      foto: "/portrait-man-serious.jpg"
    },
    {
      id: 4,
      nombre: "Ana Rodríguez",
      rol: "Organizadora",
      testimonio: "La organización y el espíritu de servicio que veo en cada evento me recuerda por qué amamos al Señor de los Milagros.",
      foto: "/portrait-woman-smile.jpg"
    }
  ]

  const valores = [
    {
      icon: Heart,
      titulo: "Fe y Devoción",
      descripcion: "Dedicados al Señor de los Milagros con corazón sincero"
    },
    {
      icon: Users,
      titulo: "Comunidad Unida",
      descripcion: "Familia de hermanos ligados por tradición y valores"
    },
    {
      icon: Candle,
      titulo: "Tradición Viva",
      descripcion: "Preservando costumbres que nos definen como pueblo"
    }
  ]

  const handleTestimonySubmit = () => {
    setShowTestimonyModal(false)
  }

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
      asistentes: [{ id: '1', nombre: 'Juan Pérez', email: 'juan@example.com' }],
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
      asistentes: [{ id: '1', nombre: 'María García', email: 'maria@example.com' }],
      soloHermanos: true
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navbar */}
      <header className="sticky top-0 z-50 border-b border-border/50 bg-card/80 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-primary-foreground font-bold text-lg">
                HM
              </div>
              <div>
                <h1 className="text-xl font-bold text-primary">Hermandad</h1>
                <p className="text-xs text-foreground/60">Señor de los Milagros</p>
              </div>
            </div>
            <Button onClick={() => setShowLogin(true)} className="bg-primary hover:bg-primary/90">
              Acceder
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/15 via-transparent to-background py-24 sm:py-40">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-block rounded-full bg-primary/10 px-6 py-2 text-sm font-semibold text-primary">
            Bienvenido a nuestra comunidad de fe
          </div>
          
          <h2 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
            Hermandad del
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Señor de los Milagros</span>
          </h2>
          
          <p className="mt-8 text-balance text-xl text-foreground/70 sm:text-2xl max-w-3xl mx-auto">
            Un espacio sagrado de fe, devoción y comunidad dedicado a mantener viva nuestra tradición espiritual en Madrid
          </p>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button onClick={() => setShowLogin(true)} size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
              Acceder a la Plataforma
            </Button>
            <Button onClick={() => setShowLogin(true)} size="lg" variant="outline" className="text-lg px-8 py-6">
              Conocer más
            </Button>
          </div>
        </div>
      </section>

      {/* Valores Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {valores.map((valor, index) => {
            const Icon = valor.icon
            return (
              <div key={index} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                <div className="relative bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-shadow">
                  <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 text-primary">
                    <Icon size={28} />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">{valor.titulo}</h3>
                  <p className="text-foreground/70">{valor.descripcion}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="bg-gradient-to-b from-[color:var(--section-history-bg)] to-background py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6">Nuestra Historia</h2>
              <div className="space-y-4 text-foreground/70">
                <p className="text-lg">
                  La Hermandad del Señor de los Milagros es una comunidad de fe arraigada en la tradición religiosa española, dedicada a la devoción y celebración del Señor de los Milagros.
                </p>
                <p className="text-lg">
                  A través de nuestras procesiones, eventos comunitarios y actos de servicio, mantenemos viva una tradición de más de cien años que define nuestra identidad cultural y espiritual.
                </p>
                <p className="text-lg">
                  Somos una familia de hermanos unidos por valores de solidaridad, respeto, fe sincera y compromiso comunitario que nos impulsa a servir a Dios y al prójimo.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-xl overflow-hidden border border-border shadow-lg">
              <img 
                src="/procesi-n-religiosa-hermandad-tradicional.jpg" 
                alt="Hermandad"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Eventos Section */}
      <section className="section-eventos py-20 sm:py-32 border-t border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">Próximos Eventos</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Acompáñanos en nuestras procesiones, vigilias y reuniones comunitarias
            </p>
            <Link href="/eventos">
              <Button variant="outline" className="mt-6 border-[color:var(--section-eventos-border)] text-foreground hover:bg-[color:var(--section-eventos-bg)]">
                Ver Todos los Eventos
              </Button>
            </Link>
          </div>

          <EventsList 
            eventos={eventos}
            onEdit={() => {}}
            onDelete={() => {}}
            canEdit={false}
          />
        </div>
      </section>

      {/* Himno Section - New section for hymn */}
      <section className="bg-gradient-to-b from-secondary/10 to-background py-20 sm:py-32 border-t border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Music className="text-secondary" size={32} />
                <h2 className="text-4xl font-bold text-foreground">Himno Oficial</h2>
              </div>
              <p className="text-lg text-foreground/70 mb-6">
                El himno sagrado de nuestra hermandad, dedicado al Señor de los Milagros. Una expresión musical de nuestra fe, devoción y compromiso comunitario que ha acompañado nuestras procesiones por generaciones.
              </p>
              <Link href="/himno">
                <Button size="lg" className="bg-secondary hover:bg-secondary/90 gap-2">
                  <Music size={20} />
                  Escuchar y Descargar
                </Button>
              </Link>
            </div>
            <div className="bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-xl p-8 border border-secondary/30">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white">
                <Music size={64} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios de Fe Section */}
      <section className="section-testimonios py-20 sm:py-32 border-t border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">Testimonios de Fe</h2>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
              Historias de transformación, devoción y comunidad desde el corazón de nuestros hermanos
            </p>
            <div className="flex gap-4 justify-center flex-wrap mt-6">
              <Button 
                onClick={() => setShowTestimonyModal(true)}
                className="bg-[color:var(--color-section-testimonies-border)] hover:opacity-90"
              >
                Compartir tu Testimonio
              </Button>
              <Link href="/testimonios">
                <Button variant="outline" className="border-[color:var(--color-section-testimonies-border)] text-foreground hover:bg-[color:var(--section-testimonios-bg)]">
                  Ver Todos los Testimonios
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {testimonios.map((testimonio) => (
              <div key={testimonio.id} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
                <Card className="relative border border-border bg-card hover:shadow-lg transition-all duration-300 h-full">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-contacto py-20 sm:py-32 border-t border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">Ponte en Contacto</h2>
            <p className="text-xl text-foreground/60">¿Preguntas o quieres unirte a nuestra comunidad?</p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Left Column - Contact Info */}
            <div className="space-y-6">
              <Card className="border border-[color:var(--section-contact-border)] bg-card hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex flex-col gap-8">
                    {/* Location */}
                    <div className="flex gap-4">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[color:var(--section-contact-border)] to-secondary text-primary-foreground shadow-sm">
                        <MapPin size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-lg">Ubicación</h4>
                        <p className="text-foreground/75 text-base mt-2">Hermandad del Señor de los Milagros</p>
                        <p className="text-foreground/60 text-sm mt-1">Calle Príncipe, 28</p>
                        <p className="text-foreground/60 text-sm">Madrid, 28001 España</p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex gap-4">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-[color:var(--section-contact-border)] text-primary-foreground shadow-sm">
                        <Phone size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-lg">Teléfono</h4>
                        <p className="text-foreground/75 text-base font-medium mt-2">+34 915 234 567</p>
                        <p className="text-foreground/60 text-sm mt-1">Lun - Dom: 10:00 AM - 8:00 PM</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex gap-4">
                      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[color:var(--section-contact-border)] to-secondary text-primary-foreground shadow-sm">
                        <Mail size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground text-lg">Correo Electrónico</h4>
                        <p className="text-foreground/75 text-base font-medium mt-2">hermandad@milagros.es</p>
                        <p className="text-foreground/60 text-sm mt-1">Respuesta en 24-48 horas</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Networks */}
              <div className="bg-card rounded-lg border border-[color:var(--section-contact-border)] p-6">
                <h4 className="font-semibold text-foreground text-lg mb-6">Síguenos en Redes Sociales</h4>
                <div className="flex gap-4">
                  {[
                    { Icon: Facebook, name: 'Facebook' },
                    { Icon: Instagram, name: 'Instagram' },
                    { Icon: Youtube, name: 'YouTube' }
                  ].map(({ Icon, name }, i) => (
                    <button 
                      key={i}
                      className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-[color:var(--section-contact-border)] to-secondary text-primary-foreground hover:shadow-lg transition-all duration-300 shadow-md hover:scale-105"
                      title={name}
                    >
                      <Icon size={24} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Procession Hours */}
              <Card className="border border-[color:var(--section-contact-border)] bg-card hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h4 className="font-semibold text-foreground text-lg mb-6 flex items-center gap-2">
                    <Clock size={20} className="text-[color:var(--section-contact-border)]" />
                    Horarios de Procesión (Octubre)
                  </h4>
                  <ul className="space-y-4 text-foreground/70">
                    <li className="flex gap-3 items-start border-l-2 border-[color:var(--section-contact-border)] pl-4">
                      <div>
                        <p className="font-semibold text-foreground">Primera Procesión</p>
                        <p className="text-sm">Primer domingo de octubre</p>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start border-l-2 border-[color:var(--section-contact-border)] pl-4">
                      <div>
                        <p className="font-semibold text-foreground">Procesión Central</p>
                        <p className="text-sm">18 de octubre</p>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start border-l-2 border-[color:var(--section-contact-border)] pl-4">
                      <div>
                        <p className="font-semibold text-foreground">Última Procesión</p>
                        <p className="text-sm">Último domingo de octubre</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-primary/5 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-3 mb-8">
            <div>
              <h5 className="font-semibold text-foreground">Hermandad</h5>
              <p className="mt-2 text-sm text-foreground/60">
                Señor de los Milagros
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-foreground">Enlaces</h5>
              <ul className="mt-2 space-y-1 text-sm text-foreground/60">
                <li><Link href="/" className="hover:text-primary transition-colors">Inicio</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Acerca de</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold text-foreground">Legal</h5>
              <ul className="mt-2 space-y-1 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-primary transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Términos</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 text-center text-sm text-foreground/60">
            <p>© 2025 Hermandad del Señor de los Milagros. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Login Dialog */}
      <LoginDialog open={showLogin} onOpenChange={setShowLogin} />
      
      <TestimonyDialog
        open={showTestimonyModal}
        onOpenChange={setShowTestimonyModal}
        onSave={handleTestimonySubmit}
      />
    </div>
  )
}
