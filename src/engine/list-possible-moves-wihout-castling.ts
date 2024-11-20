import {
  Bishop,
  bishops,
  Board,
  King,
  kings,
  Pawn,
  pawns,
  Piece,
  Queen,
  queens,
  Rook,
  rooks,
} from "./pieces";
import { Knight, knights } from "./pieces";
import { listKnightPossibleMoves } from "./list-knight-possible-moves";
import { listBishopPossibleMoves } from "./list-bishop-possible-moves";
import { listRookPossibleMoves } from "./list-rook-possible-moves";
import { listPawnPossibleMoves } from "./list-pawn-possible-moves";
import { Doc } from "../../convex/_generated/dataModel";
import { listKingPossibleMoves } from "./list-king-possible-moves";

export const listPossibleMovesWithoutCastling = (
  game: Doc<"games">,
  piece: Piece,
  rowIndex: number,
  columnIndex: number
): [number, number][] => {
  if (pawns.includes(piece as Pawn)) {
    return listPawnPossibleMoves(game, piece, rowIndex, columnIndex);
  }
  if (knights.includes(piece as Knight)) {
    return listKnightPossibleMoves(game.board as Board, piece);
  }
  if (bishops.includes(piece as Bishop)) {
    return listBishopPossibleMoves(
      game.board as Board,
      piece,
      rowIndex,
      columnIndex
    );
  }
  if (rooks.includes(piece as Rook)) {
    return listRookPossibleMoves(game.board as Board, piece);
  }
  if (queens.includes(piece as Queen)) {
    return [
      ...listBishopPossibleMoves(
        game.board as Board,
        piece,
        rowIndex,
        columnIndex
      ),
      ...listRookPossibleMoves(game.board as Board, piece),
    ];
  }
  if (kings.includes(piece as King)) {
    return listKingPossibleMoves(game, piece);
  }
  return [];
};
