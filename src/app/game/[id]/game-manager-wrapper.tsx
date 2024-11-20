import { preloadQuery } from "convex/nextjs";
import GameManager from "./game-manager";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export default async function GameManagerWrapper({ id }: { id: string }) {
  const preloadedGame = await preloadQuery(api.games.get, {
    gameId: id as Id<"games">,
  });

  return <GameManager preloadedGame={preloadedGame} />;
}
