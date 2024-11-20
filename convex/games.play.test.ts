import { expect, test } from "vitest";
import { convexTest, TestConvex } from "convex-test";
import schema from "./schema";
import { api } from "./_generated/api";
import { Board, Piece, STARTING_BOARD } from "../src/engine/pieces";
import { Id } from "./_generated/dataModel";

const insert2Users = async (t: TestConvex<typeof schema>) => {
  await t.run(async (ctx) => {
    return Promise.all([
      ctx.db.insert("users", {
        name: "test1",
        externalId: "test1",
        games: [],
      }),
      ctx.db.insert("users", {
        name: "test2",
        externalId: "test2",
        games: [],
      }),
    ]);
  });
};

const insertUsersInGame = async (
  t: TestConvex<typeof schema>,
  gameId: Id<"games">
) => {
  await t.run(async (ctx) => {
    const test1 = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("externalId"), "test1"))
      .first();
    const test2 = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("externalId"), "test2"))
      .first();
    await ctx.db.patch(gameId, { players: [test1!._id, test2!._id] });
  });
};

const play_a_piece_cases: [Board, Piece, [number, number]][] = [
  [STARTING_BOARD, "p4", [3, 3]],
  [STARTING_BOARD, "n1", [2, 0]],
  [STARTING_BOARD, "n1", [2, 2]],
  [
    [
      ["r1", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "k", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "K", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ],
    "r1",
    [0, 7],
  ],
];

test.each(play_a_piece_cases)(
  "play a piece in a game",
  async (board, piece, to) => {
    const t = convexTest(schema);
    await insert2Users(t);
    const asAuth1 = t.withIdentity({ subject: "test1" });
    const gameId = await t.run(async (ctx) => {
      return ctx.db.insert("games", {
        board,
        players: [],
        turn: 0,
        state: "playing",
        history: [],
      });
    });
    await insertUsersInGame(t, gameId);
    await asAuth1.mutation(api.games.play, {
      gameId,
      piece,
      to,
    });
    const game = await asAuth1.query(api.games.get, { gameId });
    expect(game.board[to[0]][to[1]]).toEqual(piece);
  }
);

const play_a_piece_that_ends_the_game: [Board, Piece, [number, number]][] = [
  [
    [
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "k", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["r1", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "r2"],
      ["", "", "", "K", "", "", "", ""],
    ],
    "r1",
    [7, 0],
  ],
];

test.each(play_a_piece_that_ends_the_game)(
  "play a piece that ends the game",
  async (board, piece, to) => {
    const t = convexTest(schema);
    await insert2Users(t);
    const asAuth1 = t.withIdentity({ subject: "test1" });
    const gameId = await t.run(async (ctx) => {
      return ctx.db.insert("games", {
        board,
        players: [],
        turn: 0,
        state: "playing",
        history: [],
      });
    });
    await insertUsersInGame(t, gameId);
    await asAuth1.mutation(api.games.play, { gameId, piece, to });
    const game = await asAuth1.query(api.games.get, { gameId });
    expect(game.state).toEqual("ended");
  }
);

test("cannot play if the game is not in progress", async () => {
  const t = convexTest(schema);
  await t.run(async (ctx) => {
    await ctx.db.insert("users", {
      name: "test1",
      externalId: "test1",
      games: [],
    });
  });
  const asAuth1 = t.withIdentity({ subject: "test1" });
  const gameId = await asAuth1.mutation(api.games.create, {});
  await expect(
    asAuth1.mutation(api.games.play, { gameId, piece: "p4", to: [3, 3] })
  ).rejects.toThrow();
});

test("cannot play if it is not the player's turn", async () => {
  const t = convexTest(schema);
  await insert2Users(t);
  const asAuth2 = t.withIdentity({ subject: "test2" });
  const gameId = await t.run(async (ctx) => {
    return ctx.db.insert("games", {
      board: STARTING_BOARD,
      players: [],
      turn: 0,
      state: "playing",
      history: [],
    });
  });
  await insertUsersInGame(t, gameId);
  await expect(
    asAuth2.mutation(api.games.play, { gameId, piece: "P4", to: [5, 3] })
  ).rejects.toThrowError("It is not your turn to play");
});

const play_a_piece_cases_with_invalid_moves: [
  Board,
  Piece,
  [number, number],
][] = [
  [STARTING_BOARD, "r1", [1, 1]],
  [STARTING_BOARD, "k", [0, 0]],
  [
    [
      ["r1", "", "", "k", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
      ["", "", "", "K", "", "", "", ""],
      ["", "", "", "", "", "", "", ""],
    ],
    "r1",
    [0, 7],
  ],
];

test.each(play_a_piece_cases_with_invalid_moves)(
  "play a piece in a game with invalid moves",
  async (board, piece, to) => {
    const t = convexTest(schema);
    await insert2Users(t);
    const asAuth1 = t.withIdentity({ subject: "test1" });
    const gameId = await t.run(async (ctx) => {
      return ctx.db.insert("games", {
        board,
        players: [],
        turn: 0,
        state: "playing",
        history: [],
      });
    });
    await insertUsersInGame(t, gameId);
    await expect(
      asAuth1.mutation(api.games.play, { gameId, piece, to })
    ).rejects.toThrow();
  }
);
