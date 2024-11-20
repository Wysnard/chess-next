import { Doc } from "../../convex/_generated/dataModel";
import { hasMoved } from "./hasMoved";
import { isChecked } from "./isChecked";
import {
  Board,
  getPiecePosition,
  isPieceStillThere,
  isWhitePiece,
  King,
} from "./pieces";

export const isKingSideCastlingPossible = (game: Doc<"games">, king: King) => {
  const rook = isWhitePiece(king) ? "r1" : "R1";
  if (hasMoved(game, king)) return false;
  if (hasMoved(game, rook)) return false;
  if (!isPieceStillThere(game.board as Board, rook)) return false;
  if (isChecked(game, king)) return false;

  const [kingRow, kingColumn] = getPiecePosition(game.board as Board, king);
  const [rookRow, rookColumn] = getPiecePosition(game.board as Board, rook);

  if (kingRow !== rookRow) return false;
  if (rookColumn !== 0) return false;
  if (kingColumn !== 3) return false;

  const pathBetween = game.board[kingRow].slice(rookColumn + 1, kingColumn);
  const isPathClear = pathBetween.every((cell) => cell === "");
  if (!isPathClear) return false;

  return true;
};
