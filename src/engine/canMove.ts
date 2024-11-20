import { Doc } from "../../convex/_generated/dataModel";
import { dictAllPossibleMoves } from "./dict-all-possible-moves";
import { isEnemy, Piece } from "./pieces";

export const canMove = (game: Doc<"games">) => {
  return (
    Object.entries(dictAllPossibleMoves(game)).filter(([piece, moves]) => {
      return (
        isEnemy(piece as Piece, game.turn % 2 === 0 ? "k" : "K") &&
        moves.length > 0
      );
    }).length > 0
  );
};
