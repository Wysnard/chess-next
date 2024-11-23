import { Doc } from "../../convex/_generated/dataModel";
import { dictAllPossibleMovesWithoutCastling } from "./dict-all-possible-moves-without-castling";
import { Board, getPiecePosition, isEnemy, King, Piece } from "./pieces";

export const checkFrom = (game: Doc<"games">, king: King) => {
  const [kingRow, kingColumn] = getPiecePosition(game.board as Board, king);
  const allPossibleMoves = dictAllPossibleMovesWithoutCastling(game);
  const enemyWhoCheckstheKing = Object.entries(allPossibleMoves)
    .filter(
      ([piece, moves]) =>
        isEnemy(king, piece as Piece) &&
        moves.find(
          ([rowIndex, columnIndex]) =>
            rowIndex === kingRow && columnIndex === kingColumn
        )
    )
    .map(([piece]) => piece as Piece);
  return enemyWhoCheckstheKing;
};
