'use client'

import { User } from '@/app/providers'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  user: User
}

const roleMenus = {
  hermano: [
    { label: 'Eventos', href: '/dashboard/eventos', icon: '📅' },
  ],
  fiscal: [
    { label: 'Sanciones', href: '/dashboard/sanciones', icon: '⚖️' },
  ],
  adjunto_fiscal: [
    { label: 'Sanciones', href: '/dashboard/sanciones', icon: '⚖️' },
  ],
  capataz: [
    { label: 'Eventos', href: '/dashboard/eventos', icon: '📅' },
  ],
  subcapataz: [
    { label: 'Eventos', href: '/dashboard/eventos', icon: '📅' },
  ],
  organizacion: [
    { label: 'Hermanos', href: '/dashboard/hermanos', icon: '👥' },
    { label: 'Eventos', href: '/dashboard/eventos', icon: '📅' },
    { label: 'Testimonios', href: '/dashboard/testimonios', icon: '💬' },
  ],
  vocal_organizacion: [
    { label: 'Hermanos', href: '/dashboard/hermanos', icon: '👥' },
    { label: 'Eventos', href: '/dashboard/eventos', icon: '📅' },
    { label: 'Testimonios', href: '/dashboard/testimonios', icon: '💬' },
  ],
  patron_andas: [
    { label: 'Eventos', href: '/dashboard/eventos', icon: '📅' },
  ],
  presidente: [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Eventos', href: '/dashboard/eventos', icon: '📅' },
    { label: 'Hermanos', href: '/dashboard/hermanos', icon: '👥' },
    { label: 'Sanciones', href: '/dashboard/sanciones', icon: '⚖️' },
    { label: 'Testimonios', href: '/dashboard/testimonios', icon: '💬' },
  ],
  vicepresidente: [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Eventos', href: '/dashboard/eventos', icon: '📅' },
    { label: 'Hermanos', href: '/dashboard/hermanos', icon: '👥' },
    { label: 'Sanciones', href: '/dashboard/sanciones', icon: '⚖️' },
    { label: 'Testimonios', href: '/dashboard/testimonios', icon: '💬' },
  ],
  webdesigner: [
    { label: 'Dashboard', href: '/dashboard', icon: '📊' },
    { label: 'Eventos', href: '/dashboard/eventos', icon: '📅' },
    { label: 'Hermanos', href: '/dashboard/hermanos', icon: '👥' },
    { label: 'Sanciones', href: '/dashboard/sanciones', icon: '⚖️' },
    { label: 'Testimonios', href: '/dashboard/testimonios', icon: '💬' },
  ],
}

export default function Navigation({ user }: NavigationProps) {
  const pathname = usePathname()
  const menuItems = roleMenus[user.rol] || []

  return (
    <aside className="w-64 border-r border-border bg-sidebar text-sidebar-foreground hidden md:flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground font-bold">
            HM
          </div>
          <div>
            <h1 className="font-bold text-sidebar-foreground">Hermandad</h1>
            <p className="text-xs text-sidebar-foreground/60">Milagros</p>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3 text-xs text-sidebar-foreground/60">
        <p>© 2025 Hermandad</p>
        <p className="mt-1">Señor de los Milagros</p>
      </div>
    </aside>
  )
}
