import { Doc } from "../../convex/_generated/dataModel";
import {
  Cell,
  isBlackPiece,
  isEmpty,
  isEnemy,
  isWhitePiece,
  Piece,
} from "./pieces";

export const listPawnPossibleMoves = (
  game: Doc<"games">,
  piece: Piece,
  rowIndex: number,
  columnIndex: number
): [number, number][] => {
  const direction = isWhitePiece(piece) ? 1 : -1;
  const possibleMoves: [number, number][] = [];
  if (isEmpty(game.board[rowIndex + direction][columnIndex] as Cell)) {
    possibleMoves.push([rowIndex + direction, columnIndex]);
  }
  if (isBlackPiece(piece) && rowIndex === 6) {
    possibleMoves.push([rowIndex + 2 * direction, columnIndex]);
  }
  if (isWhitePiece(piece) && rowIndex === 1) {
    possibleMoves.push([rowIndex + 2 * direction, columnIndex]);
  }
  if (
    isEnemy(piece, game.board[rowIndex + direction][columnIndex + 1] as Piece)
  ) {
    possibleMoves.push([rowIndex + direction, columnIndex + 1]);
  }
  if (
    isEnemy(piece, game.board[rowIndex + direction][columnIndex - 1] as Piece)
  ) {
    possibleMoves.push([rowIndex + direction, columnIndex - 1]);
  }
  return possibleMoves;
};
