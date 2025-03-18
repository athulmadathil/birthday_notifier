import sgMail from '@sendgrid/mail'

if (!process.env.SENDGRID_API_KEY) {
  console.warn('SENDGRID_API_KEY is not set in environment variables')
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function sendBirthdayEmail(
  to: string,
  name: string,
  birthdayPerson: string
) {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL || 'your-verified-sender@example.com',
    subject: `🎂 Birthday Reminder: ${birthdayPerson}'s Birthday Today!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Birthday Reminder</h2>
        <p>Hi ${name},</p>
        <p>Just a friendly reminder that it's <strong>${birthdayPerson}'s</strong> birthday today! 🎉</p>
        <p>Don't forget to send your wishes!</p>
        <br/>
        <p>Best regards,</p>
        <p>Your Birthday Notifier</p>
      </div>
    `,
  }

  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
} 