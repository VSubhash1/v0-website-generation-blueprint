import { sendContactFormEmail } from '@/lib/email'
import { NextRequest, NextResponse } from 'next/server'

// Mark this route as dynamic to prevent static optimization
export const dynamic = 'force-dynamic'

interface ContactFormData {
  name: string
  phone: string
  email: string
  company: string
  website: string
  businessType: string
  services: string
  turnover: string
  monthlyBudget: string
  timeline: string
  preferredDate: string
  preferredTimezone: string
  preferredMode: string
  message: string
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    // Send email
    await sendContactFormEmail(body)

    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}
