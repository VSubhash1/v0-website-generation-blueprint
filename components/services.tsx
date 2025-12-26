"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Palette, ShoppingCart, Search, Users, Share2, Zap, DollarSign, Database, BarChart3 } from "lucide-react"

const services = [
    {
        id: 1,
        name: "Web Design",
        icon: Palette,
        href: "/services/web-design",
    },
    {
        id: 2,
        name: "E-Commerce",
        icon: ShoppingCart,
        href: "/services/e-commerce",
    },
    {
        id: 3,
        name: "SEO",
        icon: Search,
        href: "/services/seo",
    },
    {
        id: 4,
        name: "Lead Management",
        icon: Users,
        href: "/services/lead-management",
    },
    {
        id: 5,
        name: "Social Media Marketing",
        icon: Share2,
        href: "/services/social-media-marketing",
    },
    {
        id: 6,
        name: "Conversion Optimization",
        icon: Zap,
        href: "/services/conversion-optimization",
    },
    {
        id: 7,
        name: "PPC",
        icon: DollarSign,
        href: "/services/ppc",
    },
    {
        id: 8,
        name: "CRM Solutions",
        icon: Database,
        href: "/services/crm-solutions",
    },
    {
        id: 9,
        name: "Data Analytics",
        icon: BarChart3,
        href: "/services/data-analytics",
    },
]

export function Services() {
    const [activeService, setActiveService] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleScroll = () => {
            if (!scrollContainerRef.current) return

            const container = scrollContainerRef.current
            const scrollPosition = container.scrollTop
            const itemHeight = container.scrollHeight / services.length
            const newActiveIndex = Math.min(
                Math.floor(scrollPosition / itemHeight + 0.5),
                services.length - 1
            )

            setActiveService(newActiveIndex)
        }

        const container = scrollContainerRef.current
        if (container) {
            container.addEventListener('scroll', handleScroll)
            return () => container.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Honeycomb grid positions - staggered layout
    const getGridPosition = (index: number) => {
        const positions = [
            { row: 1, col: 2 }, // Web Design - center top
            { row: 1, col: 3 }, // E-Commerce - right top
            { row: 2, col: 1 }, // SEO - left middle
            { row: 2, col: 2 }, // Lead Management - center middle
            { row: 2, col: 3 }, // Social Media - right middle
            { row: 3, col: 1 }, // Conversion - left bottom
            { row: 3, col: 2 }, // PPC - center bottom
            { row: 3, col: 3 }, // CRM - right bottom
            { row: 1, col: 1 }, // Data Analytics - left top
        ]
        return positions[index]
    }

    return (
        <section id="services" className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="text-center mb-12 lg:mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">Our Services</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        From strategy to execution, we offer a full range of digital marketing and web development services.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left Side - Scrollable Single Service Display */}
                    <div
                        ref={scrollContainerRef}
                        className="h-[600px] overflow-y-scroll snap-y snap-mandatory scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
                    >
                        {services.map((service, index) => (
                            <div
                                key={service.id}
                                className="h-[600px] snap-start flex items-center justify-center"
                            >
                                <div className="w-full text-center">
                                    <div className="flex flex-col items-center gap-6">
                                        <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                                            <service.icon className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-4xl font-bold text-primary">
                                            {service.name}
                                        </h3>
                                    </div>

                                    {/* Progress Indicator */}
                                    <div className="flex justify-center gap-1 mt-8">
                                        {services.map((_, dotIndex) => (
                                            <div
                                                key={dotIndex}
                                                className={`h-1.5 rounded-full transition-all ${dotIndex === index
                                                        ? 'w-8 bg-primary'
                                                        : 'w-1.5 bg-primary/20'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Side - Honeycomb Grid */}
                    <div className="relative h-[600px] hidden lg:block">
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4 p-8">
                            {services.map((service, index) => {
                                const pos = getGridPosition(index)
                                const isActive = activeService === index

                                return (
                                    <Link
                                        key={service.id}
                                        href={service.href}
                                        className={`relative transition-all duration-500 ${isActive
                                                ? 'z-20 scale-110 shadow-2xl'
                                                : 'z-10 scale-90 opacity-60 hover:opacity-80'
                                            }`}
                                        style={{
                                            gridRow: pos.row,
                                            gridColumn: pos.col,
                                        }}
                                    >
                                        <div className={`h-full rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all ${isActive
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-card border border-border hover:border-primary/50'
                                            }`}>
                                            <service.icon className={`w-10 h-10 mb-3 ${isActive ? 'text-primary-foreground' : 'text-primary'}`} />
                                            <h4 className={`font-semibold text-sm ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>
                                                {service.name}
                                            </h4>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
