import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
]

const services = [
  { label: "Web Design", href: "/services/web-design" },
  { label: "E-Commerce", href: "/services/e-commerce" },
  { label: "SEO", href: "/services/seo" },
  { label: "Lead Management", href: "/services/lead-management" },
  { label: "Social Media Marketing", href: "/services/social-media-marketing" },
  { label: "Conversion & Optimization", href: "/services/conversion-optimization" },
  { label: "PPC (Pay Per Click)", href: "/services/ppc" },
  { label: "CRM Solutions", href: "/services/crm-solutions" },
  { label: "Data Analytics", href: "/services/data-analytics" },
]

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
]

export function Footer() {
  return (
    <footer className="bg-background text-foreground py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <img src="https://image2url.com/images/1765796822907-5d6e2d7e-9bfa-4ba7-ab5a-254ac83fb419.png" alt="Govira Logo" className="w-8 h-8" />
              <span className="font-semibold text-xl text-foreground">Govira</span>
            </Link>
            <p className="text-muted-foreground leading-relaxed">
              Empowering businesses with innovative digital solutions that drive growth and success.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <Link href={service.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-foreground">Contact Us</h4>
            <ul className="space-y-3 text-muted-foreground">
              <li>123 Digital Street</li>
              <li>Tech City, TC 12345</li>
              <li>hello@govira.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-foreground text-sm">© {new Date().getFullYear()} Govira. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
