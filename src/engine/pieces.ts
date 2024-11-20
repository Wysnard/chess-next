export const blackRooks = ["R1", "R2"] as const;
export const blackKnights = ["N1", "N2"] as const;
export const blackBishops = ["B1", "B2"] as const;
export const blackQueen = ["Q"] as const;
export const blackKing = ["K"] as const;
export const blackPawns = [
  "P1",
  "P2",
  "P3",
  "P4",
  "P5",
  "P6",
  "P7",
  "P8",
] as const;
export const blackPieces = [
  ...blackRooks,
  ...blackKnights,
  ...blackBishops,
  ...blackQueen,
  ...blackKing,
  ...blackPawns,
] as const;
export type BlackPiece = (typeof blackPieces)[number];
export const isBlackPiece = (piece: Piece): piece is BlackPiece =>
  blackPieces.includes(piece as BlackPiece);

export const whiteRooks = ["r1", "r2"] as const;
export const whiteKnights = ["n1", "n2"] as const;
export const whiteBishops = ["b1", "b2"] as const;
export const whiteQueen = ["q"] as const;
export const whiteKing = ["k"] as const;
export const whitePawns = [
  "p1",
  "p2",
  "p3",
  "p4",
  "p5",
  "p6",
  "p7",
  "p8",
] as const;
export const whitePieces = [
  ...whiteRooks,
  ...whiteKnights,
  ...whiteBishops,
  ...whiteQueen,
  ...whiteKing,
  ...whitePawns,
] as const;
export type WhitePiece = (typeof whitePieces)[number];
export const isWhitePiece = (piece: Piece): piece is WhitePiece =>
  whitePieces.includes(piece as WhitePiece);

export const isSameTeam = (piece1: Piece, piece2: Piece) =>
  isBlackPiece(piece1) === isBlackPiece(piece2) ||
  isWhitePiece(piece1) === isWhitePiece(piece2);
export const isEnemy = (piece1: Piece, piece2: Piece) =>
  !isSameTeam(piece1, piece2);
export const isEmpty = (cell: Cell): cell is "" => cell === "";
export const isPossibleToMove = (piece: Piece, target: Cell) =>
  isEmpty(target) || isEnemy(piece, target);
export const isPieceStillThere = (board: Board, piece: Piece) =>
  board.some((row) => row.includes(piece));

export const rooks = [...blackRooks, ...whiteRooks] as const;
export type Rook = (typeof rooks)[number];
export const isRook = (piece: Cell): piece is Rook =>
  rooks.includes(piece as Rook);

export const knights = [...blackKnights, ...whiteKnights] as const;
export type Knight = (typeof knights)[number];
export const isKnight = (piece: Cell): piece is Knight =>
  knights.includes(piece as Knight);

export const bishops = [...blackBishops, ...whiteBishops] as const;
export type Bishop = (typeof bishops)[number];
export const isBishop = (piece: Cell): piece is Bishop =>
  bishops.includes(piece as Bishop);

export const queens = [...blackQueen, ...whiteQueen] as const;
export type Queen = (typeof queens)[number];
export const isQueen = (piece: Cell): piece is Queen =>
  queens.includes(piece as Queen);

export const kings = [...blackKing, ...whiteKing] as const;
export type King = (typeof kings)[number];
export const isKing = (piece: Cell): piece is King =>
  kings.includes(piece as King);

export const pawns = [...blackPawns, ...whitePawns] as const;
export type Pawn = (typeof pawns)[number];
export const isPawn = (piece: Cell): piece is Pawn =>
  pawns.includes(piece as Pawn);

export const kingSideRooks = ["r1", "R1"] as const;
export type KingSideRook = (typeof kingSideRooks)[number];
export const isKingSideRook = (piece: Cell): piece is KingSideRook =>
  kingSideRooks.includes(piece as KingSideRook);

export const queenSideRooks = ["r2", "R2"] as const;
export type QueenSideRook = (typeof queenSideRooks)[number];
export const isQueenSideRook = (piece: Cell): piece is QueenSideRook =>
  queenSideRooks.includes(piece as QueenSideRook);

export const allPieces = [...blackPieces, ...whitePieces] as const;
export type Piece = BlackPiece | WhitePiece;
export type Cell = Piece | "";
export type Board = Cell[][];
export const STARTING_BOARD: Board = [
  ["r1", "n1", "b1", "k", "q", "b2", "n2", "r2"],
  ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"],
  ["R1", "N1", "B1", "K", "Q", "B2", "N2", "R2"],
];
export const isPiece = (cell: Cell): cell is Piece =>
  allPieces.includes(cell as Piece);
export const getPiecePosition = (board: Board, piece: Piece) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === piece) return [i, j];
    }
  }
  throw new Error(`Piece ${piece} not found`);
};

export const fromIdToPiece = (id: Piece) => {
  if (isWhitePiece(id)) {
    if (isKing(id)) return "♔";
    if (isQueen(id)) return "♕";
    if (isRook(id)) return "♖";
    if (isBishop(id)) return "♗";
    if (isKnight(id)) return "♘";
    if (isPawn(id)) return "♙";
  }
  if (isBlackPiece(id)) {
    if (isKing(id)) return "♚";
    if (isQueen(id)) return "♛";
    if (isRook(id)) return "♜";
    if (isBishop(id)) return "♝";
    if (isKnight(id)) return "♞";
    if (isPawn(id)) return "♟︎";
  }
  return "";
};
