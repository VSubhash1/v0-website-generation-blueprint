import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Code, Zap } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
      {/* Full-width video background */}
      <div className="absolute inset-0 -z-10">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          style={{ aspectRatio: '16/13' }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6 lg:space-y-8 animate-slide-in-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 backdrop-blur-sm rounded-full text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            <span>Digital Excellence Awaits</span>
          </div>

          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-balance text-white">
            Empowering your <span className="text-primary">Digital Growth</span> with Expert Solutions
          </h1>

          <p className="text-lg lg:text-xl text-white/90 max-w-xl mx-auto leading-relaxed">
            Govira blends smart marketing with powerful web development to help your brand grow.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="group">
              <Link href="#contact">
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
              <Link href="#clients">View Portfolio</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
