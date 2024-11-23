import { Doc } from "../../convex/_generated/dataModel";
import { isKingSideCastlingPossible } from "./is-king-side-castling-possible";
import { isQueenSideCastlingPossible } from "./is-queen-side-castling-possible";
import { Board, getPiecePosition, King } from "./pieces";

export const listKingCastling = (game: Doc<"games">, king: King) => {
  const [rowIndex, columnIndex] = getPiecePosition(game.board as Board, king);
  const castlingMoves: [number, number][] = [];

  if (isKingSideCastlingPossible(game, king)) {
    castlingMoves.push([rowIndex, columnIndex - 2]);
  }
  if (isQueenSideCastlingPossible(game, king)) {
    castlingMoves.push([rowIndex, columnIndex + 2]);
  }

  return castlingMoves;
};
