import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shirt, MapPin, Trophy, Users, Search, Filter } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";

async function getPlayers() {
  const res = await fetch('http://localhost:3000/api/players', {
    cache: 'no-store'
  });
  
  if (!res.ok) {
    throw new Error('Échec du chargement des joueurs');
  }
  
  return res.json();
}

export default async function PlayersPage() {
  const players = await getPlayers();

  if (!players) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <div className="p-8 rounded-lg bg-muted/50 text-center">
            <Trophy className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-xl font-semibold text-muted-foreground">Aucun joueur trouvé</p>
            <p className="text-sm text-muted-foreground mt-2">Commencez par ajouter des joueurs à votre équipe</p>
            <Button className="mt-4" asChild>
              <Link href="/players/new">Ajouter un joueur</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>Joueurs</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Joueurs
          </h1>
          <p className="text-muted-foreground mt-1">Gérez vos joueurs et leurs performances</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700" asChild>
          <Link href="/players/new">
            <Users className="mr-2 h-4 w-4" />
            Ajouter un joueur
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un joueur..." className="pl-10" />
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="U12">U12</SelectItem>
            <SelectItem value="U14">U14</SelectItem>
            <SelectItem value="U16">U16</SelectItem>
            <SelectItem value="U18">U18</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.isArray(players) && players.map((player) => (
          <Card
            key={player.id}
            className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-background to-muted/50"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-14 w-14 ring-2 ring-blue-500/20">
                <AvatarImage src={player.user.profileImage || ''} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  {player.user.firstName[0]}{player.user.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{player.user.firstName} {player.user.lastName}</h3>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
                  {player.category}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-md bg-blue-500/10">
                    <Shirt className="h-4 w-4 text-blue-500"/>
                  </div>
                  <span>#{player.jerseyNumber || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-md bg-green-500/10">
                    <MapPin className="h-4 w-4 text-green-500"/>
                  </div>
                  <span>{player.position || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-md bg-purple-500/10">
                    <Users className="h-4 w-4 text-purple-500"/>
                  </div>
                  <span>{player.teams.length} équipe(s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-md bg-amber-500/10">
                    <Trophy className="h-4 w-4 text-amber-500"/>
                  </div>
                  <span>{player.stats[0]?.points || 0} pts</span>
                </div>
              </div>

              <Button 
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white" 
                asChild
              >
                <Link href={`/players/${player.id}`}>
                  Voir le profil
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}