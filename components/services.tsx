import { Palette, ShoppingCart, Search, Target, Share2, MousePointerClick } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const services = [
  {
    icon: Palette,
    title: "Web Design",
    description: "Beautiful, responsive websites that captivate your audience and drive conversions.",
  },
  {
    icon: ShoppingCart,
    title: "E-Commerce",
    description: "Powerful online stores with seamless checkout experiences that boost sales.",
  },
  {
    icon: Search,
    title: "SEO",
    description: "Data-driven optimization strategies to improve your search rankings and visibility.",
  },
  {
    icon: Target,
    title: "Lead Generation",
    description: "Targeted campaigns that attract qualified leads and grow your customer base.",
  },
  {
    icon: Share2,
    title: "Social Media",
    description: "Engaging social strategies that build your brand and connect with your audience.",
  },
  {
    icon: MousePointerClick,
    title: "PPC Advertising",
    description: "High-ROI paid campaigns that deliver measurable results and maximize your budget.",
  },
]

export function Services() {
  return (
    <section id="services" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Comprehensive digital solutions tailored to elevate your brand and accelerate growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-border bg-card"
            >
              <CardContent className="p-6 lg:p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
