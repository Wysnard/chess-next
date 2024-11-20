import z from "zod";
import { shuffle } from "radash";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { NoOp } from "convex-helpers/server/customFunctions";
import { zCustomMutation, zid } from "convex-helpers/server/zod";
import {
  STARTING_BOARD,
  allPieces,
  isBlackPiece,
  isWhitePiece,
} from "../src/engine/pieces";
import { move } from "../src/engine/move";
import { getCurrentUserOrThrow } from "./users";
import { dictAllPossibleMoves } from "../src/engine/dict-all-possible-moves";

const zMutation = zCustomMutation(mutation, NoOp);

export const get = query({
  args: { gameId: v.id("games") },
  handler: async (ctx, args) => {
    const game = await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("_id"), args.gameId))
      .first();

    if (!game) {
      throw new Error("Game not found");
    }

    return game;
  },
});

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await getCurrentUserOrThrow(ctx);

    const result = await ctx.db.query("games").collect();

    return result.filter((game) => game.players.includes(identity._id));
  },
});

export const create = mutation({
  args: {},
  handler: async (ctx) => {
    await getCurrentUserOrThrow(ctx);
    return ctx.db.insert("games", {
      board: STARTING_BOARD,
      players: [],
      turn: 0,
      state: "waiting",
      history: [],
    });
  },
});

export const join = mutation({
  args: { gameId: v.id("games") },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    const user = await getCurrentUserOrThrow(ctx);

    if (!game) throw new Error("Game not found");
    if (game.state !== "waiting")
      throw new Error(`Game ${args.gameId} is not waiting`);
    if (game.players.find((playerId) => playerId === user._id))
      throw new Error("The player is already in the game");

    const newPlayers = shuffle([...game.players, user._id]);
    const newGame = {
      ...game,
      players: newPlayers,
      state: newPlayers.length === 2 ? "playing" : "waiting",
    };

    await Promise.all([
      ctx.db.replace(game._id, newGame),
      ctx.db.replace(user._id, {
        ...user,
        games: [game._id, ...user.games],
      }),
    ]);

    return game._id;
  },
});

export const start = mutation({
  args: { gameId: v.id("games") },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) throw new Error("Game not found");
    if (game.state !== "waiting") throw new Error("Game is not waiting");

    ctx.db.replace(args.gameId, { ...game, state: "playing" });
  },
});

export const play = zMutation({
  args: {
    gameId: zid("games"),
    piece: z.enum(allPieces),
    to: z.tuple([z.number().min(0).max(7), z.number().min(0).max(7)]),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("You are not authenticated");

    const game = await ctx.db.get(args.gameId);

    if (!game) throw new Error("Game not found");
    if (game.state !== "playing")
      throw new Error(`Game ${args.gameId} is not playing`);

    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("externalId"), identity.subject))
      .first();
    if (!user) throw new Error(`User ${identity.subject} not found`);

    if (!game.players.find((playerId) => playerId === user._id))
      throw new Error(`User ${user._id} is not in game ${args.gameId}`);
    if (game.players[game.turn % game.players.length] !== user._id)
      throw new Error(`It is not your turn to play`);
    if (game.turn % 2 === 0 && isBlackPiece(args.piece))
      throw new Error(`It is white player's turn`);
    if (game.turn % 2 === 1 && isWhitePiece(args.piece))
      throw new Error(`It is black player's turn`);

    const allPossibleMoves = dictAllPossibleMoves(game);
    if (
      !allPossibleMoves[args.piece].some(
        (move) => move[0] === args.to[0] && move[1] === args.to[1]
      )
    )
      throw new Error(`Piece ${args.piece} cannot move to ${args.to}`);

    ctx.db.replace(args.gameId, move(game, args.piece, args.to));
  },
});

export const resign = mutation({
  args: { gameId: v.id("games") },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) throw new Error("Game not found");
    if (game.state !== "playing") throw new Error("Game is not playing");

    const currentPlayer = await getCurrentUserOrThrow(ctx);
    if (!game.players.find((playerId) => playerId === currentPlayer._id))
      throw new Error(
        `User ${currentPlayer._id} is not in game ${args.gameId}`
      );

    if (game.players.length === 2) {
      const winner = game.players.find(
        (playerId) => playerId !== currentPlayer._id
      );
      return ctx.db.replace(args.gameId, { ...game, state: "ended", winner });
    }

    return ctx.db.replace(args.gameId, {
      ...game,
      state: "ended",
      winner: currentPlayer._id,
    });
  },
});

export const remove = mutation({
  args: { gameId: v.id("games") },
  handler: async (ctx, args) => {
    const game = await ctx.db.get(args.gameId);
    if (!game) throw new Error("Game not found");

    const result = await ctx.db.delete(args.gameId);

    const promises = game.players.map(async (playerId) => {
      const player = await ctx.db.get(playerId);
      if (!player) return;
      await ctx.db.patch(playerId, {
        games: player.games.filter((id) => id !== args.gameId),
      });
    });

    await Promise.all(promises);
    return result;
  },
});
