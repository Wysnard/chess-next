import { expect, test } from "vitest";
import { convexTest } from "convex-test";
import schema from "./schema";
import { api } from "./_generated/api";
import { STARTING_BOARD } from "../src/engine/pieces";

test("create a game", async () => {
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
  const game = await asAuth.query(api.games.get, { gameId });
  expect(game).toMatchObject({
    board: STARTING_BOARD,
    players: [],
    turn: 0,
    state: "waiting",
    history: [],
  });
});

test("cannot create a game if not logged in", async () => {
  const t = convexTest(schema);
  await expect(t.mutation(api.games.create, {})).rejects.toThrow();
});
