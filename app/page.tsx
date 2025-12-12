import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Services } from "@/components/services"
import { Clients } from "@/components/clients"
import { Process } from "@/components/process"
import { Testimonials } from "@/components/testimonials"
import { FAQ } from "@/components/faq"
import { Careers } from "@/components/careers"
import { ContactForm } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <Services />
      <Clients />
      <Process />
      <Testimonials />
      <FAQ />
      <Careers />
      <ContactForm />
      <Footer />
    </main>
  )
}
