"use client";

import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useRouter } from "next/navigation";

export default function CreateGameButton() {
  const createGame = useMutation(api.games.create);
  const router = useRouter();

  return (
    <Button
      onClick={async () => {
        const gameId = await createGame();
        router.push(`/game/${gameId}`);
      }}
    >
      Create Game
    </Button>
  );
}
