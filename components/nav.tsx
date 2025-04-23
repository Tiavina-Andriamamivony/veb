import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { Menu, User, LogOut, Trophy, Calendar, Box, Truck } from "lucide-react"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card"
import { Badge } from "./ui/badge"

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 transition-all hover:opacity-80">
          <Image
            src="/vebSimple.png"
            alt="VEB Logo"
            width={40}
            height={40}
            className="h-10 w-auto rounded-lg"
          />
          <div className="hidden md:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
              Vohitsara École de Basket
            </h1>
            <p className="text-xs text-muted-foreground">Excellence & Passion</p>
          </div>
        </Link>
        
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex md:items-center md:space-x-4">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" className="group">
                  <Trophy className="mr-2 h-4 w-4 group-hover:text-orange-500" />
                  Joueurs
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Gestion des joueurs</h4>
                  <p className="text-sm text-muted-foreground">
                    Statistiques, performances et profils des joueurs
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="ghost" className="group">
                  <Calendar className="mr-2 h-4 w-4 group-hover:text-orange-500" />
                  Entraînements
                  <Badge variant="secondary" className="ml-2">New</Badge>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold">Planning des entraînements</h4>
                  <p className="text-sm text-muted-foreground">
                    Calendrier et suivi des présences
                  </p>
                </div>
              </HoverCardContent>
            </HoverCard>

            <Button variant="ghost" className="group">
              <Box className="mr-2 h-4 w-4 group-hover:text-orange-500" />
              Équipement
            </Button>

            <Button variant="ghost" className="group">
              <Truck className="mr-2 h-4 w-4 group-hover:text-orange-500" />
              Transport
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="rounded-full">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-red-500">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
          
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="outline" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-6">
                <Button variant="ghost" className="justify-start">
                  <Trophy className="mr-2 h-4 w-4" />
                  Joueurs
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Calendar className="mr-2 h-4 w-4" />
                  Entraînements
                  <Badge variant="secondary" className="ml-2">New</Badge>
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Box className="mr-2 h-4 w-4" />
                  Équipement
                </Button>
                <Button variant="ghost" className="justify-start">
                  <Trophy className="mr-2 h-4 w-4" />
                  Transport
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}