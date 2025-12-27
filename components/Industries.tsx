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
    import Link from "next/link";
  },
    import { Button } from "@/components/ui/button";
  {
    icon: GraduationCap,
    title: "Schools",
    description:
      "Educational platforms and learning management solutions",
    href: "/industries/schools",
  },
        href: "/industries/hotels",
  {
    icon: HeartPulse,
    title: "Hospitals",
    description:
      "Healthcare technology and patient management systems",
    href: "/industries/hospitals",
        href: "/industries/restaurants",
  },
  {
    icon: ShoppingBag,
    title: "E-Commerce",
    description:
      "Complete online retail solutions and marketplace platforms",
        href: "/industries/schools",
    href: "/industries/e-commerce",
  },
  {
    icon: Briefcase,
    title: "Corporate",
    description:
        href: "/industries/hospitals",
      "Enterprise software and business management solutions",
    href: "/industries/corporate",
  },
];

export function Industries() {
        href: "/industries/e-commerce",
  return (
    <section id="industries" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
        href: "/industries/corporate",
            Industries We Serve
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
    export function Industries() {
            solutions for your industry
        <section id="industries" className="py-16 lg:py-24 bg-background relative">
          {/* subtle decorative gradient */}
          <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
            <div className="absolute right-[-10%] top-[-10%] size-[320px] rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute left-[-10%] bottom-[-10%] size-[280px] rounded-full bg-accent/10 blur-3xl" />
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {industries.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="block transition-transform hover:scale-105"
            >
              <Card
                className="border border-border bg-card shadow-sm h-full cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6 lg:p-8">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>

      </div>

                <Link key={index} href={item.href} className="group">
                  <Card className="relative overflow-hidden border border-border bg-card/90 shadow-sm transition-all group-hover:shadow-lg group-hover:border-primary/30">
                    {/* gradient overlay on hover */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(ellipse_at_top_right,theme(colors.primary/10),transparent_60%)]" />
                    <CardContent className="p-6 lg:p-8">
                      <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mb-6 border border-primary/20">
                        <item.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      <Button variant="outline" size="sm" className="mt-4 group-hover:bg-primary group-hover:text-primary-foreground">
                        Explore
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
