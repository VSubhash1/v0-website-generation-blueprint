"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Send, CheckCircle, AlertCircle } from "lucide-react"
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

export function ContactForm() {
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
        console.error('Email sending failed, but form was saved to database')
      }

      setIsSubmitted(true)
    } catch (err) {
      console.error('Form submission error:', err)
      const message = err instanceof Error ? err.message : 'Failed to submit form. Please try again or contact us directly.'
      setError(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="max-w-2xl mx-auto bg-card border-border">
            <CardContent className="p-8 lg:p-12 text-center">
              <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-foreground">Thank You!</h3>
              <p className="text-muted-foreground">
                We've received your message and will get back to you within 24 hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">Get in Touch with us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Ready to start your project? Fill out the form below and we'll get back to you shortly.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto bg-card border-border">
          <CardContent className="p-6 lg:p-10">
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1 - Name, Phone, Email */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">YOUR NAME</Label>
                  <Input 
                    id="name" 
                    placeholder="Full Name" 
                    required 
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">PHONE NUMBER</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="91234 56789"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">EMAIL</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com" 
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
              </div>

              {/* Row 2 - Company & Website */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">COMPANY NAME</Label>
                  <Input 
                    id="company" 
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">WEBSITE LINK (OPTIONAL)</Label>
                  <Input 
                    id="website" 
                    type="url" 
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>
              </div>

              {/* Row 3 - Business Type & Turnover */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessType">BUSINESS TYPE</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange('businessType', value)}>
                    <SelectTrigger>
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
                  <Label htmlFor="turnover">COMPANY TURNOVER (₹)</Label>
                  <Input 
                    id="turnover" 
                    type="text"
                    placeholder="e.g., 50 Lakhs"
                    value={formData.turnover}
                    onChange={(e) => handleInputChange('turnover', e.target.value)}
                  />
                </div>
              </div>

              {/* Row 4 - Services (Radio buttons) */}
              <div className="space-y-3">
                <Label>WHAT SERVICES ARE YOU LOOKING FOR?</Label>
                <div className="flex flex-wrap gap-3">
                  {serviceOptions.map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => handleServiceChange(service)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
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

              {/* Row 5 - Monthly Budget & Timeline */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyBudget">MONTHLY BUDGET (₹)</Label>
                  <Select value={formData.monthlyBudget} onValueChange={(value) => handleInputChange('monthlyBudget', value)}>
                    <SelectTrigger>
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
                  <Label htmlFor="timeline">HOW SOON WOULD YOU LIKE TO GET STARTED?</Label>
                  <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                    <SelectTrigger>
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

              {/* Row 6 - Preferred Date, Timezone & Mode */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">PREFERRED DATE & TIME</Label>
                  <Input 
                    id="preferredDate" 
                    type="datetime-local"
                    value={formData.preferredDate}
                    onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">PREFERRED TIMEZONE</Label>
                  <Input 
                    id="timezone" 
                    type="text"
                    placeholder="Asia/Kolkata"
                    value={formData.preferredTimezone}
                    onChange={(e) => handleInputChange('preferredTimezone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mode">PREFERRED MODE</Label>
                  <Select value={formData.preferredMode} onValueChange={(value) => handleInputChange('preferredMode', value)}>
                    <SelectTrigger>
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
                <Label htmlFor="message">MESSAGE</Label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                  className="min-h-[150px]"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Sending...' : 'Submit'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
