import nodemailer from 'nodemailer'

type EmailData = {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: EmailData) {
  const { EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_FROM } = process.env

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: EMAIL_SERVER_HOST,
    port: Number(EMAIL_SERVER_PORT),
    secure: false,
    auth: {
      user: EMAIL_SERVER_USER,
      pass: EMAIL_SERVER_PASSWORD,
    },
  })

  try {
    const result = await transporter.sendMail({
      from: `University CareTeam <${EMAIL_FROM}>`,
      to,
      subject,
      html,
    })
    
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Failed to send email:', error)
    return { success: false, error }
  }
}

export function generateVerificationEmail(
  name: string,
  verificationLink: string
) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #166cbb;">Verify Your University CareTeam Account</h2>
      <p>Hello ${name},</p>
      <p>Thank you for registering with the University Health Portal. Please click the button below to verify your email address and activate your account.</p>
      
      <div style="text-align: center; margin: 25px 0;">
        <a href="${verificationLink}" style="background-color: #166cbb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Verify Email Address
        </a>
      </div>
      
      <p>If you're having trouble with the button above, copy and paste the URL below into your web browser:</p>
      <p style="word-break: break-all; color: #666;">${verificationLink}</p>
      
      <p>If you did not create an account, you can safely ignore this email.</p>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>This is an automated email. Please do not reply.</p>
      </div>
    </div>
  `
} 