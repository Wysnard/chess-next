import { expect, test } from "vitest";
import { listKnightPossibleMoves } from "./list-knight-possible-moves";
import { STARTING_BOARD } from "./pieces";

test("starting position", () => {
  expect(listKnightPossibleMoves(STARTING_BOARD, "n1")).toEqual([
    [2, 2],
    [2, 0],
  ]);
  expect(listKnightPossibleMoves(STARTING_BOARD, "n2")).toEqual([
    [2, 7],
    [2, 5],
  ]);
  expect(listKnightPossibleMoves(STARTING_BOARD, "N1")).toEqual([
    [5, 2],
    [5, 0],
  ]);
  expect(listKnightPossibleMoves(STARTING_BOARD, "N2")).toEqual([
    [5, 7],
    [5, 5],
  ]);
});

test("can capture the pawns", () => {
  const movelist = listKnightPossibleMoves(
    [
      ["", "", "", "", "", "", "", ""],
      ["", "P1", "", "P2", "", "", "", ""],
      ["P5", "", "", "", "P7", "", "", ""],
      ["", "", "n1", "", "", "", "", ""],
      ["P6", "", "", "", "P8", "", "", ""],
      ["", "P3", "", "P4", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ],
    "n1"
  );
  expect(movelist).toEqual([
    [4, 4],
    [4, 0],
    [2, 4],
    [2, 0],
    [5, 3],
    [5, 1],
    [1, 3],
    [1, 1],
  ]);
});

test("can't capture own pieces", () => {
  const movelist = listKnightPossibleMoves(
    [
      ["", "", "", "", "", "", "", ""],
      ["", "p1", "", "p2", "", "", "", ""],
      ["P5", "", "", "", "P7", "", "", ""],
      ["", "", "n1", "", "", "", "", ""],
      ["P6", "", "", "", "P8", "", "", ""],
      ["", "P3", "", "P4", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ],
    "n1"
  );
  expect(movelist).toEqual([
    [4, 4],
    [4, 0],
    [2, 4],
    [2, 0],
    [5, 3],
    [5, 1],
  ]);
});
