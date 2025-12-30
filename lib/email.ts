import { Resend } from 'resend'

interface FormData {
  name: string
  phone: string
  email: string
  company: string
  website: string
  business_type: string
  services: string
  company_turnover: string
  monthly_budget: string
  start_timeline: string
  preferred_date: string
  preferred_timezone: string
  preferred_mode: string
  message: string
}

const resend = new Resend(process.env.RESEND_API_KEY || '')

export async function sendContactFormEmail(data: FormData) {
  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is not set')
    throw new Error('Email service is not configured')
  }

  console.log('🚀 Starting email send for:', data.email)
  console.log('RESEND_API_KEY exists:', !!process.env.RESEND_API_KEY)
  console.log('EMAIL_FROM:', process.env.EMAIL_FROM)

  const emailContent = `
New Contact Form Submission
============================

PERSONAL INFORMATION
--------------------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}

COMPANY INFORMATION
-------------------
Company Name: ${data.company || 'Not provided'}
Website: ${data.website || 'Not provided'}
Business Type: ${data.business_type || 'Not provided'}
Company Turnover (₹): ${data.company_turnover || 'Not provided'}

PROJECT DETAILS
---------------
Services Needed: ${data.services || 'Not specified'}
Monthly Budget (₹): ${data.monthly_budget || 'Not specified'}
Timeline: ${data.start_timeline || 'Not specified'}

PREFERRED CONTACT DETAILS
-------------------------
Preferred Date & Time: ${data.preferred_date || 'Not specified'}
Preferred Timezone: ${data.preferred_timezone}
Preferred Contact Mode: ${data.preferred_mode || 'Not specified'}

MESSAGE
-------
${data.message || 'No additional message provided'}

============================
Submission Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
============================
`

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background-color: #f44336; color: white; padding: 20px; border-radius: 5px 5px 0 0; }
    .header h2 { margin: 0; font-size: 24px; }
    .section { margin-bottom: 20px; }
    .section-title { background-color: #f5f5f5; padding: 10px; font-weight: bold; border-left: 4px solid #f44336; margin-bottom: 10px; }
    .field { margin-bottom: 10px; display: flex; flex-wrap: wrap; }
    .label { font-weight: bold; width: 200px; min-width: 200px; }
    .value { flex: 1; word-break: break-word; }
    .message-box { background-color: #fafafa; padding: 10px; border-radius: 3px; white-space: pre-wrap; border-left: 4px solid #f44336; }
    .footer { background-color: #f5f5f5; padding: 15px; border-radius: 0 0 5px 5px; text-align: center; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>New Contact Form Submission</h2>
    </div>

    <div style="padding: 20px;">
      <div class="section">
        <div class="section-title">PERSONAL INFORMATION</div>
        <div class="field">
          <div class="label">Name:</div>
          <div class="value">${data.name}</div>
        </div>
        <div class="field">
          <div class="label">Email:</div>
          <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
        </div>
        <div class="field">
          <div class="label">Phone:</div>
          <div class="value">${data.phone || 'Not provided'}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">COMPANY INFORMATION</div>
        <div class="field">
          <div class="label">Company Name:</div>
          <div class="value">${data.company || 'Not provided'}</div>
        </div>
        <div class="field">
          <div class="label">Website:</div>
          <div class="value">${data.website ? `<a href="${data.website}" target="_blank">${data.website}</a>` : 'Not provided'}</div>
        </div>
        <div class="field">
          <div class="label">Business Type:</div>
          <div class="value">${data.business_type || 'Not provided'}</div>
        </div>
        <div class="field">
          <div class="label">Company Turnover (₹):</div>
          <div class="value">${data.company_turnover || 'Not provided'}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">PROJECT DETAILS</div>
        <div class="field">
          <div class="label">Services Needed:</div>
          <div class="value">${data.services || 'Not specified'}</div>
        </div>
        <div class="field">
          <div class="label">Monthly Budget (₹):</div>
          <div class="value">${data.monthly_budget || 'Not specified'}</div>
        </div>
        <div class="field">
          <div class="label">Timeline:</div>
          <div class="value">${data.start_timeline || 'Not specified'}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">PREFERRED CONTACT DETAILS</div>
        <div class="field">
          <div class="label">Date & Time:</div>
          <div class="value">${data.preferred_date || 'Not specified'}</div>
        </div>
        <div class="field">
          <div class="label">Timezone:</div>
          <div class="value">${data.preferred_timezone}</div>
        </div>
        <div class="field">
          <div class="label">Contact Mode:</div>
          <div class="value">${data.preferred_mode || 'Not specified'}</div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">MESSAGE</div>
        <div class="message-box">
${data.message || 'No additional message provided'}
        </div>
      </div>
    </div>

    <div class="footer">
      <p><strong>Submission Time (IST):</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
      <p>This is an automated email from Govira Contact Form</p>
    </div>
  </div>
</body>
</html>
`

  try {
    console.log('📧 Calling Resend API with recipients:', ['support@govira.tech', 'svanapal@gitam.in'])
    const result = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
      to: ['support@govira.tech', 'svanapal@gitam.in'],
      subject: `New Contact Form Submission - ${data.name}`,
      html: htmlContent,
      text: emailContent,
      replyTo: data.email,
    })

    console.log('✅ Email sent successfully:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('❌ Email sending error:', error)
    throw error
  }
}
