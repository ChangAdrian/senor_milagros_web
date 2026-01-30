'use client'

import { useAuth } from '@/app/providers'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Navigation from '@/components/navigation/navigation'
import Link from 'next/link'

export default function Dashboard() {
  const { user, logout } = useAuth()

  if (!user) return null

  // Información del rol
  const roleInfo: Record<string, { title: string; description: string; color: string; nextAction?: string; nextHref?: string }> = {
    hermano: {
      title: 'Hermano',
      description: 'Acceso a eventos y participación en la hermandad',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
      nextAction: 'Ver eventos disponibles',
      nextHref: '/dashboard/eventos'
    },
    fiscal: {
      title: 'Fiscal',
      description: 'Gestión de sanciones de hermanos',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
      nextAction: 'Revisar sanciones',
      nextHref: '/dashboard/sanciones'
    },
    adjunto_fiscal: {
      title: 'Adjunto Fiscal',
      description: 'Asistencia en gestión de sanciones',
      color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100',
      nextAction: 'Revisar sanciones',
      nextHref: '/dashboard/sanciones'
    },
    capataz: {
      title: 'Capataz',
      description: 'Coordinación de eventos y participantes',
      color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100',
      nextAction: 'Gestionar eventos',
      nextHref: '/dashboard/eventos'
    },
    subcapataz: {
      title: 'Subcapataz',
      description: 'Asistencia en coordinación de eventos',
      color: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100',
      nextAction: 'Ver eventos',
      nextHref: '/dashboard/eventos'
    },
    organizacion: {
      title: 'Organización',
      description: 'Gestión completa de hermanos, eventos y testimonios',
      color: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100',
      nextAction: 'Gestionar hermanos',
      nextHref: '/dashboard/hermanos'
    },
    vocal_organizacion: {
      title: 'Vocal de Organización',
      description: 'Coordinación en eventos y gestión de hermanos',
      color: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100',
      nextAction: 'Gestionar hermanos',
      nextHref: '/dashboard/hermanos'
    },
    patron_andas: {
      title: 'Patrón de Andas',
      description: 'Coordinación de participantes en procesiones',
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
      nextAction: 'Ver eventos',
      nextHref: '/dashboard/eventos'
    },
    presidente: {
      title: 'Presidente',
      description: 'Acceso total a todos los sistemas',
      color: 'bg-primary text-primary-foreground',
      nextAction: 'Ver estadísticas',
      nextHref: '/dashboard'
    },
    vicepresidente: {
      title: 'Vicepresidente',
      description: 'Acceso total a todos los sistemas',
      color: 'bg-secondary text-secondary-foreground',
      nextAction: 'Ver estadísticas',
      nextHref: '/dashboard'
    },
    webdesigner: {
      title: 'Web Designer',
      description: 'Acceso total a todos los sistemas',
      color: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-100',
      nextAction: 'Ver estadísticas',
      nextHref: '/dashboard'
    },
  }

  const info = roleInfo[user.rol] || roleInfo.hermano
  const isAdmin = ['presidente', 'vicepresidente', 'webdesigner'].includes(user.rol)

  return (
    <div className="flex h-screen bg-background">
      <Navigation user={user} />

      <main className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="border-b border-border bg-card sticky top-0 z-40">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
              <p className="text-sm text-foreground/60 mt-1">
                Bienvenido, {user.nombre}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-foreground/60">{user.email}</p>
                <p className={`text-xs font-semibold px-2 py-1 rounded-md ${info.color} mt-1`}>
                  {info.title}
                </p>
              </div>
              <Button 
                onClick={logout}
                variant="outline"
                size="sm"
              >
                Salir
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto p-8">
          <div className="space-y-6 max-w-7xl">
            {/* Role Card con navegación inteligente */}
            <Card className={`border-2 ${info.color.includes('bg-primary') ? 'border-primary' : 'border-border'}`}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground">Tu Rol: {info.title}</CardTitle>
                {info.nextHref && (
                  <Link href={info.nextHref}>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">
                      → {info.nextAction}
                    </Button>
                  </Link>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{info.description}</p>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            {isAdmin && (
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="border border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-foreground/60">Eventos Activos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-primary">2</p>
                    <p className="text-xs text-foreground/60 mt-2">Procesión, Reunión mensual</p>
                    <Link href="/dashboard/eventos">
                      <Button variant="link" size="sm" className="mt-2 p-0">
                        Ir a Eventos →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-foreground/60">Hermanos Registrados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-secondary">350</p>
                    <p className="text-xs text-foreground/60 mt-2">Activos en la hermandad</p>
                    <Link href="/dashboard/hermanos">
                      <Button variant="link" size="sm" className="mt-2 p-0">
                        Ir a Hermanos →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-sm font-medium text-foreground/60">Sanciones Pendientes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold text-yellow-600">3</p>
                    <p className="text-xs text-foreground/60 mt-2">A revisar este mes</p>
                    <Link href="/dashboard/sanciones">
                      <Button variant="link" size="sm" className="mt-2 p-0">
                        Ir a Sanciones →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Actions con orientación */}
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-2">Acciones Disponibles</h2>
              <p className="text-sm text-foreground/60 mb-4">
                Las siguientes opciones están disponibles según tu rol {info.title}
              </p>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {['capataz', 'subcapataz', 'organizacion', 'vocal_organizacion', 'patron_andas', 'presidente', 'vicepresidente', 'webdesigner'].includes(user.rol) && (
                  <Link href="/dashboard/eventos">
                    <Card className="border border-border hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          📅 Gestión de Eventos
                          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-foreground/60">
                          Crear, editar y gestionar eventos de la hermandad
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                )}

                {['organizacion', 'vocal_organizacion', 'presidente', 'vicepresidente', 'webdesigner'].includes(user.rol) && (
                  <Link href="/dashboard/hermanos">
                    <Card className="border border-border hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          👥 Gestión de Hermanos
                          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-foreground/60">
                          Administrar registros y documentación de hermanos
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                )}

                {['fiscal', 'adjunto_fiscal', 'presidente', 'vicepresidente', 'webdesigner'].includes(user.rol) && (
                  <Link href="/dashboard/sanciones">
                    <Card className="border border-border hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          ⚖️ Registro de Sanciones
                          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-foreground/60">
                          Aplicar y revisar sanciones de hermanos
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                )}

                {['organizacion', 'vocal_organizacion', 'presidente', 'vicepresidente', 'webdesigner'].includes(user.rol) && (
                  <Link href="/dashboard/testimonios">
                    <Card className="border border-border hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          💬 Gestión de Testimonios
                          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-foreground/60">
                          Revisar y aprobar testimonios de fe
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                )}

                {user.rol === 'hermano' && (
                  <Link href="/dashboard/eventos">
                    <Card className="border border-border hover:shadow-lg transition-shadow cursor-pointer group">
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          📅 Eventos
                          <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-xs text-foreground/60">
                          Consulta y apúntate a los eventos disponibles
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </div>
            </div>

            {/* Info Section */}
            <Card className="border border-border bg-primary/5">
              <CardHeader>
                <CardTitle className="text-primary">Información Importante</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-foreground/70">
                <p>
                  • Como {info.title}, tu rol principal es: <span className="font-semibold">{info.nextAction}</span>
                </p>
                <p>
                  • Haz clic en cualquier tarjeta de acciones para ir directamente a esa sección
                </p>
                <p>
                  • Contacta con los administradores si necesitas cambios en tu rol o permisos
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
