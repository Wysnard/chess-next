import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import GameManagerWrapper from "./game-manager-wrapper";
import GameDialogue from "./game.dialogue";
import { getAuthToken } from "../../auth";

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let game = await fetchQuery(api.games.get, { gameId: id as Id<"games"> });
  const token = await getAuthToken();
  const currentUser = await fetchQuery(api.users.current, {}, { token });
  if (game.state === "waiting" && !game.players.includes(currentUser!._id)) {
    await fetchMutation(
      api.games.join,
      {
        gameId: id as Id<"games">,
      },
      { token }
    );
    game = await fetchQuery(api.games.get, { gameId: id as Id<"games"> });
  }

  return (
    <>
      <GameDialogue defaultOpen={game.state === "waiting"} game={game} />
      <GameManagerWrapper id={id} />
    </>
  );
}
