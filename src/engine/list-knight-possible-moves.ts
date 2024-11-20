import { Board, isPossibleToMove, Piece } from "./pieces";

export const listKnightPossibleMoves = (
  board: Board,
  piece: Piece
): [number, number][] => {
  const rowIndex = board.findIndex((row) => row.includes(piece));
  const columnIndex = board[rowIndex].findIndex((cell) => cell === piece);

  const result: [number, number][] = [];
  for (let i = 1; i < 3; i++) {
    for (let j = 1; j < 3; j++) {
      if (i + j !== 3) continue;
      if (
        rowIndex + i < 8 &&
        columnIndex + j < 8 &&
        isPossibleToMove(piece, board[rowIndex + i][columnIndex + j])
      )
        result.push([rowIndex + i, columnIndex + j]);
      if (
        rowIndex + i < 8 &&
        columnIndex - j >= 0 &&
        isPossibleToMove(piece, board[rowIndex + i][columnIndex - j])
      )
        result.push([rowIndex + i, columnIndex - j]);
      if (
        rowIndex - i >= 0 &&
        columnIndex + j < 8 &&
        isPossibleToMove(piece, board[rowIndex - i][columnIndex + j])
      )
        result.push([rowIndex - i, columnIndex + j]);
      if (
        rowIndex - i >= 0 &&
        columnIndex - j >= 0 &&
        isPossibleToMove(piece, board[rowIndex - i][columnIndex - j])
      )
        result.push([rowIndex - i, columnIndex - j]);
    }
  }

  return result;
};
