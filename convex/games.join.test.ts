import { expect, test } from "vitest";
import { convexTest } from "convex-test";
import schema from "./schema";
import { api } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { STARTING_BOARD } from "../src/engine/pieces";

test("join a game", async () => {
  const t = convexTest(schema);
  await t.run(async (ctx) => {
    ctx.db.insert("users", {
      name: "test",
      externalId: "test",
      games: [],
    });
  });
  const asAuth = t.withIdentity({ subject: "test" });
  const gameId = await asAuth.mutation(api.games.create, {});
  const joinedGameId = await asAuth.mutation(api.games.join, {
    gameId,
  });
  const game = await asAuth.query(api.games.get, { gameId });
  const user = (await asAuth.query(api.users.current, {}))!;

  expect(joinedGameId).toEqual(gameId);
  expect(game.players).toEqual([user._id]);
  expect(user.games).toContain(gameId);
});

test("two players join a game", async () => {
  const t = convexTest(schema);
  await t.run(async (ctx) => {
    await ctx.db.insert("users", {
      name: "test1",
      externalId: "test1",
      games: [],
    });
    await ctx.db.insert("users", {
      name: "test2",
      externalId: "test2",
      games: [],
    });
  });
  const asAuth1 = t.withIdentity({ subject: "test1" });
  const asAuth2 = t.withIdentity({ subject: "test2" });
  const gameId = await asAuth1.mutation(api.games.create, {});
  await asAuth1.mutation(api.games.join, { gameId });
  await asAuth2.mutation(api.games.join, { gameId });
  const game = await asAuth1.query(api.games.get, { gameId });
  const user1 = (await asAuth1.query(api.users.current, {}))!;
  const user2 = (await asAuth2.query(api.users.current, {}))!;

  expect(game.players).toContain(user1._id);
  expect(game.players).toContain(user2._id);
  expect(game.state).toEqual("playing");
  expect(user1.games).toContain(gameId);
  expect(user2.games).toContain(gameId);
});

test("cannot join a game if it does not exist", async () => {
  const t = convexTest(schema);
  await expect(
    t.mutation(api.games.join, {
      gameId: "does-not-exist" as Id<"games">,
    })
  ).rejects.toThrow();
});

test("cannot join a game if already joined", async () => {
  const t = convexTest(schema);
  await t.run(async (ctx) => {
    await ctx.db.insert("users", {
      name: "test",
      externalId: "test",
      games: [],
    });
  });
  const asAuth = t.withIdentity({ subject: "test" });
  const gameId = await asAuth.mutation(api.games.create, {});
  await asAuth.mutation(api.games.join, { gameId });
  await expect(asAuth.mutation(api.games.join, { gameId })).rejects.toThrow();
});

test("cannot join a game if it is not waiting", async () => {
  const t = convexTest(schema);
  await t.run(async (ctx) => {
    await ctx.db.insert("users", {
      name: "test",
      externalId: "test",
      games: [],
    });
  });
  const asAuth = t.withIdentity({ subject: "test" });
  const gameId = await t.run(async (ctx) => {
    const gameId = await ctx.db.insert("games", {
      board: STARTING_BOARD,
      players: [],
      turn: 0,
      state: "playing",
      history: [],
    });
    return gameId;
  });
  await expect(asAuth.mutation(api.games.join, { gameId })).rejects.toThrow();
  const user = (await asAuth.query(api.users.current, {}))!;
  expect(user.games).not.toContain(gameId);
  const game = await asAuth.query(api.games.get, { gameId });
  expect(game.players).not.toContain(user._id);
});

test("cannot join a game if it is full", async () => {
  const t = convexTest(schema);
  await t.run(async (ctx) => {
    await ctx.db.insert("users", {
      name: "test1",
      externalId: "test1",
      games: [],
    });
    await ctx.db.insert("users", {
      name: "test2",
      externalId: "test2",
      games: [],
    });
  });
  const asAuth1 = t.withIdentity({ subject: "test1" });
  const asAuth2 = t.withIdentity({ subject: "test2" });
  const asAuth3 = t.withIdentity({ subject: "test3" });
  const gameId = await asAuth1.mutation(api.games.create, {});
  await asAuth1.mutation(api.games.join, { gameId });
  await asAuth2.mutation(api.games.join, { gameId });
  await expect(asAuth3.mutation(api.games.join, { gameId })).rejects.toThrow();
});
