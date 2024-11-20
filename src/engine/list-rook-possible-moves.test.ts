import { expect, test } from "vitest";
import { STARTING_BOARD } from "./pieces";
import { listRookPossibleMoves } from "./list-rook-possible-moves";

test("starting position", () => {
  expect(listRookPossibleMoves(STARTING_BOARD, "r1")).toEqual([]);
  expect(listRookPossibleMoves(STARTING_BOARD, "r2")).toEqual([]);
});
