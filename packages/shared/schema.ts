import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const stickers = sqliteTable("stickers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(), // Can be local path (/memes/filename.png) or external URL
  category: text("category").notNull(), // e.g., "Funny", "Reaction"
});

export const games = sqliteTable("games", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  stickerId: integer("sticker_id").references(() => stickers.id).notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(), // The correct answer
  options: text("options"), // JSON string for options
  type: text("type").notNull(), // 'text' or 'choice'
  hint: text("hint"),
});

export const insertStickerSchema = createInsertSchema(stickers).omit({ id: true });
export const insertGameSchema = createInsertSchema(games).omit({ id: true });

export type Sticker = typeof stickers.$inferSelect;
export type Game = typeof games.$inferSelect;

export type VerifyAnswerRequest = {
  answer: string;
};

export type VerifyAnswerResponse = {
  correct: boolean;
  message: string;
  stickerUrl?: string; // Returned only if correct
};
