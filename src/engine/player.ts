import { Doc } from "../../convex/_generated/dataModel";

export const isWhitePlayer = (game: Doc<"games">, currentUserId: string) => {
  return game.players[0] === currentUserId;
};

export const isBlackPlayer = (game: Doc<"games">, currentUserId: string) => {
  return game.players[1] === currentUserId;
};
