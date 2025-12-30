"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, AlertCircle } from "lucide-react"
import { supabase } from "@/lib/supabase"

const businessTypes = ["Startup", "Small Business", "Enterprise", "E-commerce", "Non-profit", "Other"]

const serviceOptions = [
  "SEO",
  "Lead Generation/PPC",
  "Social Media Management",
  "Website Design",
  "E-Commerce",
  "Other",
]

const budgetRanges = ["₹5,00,000 - ₹10,00,000", "₹10,00,000 - ₹25,00,000", "₹25,00,000 - ₹50,00,000", "₹50,00,000 - ₹1,00,00,000", "₹1,00,00,000+"]

const timelines = ["ASAP", "Within 1 month", "1-3 months", "3-6 months", "Just exploring"]

const preferredModes = ["Call", "Email", "Video Meeting", "Chat"]

interface ContactModalProps {
  trigger?: React.ReactNode
}

export function ContactModal({ trigger }: ContactModalProps) {
  const [open, setOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    website: "",
    businessType: "",
    services: "",
    turnover: "",
    monthlyBudget: "",
    timeline: "",
    preferredDate: "",
    preferredTimezone: "Asia/Kolkata",
    preferredMode: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({ 
      ...prev, 
      services: prev.services === service ? "" : service 
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const preferredDateIso = formData.preferredDate ? new Date(formData.preferredDate).toISOString() : null
      const submissionPayload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        company: formData.company,
        website: formData.website,
        business_type: formData.businessType,
        company_turnover: formData.turnover,
        services: formData.services,
        monthly_budget: formData.monthlyBudget,
        start_timeline: formData.timeline,
        preferred_date: preferredDateIso,
        preferred_timezone: formData.preferredTimezone,
        preferred_mode: formData.preferredMode,
        message: formData.message,
      }

      const { error: submitError } = await supabase.from('contact_requests').insert([submissionPayload])

      if (submitError) throw submitError

      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionPayload),
      })

      if (!emailResponse.ok) {
        const emailError = await emailResponse.json()
        console.error('Email sending failed:', emailError)
      }

      setIsSubmitted(true)
      setFormData({
        name: "",
        phone: "",
        email: "",
        company: "",
        website: "",
        businessType: "",
        services: "",
        turnover: "",
        monthlyBudget: "",
        timeline: "",
        preferredDate: "",
        preferredTimezone: "Asia/Kolkata",
        preferredMode: "",
        message: "",
      })
    } catch (err) {
      console.error('Form submission error:', err)
      const message = err instanceof Error ? err.message : 'Failed to submit form. Please try again or contact us directly.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Get in Touch with us</DialogTitle>
          <DialogDescription>
            Ready to start your project? Fill out the form below and we'll get back to you shortly.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Thank You!</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              We've received your message and will get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex gap-2 rounded-lg border border-destructive bg-destructive/10 p-3">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Row 1 - Name, Phone, Email */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-semibold">NAME</Label>
                <Input 
                  id="name" 
                  placeholder="Full Name" 
                  required 
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-xs font-semibold">PHONE</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="91234 56789"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold">EMAIL</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your@email.com" 
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Row 2 - Company & Website */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company" className="text-xs font-semibold">COMPANY</Label>
                <Input 
                  id="company" 
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-xs font-semibold">WEBSITE (OPTIONAL)</Label>
                <Input 
                  id="website" 
                  type="url" 
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Row 3 - Business Type & Turnover */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessType" className="text-xs font-semibold">BUSINESS TYPE</Label>
                <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="please select" />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="turnover" className="text-xs font-semibold">TURNOVER (₹)</Label>
                <Input 
                  id="turnover" 
                  type="text"
                  placeholder="e.g., 50 Lakhs"
                  value={formData.turnover}
                  onChange={(e) => handleInputChange('turnover', e.target.value)}
                  className="text-sm"
                />
              </div>
            </div>

            {/* Row 4 - Services */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">SERVICES</Label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => handleServiceChange(service)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition-all border ${
                      formData.services === service
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background border-border hover:border-primary/50'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 5 - Budget & Timeline */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="monthlyBudget" className="text-xs font-semibold">BUDGET (₹)</Label>
                <Select value={formData.monthlyBudget} onValueChange={(value) => handleInputChange('monthlyBudget', value)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="please select" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((budget) => (
                      <SelectItem key={budget} value={budget}>
                        {budget}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline" className="text-xs font-semibold">TIMELINE</Label>
                <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="please select" />
                  </SelectTrigger>
                  <SelectContent>
                    {timelines.map((timeline) => (
                      <SelectItem key={timeline} value={timeline}>
                        {timeline}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Row 6 - Preferred Details */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="preferredDate" className="text-xs font-semibold">DATE & TIME</Label>
                <Input 
                  id="preferredDate" 
                  type="datetime-local"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone" className="text-xs font-semibold">TIMEZONE</Label>
                <Input 
                  id="timezone" 
                  type="text"
                  placeholder="Asia/Kolkata"
                  value={formData.preferredTimezone}
                  onChange={(e) => handleInputChange('preferredTimezone', e.target.value)}
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mode" className="text-xs font-semibold">MODE</Label>
                <Select value={formData.preferredMode} onValueChange={(value) => handleInputChange('preferredMode', value)}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="please select" />
                  </SelectTrigger>
                  <SelectContent>
                    {preferredModes.map((mode) => (
                      <SelectItem key={mode} value={mode}>
                        {mode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="text-xs font-semibold">MESSAGE</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your project..."
                className="min-h-[80px] text-sm"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Sending...' : 'Submit'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
