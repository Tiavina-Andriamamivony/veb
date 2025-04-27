import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Shirt, MapPin, Calendar, User2, Trophy, Users } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
        <div className="text-center">
          <p>Aucun joueur trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Joueurs</h1>
        <Button asChild>
          <Link href="/players/new">Ajouter un joueur</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.isArray(players) && players.map((player) => (
          <Card
            key={player.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={player.user.profileImage || ''} />
                <AvatarFallback>{player.user.firstName[0]}{player.user.lastName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{player.user.firstName} {player.user.lastName}</h3>
                <Badge variant="outline">{player.category}</Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Shirt className="h-4 w-4 text-gray-400"/>
                  <span>#{player.jerseyNumber || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400"/>
                  <span>{player.position || 'N/A'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400"/>
                  <span>{player.teams.length} équipe(s)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-gray-400"/>
                  <span>{player.stats[0]?.points || 0} pts</span>
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white" asChild>
                  <Link href={`/players/${player.id}`}>
                    Voir le profil
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}