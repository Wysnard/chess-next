import { redirect } from "next/navigation";
import { getAuthToken } from "../auth";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";

export default async function GamePage() {
  const token = await getAuthToken();
  const gameId = await fetchMutation(api.games.create, {}, { token: token! });
  await fetchMutation(api.games.join, { gameId }, { token: token! });

  redirect(`/game/${gameId}`);

  return null;
}
