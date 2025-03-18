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

    const today = new Date()
    const month = today.getMonth() + 1
    const day = today.getDate()

    const birthdays = await prisma.user.findMany({
      where: {
        AND: [
          {
            dateOfBirth: {
              gte: new Date(0, month - 1, day),
              lt: new Date(0, month - 1, day + 1)
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        dateOfBirth: true,
        role: true,
        department: true
      }
    })

    return NextResponse.json({ birthdays })
  } catch (error) {
    console.error('Get today birthdays error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 