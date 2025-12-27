"use client";

import { useEffect, useRef, useState } from "react";
import {
  Building2,
  UtensilsCrossed,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const industries = [
  {
    icon: Building2,
    title: "Hotels",
    description:
      "Digital solutions for hospitality management and guest experiences",
    href: "/industries/hotels",
  },
  {
    icon: UtensilsCrossed,
    title: "Restaurants",
    description:
      "Online ordering, reservations, and restaurant management systems",
    href: "/industries/restaurants",
  },
  {
    icon: GraduationCap,
    title: "Schools",
    description:
      "Educational platforms and learning management solutions",
    href: "/industries/schools",
  },
  {
    icon: HeartPulse,
    title: "Hospitals",
    description:
      "Healthcare technology and patient management systems",
    href: "/industries/hospitals",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce",
    description:
      "Complete online retail solutions and marketplace platforms",
    href: "/industries/e-commerce",
  },
  {
    icon: Briefcase,
    title: "Corporate",
    description:
      "Enterprise software and business management solutions",
    href: "/industries/corporate",
  },
];

export function Industries() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="industries" ref={sectionRef} className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
            Industries We Serve
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Specialized expertise across diverse sectors, delivering tailored
            solutions for your industry
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((item, index) => {
            const delayClass =
              index === 0
                ? "animation-delay-100"
                : index === 1
                ? "animation-delay-200"
                : index === 2
                ? "animation-delay-300"
                : index === 3
                ? "animation-delay-400"
                : "animation-delay-500";

            return (
              <Link
                key={index}
                href={item.href}
                className="group block"
              >
                <Card
                  className={`relative overflow-hidden border border-border/60 bg-card shadow-sm h-full cursor-pointer rounded-xl
                  transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]
                  ${visible ? `animate-fade-in-up ${delayClass}` : "opacity-0"}`}
                >
                  {/* Soft gradient overlay for glassmorphism */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                  <CardContent className="relative p-6 lg:p-8">
                    <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-primary/25">
                      <item.icon className="w-7 h-7 text-primary transition-transform duration-300 group-hover:rotate-3 group-hover:scale-110" />
                    </div>

                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {item.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
