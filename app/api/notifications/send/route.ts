import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyAuth } from '@/lib/auth'
import sgMail from '@sendgrid/mail'

if (!process.env.SENDGRID_API_KEY) {
  console.warn('SENDGRID_API_KEY is not set in environment variables')
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(request: Request) {
  try {
    const user = await verifyAuth(request as NextRequest)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { userId, type, template: templateId, customMessage } = await request.json()

    // Get the user to send notification to
    const recipient = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!recipient) {
      return NextResponse.json(
        { error: 'Recipient not found' },
        { status: 404 }
      )
    }

    let content = customMessage
    if (templateId) {
      const template = await prisma.template.findUnique({
        where: { id: templateId }
      })
      if (template) {
        content = template.content
          .replace('{{name}}', recipient.name)
          .replace('{{sender}}', user.name)
      }
    }

    const notification = await prisma.notification.create({
      data: {
        userId,
        type,
        templateId,
        customMessage,
        status: 'PENDING'
      }
    })

    if (type === 'EMAIL') {
      try {
        await sgMail.send({
          to: recipient.email,
          from: process.env.SENDGRID_FROM_EMAIL || 'your-verified-sender@example.com',
          subject: 'Birthday Wishes! 🎂',
          html: content || 'Happy Birthday!'
        })

        await prisma.notification.update({
          where: { id: notification.id },
          data: { status: 'SUCCESS' }
        })

        await prisma.eventLog.create({
          data: {
            type: 'EMAIL',
            recipient: recipient.email,
            status: 'SUCCESS',
            details: 'Email sent successfully'
          }
        })
      } catch (error) {
        await prisma.notification.update({
          where: { id: notification.id },
          data: { status: 'FAILED' }
        })

        await prisma.eventLog.create({
          data: {
            type: 'EMAIL',
            recipient: recipient.email,
            status: 'FAILED',
            details: error.message
          }
        })

        throw error
      }
    }

    return NextResponse.json({
      success: true,
      notificationId: notification.id
    })
  } catch (error) {
    console.error('Send notification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 