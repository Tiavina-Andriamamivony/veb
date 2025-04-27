import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Calendar, Box, Truck, TrendingUp, Users, Activity } from "lucide-react"

export default function Home() {
  const getColorClass = (color: string) => {
  const classes = {
    orange: "bg-orange-500/10 text-orange-500",
    blue: "bg-blue-500/10 text-blue-500",
    green: "bg-green-500/10 text-green-500",
    purple: "bg-purple-500/10 text-purple-500"
  }
  return classes[color as keyof typeof classes]
}
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted/20">
      
      <main className="flex-1 px-4">
        <div className="container mx-auto max-w-7xl py-12 space-y-12">
          <div className="flex flex-col items-center justify-center space-y-6 text-center">
            <div className="relative">
              <Image
                src="/vebWithoutBg.png"
                alt="VEB Logo"
                width={200}
                height={200}
                className="h-auto w-auto animate-float"
                priority
              />
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-3xl -z-10" />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Vohitsara École de Basket
              </h1>
              <p className="text-muted-foreground max-w-[600px] mx-auto md:text-lg">
                Excellence, passion et performance au cœur de notre école de basket
              </p>
            </div>
          </div>

          <div className="grid gap-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
            {/* Cards remain the same */}
          </div>
        </div>
      </main>
    </div>
  )
}
