import {
  Board,
  getPiecePosition,
  isEnemy,
  isPossibleToMove,
  Piece,
} from "./pieces";

export const listRookPossibleMoves = (board: Board, piece: Piece) => {
  const [rowIndex, columnIndex] = getPiecePosition(board, piece);
  const result: [number, number][] = [];
  let top = true;
  let bottom = true;
  let left = true;
  let right = true;

  for (let i = 1; i < 8; i++) {
    if (rowIndex + i < 8) {
      if (!isPossibleToMove(piece, board[rowIndex + i][columnIndex]))
        top = false;
      if (top) result.push([rowIndex + i, columnIndex]);
      if (isEnemy(piece, board[rowIndex + i][columnIndex] as Piece))
        top = false;
    }
    if (rowIndex - i >= 0) {
      if (!isPossibleToMove(piece, board[rowIndex - i][columnIndex]))
        bottom = false;
      if (bottom) result.push([rowIndex - i, columnIndex]);
      if (isEnemy(piece, board[rowIndex - i][columnIndex] as Piece))
        bottom = false;
    }
    if (columnIndex + i < 8) {
      if (!isPossibleToMove(piece, board[rowIndex][columnIndex + i]))
        right = false;
      if (right) result.push([rowIndex, columnIndex + i]);
      if (isEnemy(piece, board[rowIndex][columnIndex + i] as Piece))
        right = false;
    }
    if (columnIndex - i >= 0) {
      if (!isPossibleToMove(piece, board[rowIndex][columnIndex - i]))
        left = false;
      if (left) result.push([rowIndex, columnIndex - i]);
      if (isEnemy(piece, board[rowIndex][columnIndex - i] as Piece))
        left = false;
    }
  }

  return result;
};
