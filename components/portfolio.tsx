"use client"

import { useState } from "react"
import Link from "next/link"

const projects = [
  {
    id: 1,
    category: "E-Commerce Platform",
    title: "Veerance",
    description: "Modern online store with seamless checkout and clothes catalog",
    image: "/veerance.png",
    href: "/portfolio/veerance",
  },
  {
    id: 2,
    category: "Website",
    title: "Anchor Space",
    description: "Complete booking platform with functional website for co-working space",
    image: "/anchor-space.png",
    href: "/portfolio/anchor-space",
  },
  {
    id: 3,
    category: "Mobile App",
    title: "Raksha Safety App",
    description: "iOS and Android app for personal safety with real-time location tracking",
    image: "/raksha-safety-app.jpg",
    href: "/portfolio/raksha-safety-app",
  },
  {
    id: 4,
    category: "Website",
    title: "Aditi Infrastructures",
    description: "Aditi Infrastructures is a leading real estate developer specializing in residential and commercial properties",
    image: "/aditi-infrastructures.jpg",
    href: "/portfolio/aditi-infrastructures",
  },
  {
    id: 5,
    category: "Website",
    title: "ARK Industries",
    description: "Manufacturing company website with fastening products and solutions",
    image: "/ark-industries.png",
    href: "/portfolio/ark-industries",
  },
  {
    id: 6,
    category: "Mobile App",
    title: "Habit Tracker App",
    description: "Comprehensive health and fitness tracking app for iOS and Android",
    image: "/habit-tracker.png",
    href: "/portfolio/habit-tracker-app",
  },
]

export function Portfolio() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section id="portfolio" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">Our Portfolio</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Showcasing our best work across websites, apps, branding, and digital campaigns
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={project.href}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl block"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="relative w-full h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="text-xs lg:text-sm text-blue-400 mb-2 font-medium">{project.category}</p>
                <div className="relative overflow-hidden mb-2 w-full">
                  <div
                    className={`flex whitespace-nowrap ${hoveredIndex === index ? 'animate-scroll-text' : ''
                      }`}
                  >
                    <h3 className="text-xl lg:text-2xl font-bold inline-block pr-8">
                      {project.title}
                    </h3>
                    <h3 className="text-xl lg:text-2xl font-bold inline-block pr-8">
                      {project.title}
                    </h3>
                    <h3 className="text-xl lg:text-2xl font-bold inline-block pr-8">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <p
                  className={`text-sm text-gray-300 transition-all duration-300 ${hoveredIndex === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                    }`}
                >
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}