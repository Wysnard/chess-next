import { preloadQuery, preloadedQueryResult } from "convex/nextjs";
import GamesList from "../game-list";
import { api } from "../../../../convex/_generated/api";
import { getAuthToken } from "../../auth";

export default async function GamesPage() {
  const token = await getAuthToken();
  const preloadedGames = await preloadQuery(
    api.games.listJoinableGames,
    {},
    { token }
  );

  return <GamesList preloadedGames={preloadedGames} />;
}
