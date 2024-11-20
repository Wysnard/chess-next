import { Doc } from "../../convex/_generated/dataModel";
import { isCheckedMate } from "./isCheckedMate";
import { Piece } from "./pieces";
import { tryMove } from "./try-move";

export const move = (
  game: Doc<"games">,
  piece: Piece,
  to: [number, number]
): Doc<"games"> => {
  const newGame = { ...tryMove(game, piece, to), turn: game.turn + 1 };

  return {
    ...newGame,
    state: isCheckedMate(newGame, newGame.turn % 2 === 0 ? "k" : "K")
      ? "ended"
      : newGame.state,
  };
};
