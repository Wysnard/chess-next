"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { GameCard } from "./game-card";

export type GamesListProps = {
  preloadedGames: Preloaded<typeof api.games.list>;
};

export default function GamesList({ preloadedGames }: GamesListProps) {
  const games = usePreloadedQuery(preloadedGames);

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-5">
      {games.map((game) => (
        <GameCard key={game._id} game={game} />
      ))}
    </div>
  );
}
