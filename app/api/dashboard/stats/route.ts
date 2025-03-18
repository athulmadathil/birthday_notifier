import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

export const dynamic = 'force-dynamic'

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
    const endDate = new Date(today)
    endDate.setDate(today.getDate() + 7) // Next 7 days

    const [
      totalUsers,
      upcomingBirthdays,
      recentNotifications,
      birthdaysToday
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          dateOfBirth: {
            gte: today,
            lt: endDate
          }
        }
      }),
      prisma.notification.count({
        where: {
          createdAt: {
            gte: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      }),
      prisma.user.count({
        where: {
          dateOfBirth: {
            gte: new Date(0, today.getMonth(), today.getDate()),
            lt: new Date(0, today.getMonth(), today.getDate() + 1)
          }
        }
      })
    ])

    return NextResponse.json({
      totalUsers,
      upcomingBirthdays,
      recentNotifications,
      birthdaysToday
    })
  } catch (error) {
    console.error('Get dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 