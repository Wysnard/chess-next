import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    type: v.optional(v.string()),
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
    state: v.string(),
    winner: v.optional(v.id("users")),
    history: v.array(
      v.object({
        piece: v.string(),
        from: v.array(v.number()),
        to: v.array(v.number()),
      })
    ),
  }).index("by_players", ["players"]),
});
