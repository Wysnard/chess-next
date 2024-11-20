import { Doc } from "../../convex/_generated/dataModel";
import { dictAllPossibleMovesWithoutCastling } from "./dict-all-possible-moves-without-castling";
import { isChecked } from "./isChecked";
import { isSameTeam, King, Piece } from "./pieces";
import { tryMove } from "./try-move";

export const isCheckedMate = (game: Doc<"games">, kingPiece: King) => {
  const moves = Object.entries(dictAllPossibleMovesWithoutCastling(game))
    .filter(([piece, moves]) => {
      return (
        moves.length > 0 &&
        isSameTeam(piece as Piece, game.turn % 2 === 0 ? "k" : "K")
      );
    })
    .flatMap(([piece, moves]) => {
      return moves
        .map((moves) => tryMove(game, piece as Piece, moves))
        .filter((newGame) => !isChecked(newGame, kingPiece));
    });
  return isChecked(game, kingPiece) && moves.length === 0;
};
