import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Datos simulados - Reemplazar con base de datos real
const USERS = [
  {
    id: '1',
    email: 'admin@hermandad.es',
    password: 'admin123',
    nombre: 'Administrador',
    rol: 'presidente' as const,
  },
  {
    id: '2',
    email: 'hermano@hermandad.es',
    password: 'hermano123',
    nombre: 'Juan Hermano',
    rol: 'hermano' as const,
  },
  {
    id: '3',
    email: 'fiscal@hermandad.es',
    password: 'fiscal123',
    nombre: 'Fiscal Mayor',
    rol: 'fiscal' as const,
  },
]

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    const user = USERS.find(u => u.email === email && u.password === password)

    if (!user) {
      return NextResponse.json(
        { error: 'Email o contraseña incorrectos' },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, rol: user.rol },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        rol: user.rol,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Error en la autenticación' },
      { status: 500 }
    )
  }
}
