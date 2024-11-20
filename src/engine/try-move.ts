import { Doc } from "../../convex/_generated/dataModel";
import { isCastlingPossible } from "./is-castling-possible";
import { Board, getPiecePosition, Piece, isKing, isWhitePiece } from "./pieces";

export const tryMove = (
  game: Doc<"games">,
  piece: Piece,
  to: [number, number]
): Doc<"games"> => {
  const [toRow, toColumn] = to;
  const [fromRow, fromColumn] = getPiecePosition(game.board as Board, piece);
  const newBoard = game.board.map((row) =>
    row.map((cell) => (cell === piece ? "" : cell))
  );
  newBoard[toRow][toColumn] = piece;
  if (
    isKing(piece) &&
    isCastlingPossible(game, piece) &&
    toRow === (isWhitePiece(piece) ? 0 : 7)
  ) {
    if (toColumn === 1) {
      newBoard[fromRow][2] = isWhitePiece(piece) ? "r1" : "R1";
      newBoard[fromRow][0] = "";
    } else if (toColumn === 5) {
      newBoard[fromRow][4] = isWhitePiece(piece) ? "r2" : "R2";
      newBoard[fromRow][7] = "";
    }
  }

  return {
    ...game,
    board: newBoard,
    history: [...game.history, { piece, from: [fromRow, fromColumn], to }],
  };
};
