import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./packages/shared/schema.ts",
  dialect: "sqlite",
  dbCredentials: {
    url: "sticker-brains.db",
  },
});
