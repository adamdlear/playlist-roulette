import { type Player } from "@/types/player";
import Image from "next/image";

import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export const PlayerCard = ({ player }: { player: Player }) => {
  return (
    <Card className="md:w-1/2 sm:w-2/3">
      <CardHeader className="flex flex-row">
        {player.image && (
          <div className="">
            <Image
              src={player.image}
              width={48}
              height={48}
              alt="player profile pic"
              className="rounded-full object-cover"
            />
          </div>
        )}
        <CardTitle>{player.name}</CardTitle>
      </CardHeader>
      <CardContent>{player.isHost && <span>Host</span>}</CardContent>
    </Card>
  );
};
