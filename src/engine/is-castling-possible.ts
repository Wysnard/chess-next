import { Doc } from "../../convex/_generated/dataModel";
import { King } from "./pieces";
import { isKingSideCastlingPossible } from "./is-king-side-castling-possible";
import { isQueenSideCastlingPossible } from "./is-queen-side-castling-possible";

export const isCastlingPossible = (game: Doc<"games">, king: King) => {
  return (
    isKingSideCastlingPossible(game, king) ||
    isQueenSideCastlingPossible(game, king)
  );
};
