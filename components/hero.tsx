import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Code, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 animate-slide-in-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Digital Excellence Awaits</span>
            </div>

            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-balance text-foreground">
              Empowering your <span className="text-primary">Digital Growth</span> with Expert Solutions
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
              PixelPerfect blends smart marketing with powerful web development to help your brand grow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="group">
                <Link href="#contact">
                  Get Started
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#clients">View Portfolio</Link>
              </Button>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative animate-slide-in-right animation-delay-200">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Abstract tech graphic */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl" />
              <div className="absolute inset-4 bg-card rounded-2xl shadow-2xl border border-border overflow-hidden">
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-destructive" />
                    <div className="w-3 h-3 rounded-full bg-chart-4" />
                    <div className="w-3 h-3 rounded-full bg-accent" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                    <div className="h-4 bg-primary/30 rounded w-5/6" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 bg-primary/10 rounded-xl flex items-center gap-3">
                      <Code className="w-8 h-8 text-primary" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Development</div>
                        <div className="text-xs text-muted-foreground">Web & Mobile</div>
                      </div>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-xl flex items-center gap-3">
                      <Zap className="w-8 h-8 text-accent" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Marketing</div>
                        <div className="text-xs text-muted-foreground">SEO & Ads</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div
                className="absolute -top-4 -right-4 w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <Sparkles className="w-10 h-10 text-primary-foreground" />
              </div>
              <div
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent rounded-xl flex items-center justify-center shadow-lg"
                style={{ animation: "bounce 4s infinite" }}
              >
                <Code className="w-8 h-8 text-accent-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
