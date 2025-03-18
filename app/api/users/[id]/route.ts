import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'
import { validateUserInput } from '@/lib/validation'

export const dynamic = 'force-dynamic'

type RouteParams = {
  params: {
    id: string
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const user = await verifyAuth(req)
    if (!user || (user.role !== 'ADMIN' && user.id !== params.id)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const { name, dateOfBirth, role, email, department } = body

    const errors = validateUserInput({
      email: email || undefined,
      dateOfBirth: dateOfBirth || undefined,
      role: role || undefined
    })
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: { id: params.id },
      data: {
        ...(name && { name }),
        ...(dateOfBirth && { dateOfBirth: new Date(dateOfBirth) }),
        ...(role && { role: role.toUpperCase() }),
        ...(email && { email }),
        ...(department && { department })
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

    return NextResponse.json({
      success: true,
      user: updatedUser
    })
  } catch (error) {
    console.error('Update user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const user = await verifyAuth(request)
    if (!user || user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await prisma.user.delete({
      where: { id: context.params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete user error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 