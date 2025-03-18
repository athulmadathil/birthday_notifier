import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import { validateUserInput } from '@/lib/validation'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, email, password } = body

    // Validate input
    const errors = validateUserInput({ email, password })
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 400 })
    }

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      )
    }

    // Create user
    const hashedPassword = await hashPassword(password)
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        name: username, // Default name to username initially
        dateOfBirth: new Date(), // Default date, should be updated later
        department: 'Unassigned', // Default department
        role: 'STUDENT' // Default role
      }
    })

    return NextResponse.json({
      success: true,
      message: 'User created successfully'
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
} 