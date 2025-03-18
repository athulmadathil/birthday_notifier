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
    const days = parseInt(searchParams.get('days') || '7')

    const today = new Date()
    const endDate = new Date(today)
    endDate.setDate(today.getDate() + days)

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        dateOfBirth: true,
        role: true,
        department: true
      }
    })

    const birthdays = users
      .map(user => {
        const birthday = new Date(user.dateOfBirth)
        birthday.setFullYear(today.getFullYear())
        
        // If birthday has passed this year, look at next year
        if (birthday < today) {
          birthday.setFullYear(today.getFullYear() + 1)
        }

        const daysUntil = Math.ceil(
          (birthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        )

        return {
          ...user,
          daysUntil
        }
      })
      .filter(user => user.daysUntil <= days)
      .sort((a, b) => a.daysUntil - b.daysUntil)

    return NextResponse.json({ birthdays })
  } catch (error) {
    console.error('Get upcoming birthdays error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 