import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    type: v.union(v.literal("user"), v.literal("bot"), v.literal("admin")),
    name: v.string(),
    externalId: v.optional(v.string()),
    games: v.array(v.id("games")),
    imageUrl: v.optional(v.string()),
  })
    .index("byExternalId", ["externalId"])
    .searchIndex("by_name", {
      searchField: "name",
      filterFields: ["type"],
    }),
  games: defineTable({
    board: v.array(v.array(v.string())),
    players: v.array(v.id("users")),
    turn: v.number(),
    state: v.union(
      v.literal("waiting"),
      v.literal("playing"),
      v.literal("ended")
    ),
    winner: v.optional(v.id("users")),
    history: v.array(
      v.object({
        piece: v.string(),
        from: v.array(v.number()),
        to: v.array(v.number()),
      })
    ),
  })
    .index("by_players", ["players"])
    .index("by_state", ["state"]),
});
