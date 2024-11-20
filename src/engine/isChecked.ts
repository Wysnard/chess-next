import { Doc } from "../../convex/_generated/dataModel";
import { dictAllPossibleMovesWithoutCastling } from "./dict-all-possible-moves-without-castling";
import { Board, getPiecePosition, isEnemy, King, Piece } from "./pieces";

export const isChecked = (game: Doc<"games">, kingPiece: King) => {
  const board = game.board as Board;
  const [kingRow, kingColumn] = getPiecePosition(board, kingPiece);
  const allPossibleMoves = dictAllPossibleMovesWithoutCastling(game);
  const enemyMoves = Object.entries(allPossibleMoves)
    .filter(([piece]) => isEnemy(kingPiece, piece as Piece))
    .flatMap(([piece, positions]) => positions);
  return enemyMoves.some(([rowIndex, columnIndex]) => {
    return rowIndex === kingRow && columnIndex === kingColumn;
  });
};
