import { Doc } from "../../convex/_generated/dataModel";
import { isKingSideCastlingPossible } from "./is-king-side-castling-possible";
import { isQueenSideCastlingPossible } from "./is-queen-side-castling-possible";
import {
  isPossibleToMove,
  Piece,
  getPiecePosition,
  Board,
  King,
} from "./pieces";

export const listKingPossibleMoves = (
  game: Doc<"games">,
  piece: Piece
): [number, number][] => {
  const [rowIndex, columnIndex] = getPiecePosition(game.board as Board, piece);
  const possibleMoves: [number, number][] = [];

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;
      if (rowIndex + i < 0 || rowIndex + i > 7) continue;
      if (columnIndex + j < 0 || columnIndex + j > 7) continue;
      if (
        !isPossibleToMove(
          piece,
          game.board[rowIndex + i][columnIndex + j] as Piece
        )
      )
        continue;
      possibleMoves.push([rowIndex + i, columnIndex + j]);
    }
  }

  return possibleMoves;
};
