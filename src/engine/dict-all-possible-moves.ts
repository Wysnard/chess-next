import { mapValues } from "radash";
import { Doc } from "../../convex/_generated/dataModel";
import { dictAllPossibleMovesWithoutCastling } from "./dict-all-possible-moves-without-castling";
import { isKing, Piece } from "./pieces";
import { listKingCastling } from "./list-king-castling";

export const dictAllPossibleMoves = (
  game: Doc<"games">
): Record<Piece, [number, number][]> =>
  mapValues(dictAllPossibleMovesWithoutCastling(game), (moves, piece) =>
    isKing(piece) ? [...moves, ...listKingCastling(game, piece)] : moves
  );
