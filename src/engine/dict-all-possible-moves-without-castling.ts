import { Doc } from "../../convex/_generated/dataModel";
import { listPossibleMovesWithoutCastling } from "./list-possible-moves-wihout-castling";
import { Cell, isPiece, Piece } from "./pieces";

export const emptyDictMoves: Record<Piece, [number, number][]> = {
  R1: [],
  R2: [],
  N1: [],
  N2: [],
  B1: [],
  B2: [],
  Q: [],
  K: [],
  P1: [],
  P2: [],
  P3: [],
  P4: [],
  P5: [],
  P6: [],
  P7: [],
  P8: [],
  r1: [],
  r2: [],
  n1: [],
  n2: [],
  b1: [],
  b2: [],
  q: [],
  k: [],
  p1: [],
  p2: [],
  p3: [],
  p4: [],
  p5: [],
  p6: [],
  p7: [],
  p8: [],
};

export const dictAllPossibleMovesWithoutCastling = (
  game: Doc<"games">
): Record<Piece, [number, number][]> => {
  return Object.fromEntries(
    game.board.flatMap((row, rowIndex) =>
      row.flatMap((cell, columnIndex) =>
        isPiece(cell as Cell)
          ? [
              [
                cell as Piece,
                listPossibleMovesWithoutCastling(
                  game,
                  cell as Piece,
                  rowIndex,
                  columnIndex
                ),
              ],
            ]
          : []
      )
    )
  ) as Record<Piece, [number, number][]>;
};
