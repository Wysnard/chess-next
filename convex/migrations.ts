import { Migrations } from "@convex-dev/migrations";
import { components, internal } from "./_generated/api.js";
import { DataModel } from "./_generated/dataModel.js";

export const migrations = new Migrations<DataModel>(components.migrations);
export const run = migrations.runner();

export const setDefaultUserType = migrations.define({
  table: "users",
  migrateOne: async (ctx, doc) => {
    if (doc.type === undefined) {
      await ctx.db.patch(doc._id, { type: "user" });
    }
  },
});

export const runAll = migrations.runner([
  internal.migrations.setDefaultUserType,
]);
