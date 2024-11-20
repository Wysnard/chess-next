import { expect, test } from "vitest";
import { Board, Piece, STARTING_BOARD } from "./pieces";
import { listKingPossibleMoves } from "./list-king-possible-moves";
import { Doc, Id } from "../../convex/_generated/dataModel";

const game: Doc<"games"> = {
  _id: "" as Id<"games">,
  _creationTime: 0,
  board: STARTING_BOARD,
  players: [],
  turn: 1,
  state: "playing",
  history: [],
};

test("starting position", () => {
  expect(listKingPossibleMoves(game, "k")).toEqual([]);
  expect(listKingPossibleMoves(game, "K")).toEqual([]);
});

test("middle of the board", () => {
  expect(
    listKingPossibleMoves(
      {
        ...game,
        board: [
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "k", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
          ["", "", "", "", "", "", "", ""],
        ],
      },
      "k"
    )
  ).toEqual([
    [2, 2],
    [2, 3],
    [2, 4],
    [3, 2],
    [3, 4],
    [4, 2],
    [4, 3],
    [4, 4],
  ]);
});

// test("white king side castling", () => {
//   expect(
//     listKingPossibleMoves(
//       {
//         ...game,
//         board: [
//           ["r1", "", "", "k", "q", "b2", "n2", "r2"],
//           ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"],
//           ["", "", "", "", "", "", "", ""],
//           ["", "", "", "", "", "", "", ""],
//           ["", "", "", "", "", "", "", ""],
//           ["", "", "", "", "", "", "", ""],
//           ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"],
//           ["R1", "N1", "B1", "K", "Q", "B2", "N2", "R2"],
//         ],
//       },
//       "k"
//     )
//   ).toEqual([
//     [0, 2],
//     [0, 1],
//   ]);
// });

// test("black king side castling", () => {
//   expect(
//     listKingPossibleMoves(
//       {
//         ...game,
//         board: [
//           ["r1", "n1", "b1", "k", "q", "b2", "n2", "r2"],
//           ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"],
//           ["", "", "", "", "", "", "", ""],
//           ["", "", "", "", "", "", "", ""],
//           ["", "", "", "", "", "", "", ""],
//           ["", "", "", "", "", "", "", ""],
//           ["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"],
//           ["R1", "", "", "K", "Q", "B2", "N2", "R2"],
//         ],
//       },
//       "K"
//     )
//   ).toEqual([
//     [7, 2],
//     [7, 1],
//   ]);
// });
