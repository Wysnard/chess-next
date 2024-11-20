import { Board, isEnemy, isPossibleToMove, Piece } from "./pieces";

export const listBishopPossibleMoves = (
  board: Board,
  piece: Piece,
  rowIndex: number,
  columnIndex: number
) => {
  const result: [number, number][] = [];
  let topleft = true;
  let bottomright = true;
  let bottomleft = true;
  let topright = true;

  for (let i = 1; i < 8; i++) {
    if (rowIndex + i < 8 && columnIndex + i < 8) {
      if (!isPossibleToMove(piece, board[rowIndex + i][columnIndex + i]))
        topleft = false;
      if (topleft) result.push([rowIndex + i, columnIndex + i]);
      if (isEnemy(piece, board[rowIndex + i][columnIndex + i] as Piece))
        topleft = false;
    }
    if (rowIndex + i < 8 && columnIndex - i >= 0) {
      if (!isPossibleToMove(piece, board[rowIndex + i][columnIndex - i]))
        bottomright = false;
      if (bottomright) result.push([rowIndex + i, columnIndex - i]);
      if (isEnemy(piece, board[rowIndex + i][columnIndex - i] as Piece))
        bottomright = false;
    }
    if (rowIndex - i >= 0 && columnIndex + i < 8) {
      if (!isPossibleToMove(piece, board[rowIndex - i][columnIndex + i]))
        bottomleft = false;
      if (bottomleft) result.push([rowIndex - i, columnIndex + i]);
      if (isEnemy(piece, board[rowIndex - i][columnIndex + i] as Piece))
        bottomleft = false;
    }
    if (rowIndex - i >= 0 && columnIndex - i >= 0) {
      if (!isPossibleToMove(piece, board[rowIndex - i][columnIndex - i]))
        topright = false;
      if (topright) result.push([rowIndex - i, columnIndex - i]);
      if (isEnemy(piece, board[rowIndex - i][columnIndex - i] as Piece))
        topright = false;
    }
  }

  return result;
};
