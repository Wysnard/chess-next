import { preloadQuery } from "convex/nextjs";
import GamesList from "./list";
import { api } from "../../../convex/_generated/api";
import { getAuthToken } from "../auth";

export default async function GamesPage() {
  const token = await getAuthToken();
  const preloadedGames = await preloadQuery(api.games.list, {}, { token });

  return <GamesList preloadedGames={preloadedGames} />;
}
