# EMAIL SETUP INSTRUCTIONS FOR GOVIRA CONTACT FORM

## Quick Start

Your contact form is now configured to send email notifications to:
- support@govira.tech
- svanapal@gitam.in

### Step 1: Choose an Email Service

**RECOMMENDED: Resend (Easiest - Free tier available)**
1. Sign up at https://resend.com
2. Create a free account
3. Get your API key from https://resend.com/api-keys
4. Add to your `.env.local` file:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   EMAIL_FROM=noreply@govira.tech
   ```

**ALTERNATIVE: Gmail**
1. Go to https://myaccount.google.com/apppasswords
2. Create an app-specific password
3. Add to your `.env.local` file:
   ```
   EMAIL_SERVICE=gmail
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

**ALTERNATIVE: SendGrid**
1. Get API key from https://app.sendgrid.com/settings/api_keys
2. Add to your `.env.local` file:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   ```

**ALTERNATIVE: Other SMTP Services**
Modify `lib/email.ts` to use your preferred service

### Step 2: Add Environment Variables

1. Create or edit `.env.local` in the root directory
2. Add your chosen email service credentials
3. Save the file

### Step 3: Test

1. Run `npm run dev`
2. Fill out a contact form
3. Check your email at support@govira.tech and svanapal@gitam.in

## Email Format

Submitted forms will arrive with:
- **Subject**: New Contact Form Submission - [Customer Name]
- **Format**: Nicely formatted HTML email with all form data
- **Sections**: 
  - Personal Information (Name, Email, Phone)
  - Company Information (Company Name, Website, Business Type, Turnover)
  - Project Details (Services, Budget, Timeline)
  - Preferred Contact Details (Date/Time, Timezone, Contact Mode)
  - Message

## Features

✅ Both contact page and modal send emails
✅ Data also saved to Supabase database
✅ Nicely formatted email with all information organized
✅ Supports multiple email recipients
✅ Timestamp included with India timezone (Asia/Kolkata)
✅ Works with multiple email service providers

## Troubleshooting

**Emails not sending?**
- Check that RESEND_API_KEY or EMAIL credentials are correct
- Verify the API key is active in your email service dashboard
- Check browser console for error messages
- Form data will still be saved to Supabase even if email fails

**Want to change email recipients?**
- Edit `lib/email.ts` line 47 - modify the `to` array
- Current recipients: support@govira.tech, svanapal@gitam.in

## File Structure

- `lib/email.ts` - Email formatting and sending logic
- `app/api/send-email/route.ts` - API endpoint for email sending
- `components/contact-form.tsx` - Contact page form with email integration
- `components/contact-modal.tsx` - Modal popup form with email integration
