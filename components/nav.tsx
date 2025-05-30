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
      <nav className="container mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 transition-all hover:opacity-80">
          <Image
            src="/vebSimple.png"
            alt="VEB Logo"
            width={40}
            height={40}
            className="h-10 w-auto rounded-lg"
          />
          <div className="hidden md:block">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
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
                  <Link href="/players" className="m-auto p-auto flex">
                    <Trophy className="mr-2 h-4 w-4 group-hover:text-blue-500" />
                    Joueurs
                  </Link>
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
                  <Link href="/trainings" className="m-auto p-auto flex">
                    <Calendar className="mr-2 h-4 w-4 group-hover:text-blue-500" />
                    Entraînements
                    <Badge variant="secondary" className="ml-2 bg-blue-500/10 text-blue-600">New</Badge>
                  </Link>
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
              <Link href="/equipment" className="m-auto p-auto flex">
                <Box className="mr-2 h-4 w-4 group-hover:text-blue-500" />
                Équipement
              </Link>
            </Button>

            <Button variant="ghost" className="group">
              <Link href="/transport" className="m-auto p-auto flex">
                <Truck className="mr-2 h-4 w-4 group-hover:text-blue-500" />
                Transport
              </Link>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-500/10 hover:text-blue-500">
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-red-500 hover:bg-red-500/10">
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
                <Button variant="ghost" className="justify-start hover:text-blue-500">
                  <Trophy className="mr-2 h-4 w-4" />
                  Joueurs
                </Button>
                <Button variant="ghost" className="justify-start hover:text-blue-500">
                  <Calendar className="mr-2 h-4 w-4" />
                  Entraînements
                  <Badge variant="secondary" className="ml-2 bg-blue-500/10 text-blue-600">New</Badge>
                </Button>
                <Button variant="ghost" className="justify-start hover:text-blue-500">
                  <Box className="mr-2 h-4 w-4" />
                  Équipement
                </Button>
                <Button variant="ghost" className="justify-start hover:text-blue-500">
                  <Truck className="mr-2 h-4 w-4" />
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