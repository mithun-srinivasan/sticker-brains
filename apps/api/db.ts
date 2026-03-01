import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@shared/schema";

// Use SQLite for local development
const sqlite = new Database("sticker-brains.db");
export const db = drizzle(sqlite, { schema });

// Export a dummy pool for compatibility
export const pool = {
  end: () => Promise.resolve()
};
