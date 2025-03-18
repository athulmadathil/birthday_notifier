import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const searchParams = request.nextUrl.searchParams
    const filter = searchParams.get('filter') || 'all'
    const start = searchParams.get('start')
    const end = searchParams.get('end')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = {
      ...(filter !== 'all' && { type: filter.toUpperCase() }),
      ...(start && {
        timestamp: {
          gte: new Date(start)
        }
      }),
      ...(end && {
        timestamp: {
          ...((start && { gte: new Date(start) }) || {}),
          lt: new Date(new Date(end).getTime() + 24 * 60 * 60 * 1000) // Include the entire end day
        }
      })
    }

    const [logs, total] = await Promise.all([
      prisma.eventLog.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          timestamp: 'desc'
        }
      }),
      prisma.eventLog.count({ where })
    ])

    return NextResponse.json({
      logs,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error('Get logs error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 