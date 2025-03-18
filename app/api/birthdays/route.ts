import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

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
    const month = parseInt(searchParams.get('month') || '')
    const year = parseInt(searchParams.get('year') || '')

    if (isNaN(month) || isNaN(year)) {
      return NextResponse.json(
        { error: 'Invalid month or year' },
        { status: 400 }
      )
    }

    const users = await prisma.user.findMany({
      where: {
        dateOfBirth: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1)
        }
      },
      select: {
        id: true,
        name: true,
        dateOfBirth: true,
        role: true,
        department: true
      }
    })

    const today = new Date()
    const birthdays = users.map((user: { dateOfBirth: string | number | Date }) => {
      const birthday = new Date(user.dateOfBirth)
      birthday.setFullYear(year)
      
      const daysUntilBirthday = Math.ceil(
        (birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )

      return {
        ...user,
        daysUntilBirthday: daysUntilBirthday
      }
    })

    return NextResponse.json({ birthdays })
  } catch (error) {
    console.error('Get birthdays error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 