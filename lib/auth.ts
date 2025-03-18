import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'
import { prisma } from './prisma'

export interface JWTPayload {
  userId: string
  role: string
}

export async function verifyAuth(request: NextRequest | null = null) {
  try {
    let token: string | undefined

    if (request) {
      // If request is provided, get token from request cookies
      token = request.cookies.get('token')?.value
    } else {
      // Otherwise use the cookies() API
      const cookieStore = cookies()
      token = (await cookieStore).get('token')?.value
    }

    if (!token) {
      return null
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key'
    ) as JWTPayload

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        name: true,
      },
    })

    return user
  } catch (error) {
    return null
  }
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '24h' }
  )
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10)
  return bcrypt.hash(password, salt)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
} 