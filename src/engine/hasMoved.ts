import { Doc } from "../../convex/_generated/dataModel";
import { Piece } from "./pieces";

export const hasMoved = (game: Doc<"games">, piece: Piece) => {
  return game.history.some((move) => move.piece === piece);
};
