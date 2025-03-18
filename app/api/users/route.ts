import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'
import { validateUserInput } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request as NextRequest)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, dateOfBirth, role, email, department } = body

    const errors = validateUserInput({ email, dateOfBirth, role })
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 })
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        dateOfBirth: new Date(dateOfBirth),
        role: role.toUpperCase(),
        email,
        department,
        username: email.split('@')[0], // Generate username from email
        password: await require('bcryptjs').hash('changeme123', 10) // Temporary password
      },
      select: {
        id: true,
        name: true,
        dateOfBirth: true,
        role: true,
        email: true,
        department: true
      }
    })

    return NextResponse.json(newUser)
  } catch (error) {
    console.error('Create user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || ''

    const skip = (page - 1) * limit

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { department: { contains: search, mode: 'insensitive' } }
          ]
        }
      : {}

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          dateOfBirth: true,
          role: true,
          email: true,
          department: true
        },
        orderBy: { name: 'asc' }
      }),
      prisma.user.count({ where })
    ])

    return NextResponse.json({
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Get users error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 