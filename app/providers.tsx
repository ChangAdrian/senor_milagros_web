'use client'

import ApiClient from '@/lib/api-client-static'
import API_ROUTES from '@/lib/routes'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  email: string
  nombre: string
  rol: 'hermano' | 'fiscal' | 'adjunto_fiscal' | 'capataz' | 'subcapataz' | 'organizacion' | 'vocal_organizacion' | 'patron_andas' | 'presidente' | 'vicepresidente' | 'webdesigner'
}

export interface Testimony {
  id: string
  nombreAutor: string
  contenido: string
  estado: 'pendiente' | 'aprobado' | 'rechazado'
  fechaCreacion: string
  fechaAprobacion?: string
}

export interface Evento {
  id: string
  nombre: string
  type: string
  idType: number
  fecha: string
  hora: string
  lugar: string
  repetitiva: boolean
  caduca: boolean
  organizadorId: number
  asistentes: Asistente[]
  soloHermanos: boolean
}

export interface Asistente {
  id: string
  nombre: string
  email: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Cargar token del localStorage al montar
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token')
    const savedUser = localStorage.getItem('auth_user')
    
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Usar el API client para hacer la llamada de autenticación
      const response = await ApiClient.post<string>(API_ROUTES.auth.login,
        { email, password }
      )

      if (!response.success) {
        throw new Error(response.message || 'Error en autenticación')
      }

      if (!response.data) {
        throw new Error('No se recibieron datos del servidor')
      }

      console.log('Received token:', response.data)
      setToken(response.data)
      
      // Configurar el token en el API client
      ApiClient.setAuthToken(response.data)
      
      localStorage.setItem('auth_token', response.data)
      localStorage.setItem('auth_user', JSON.stringify(response.data))
    } catch (error) {
      console.error('Error en login:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    // Remover el token del API client
    ApiClient.removeAuthToken()
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (undefined === context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider')
  }
  return context
}
