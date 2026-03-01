import { db } from "./db";
import { stickers, games, type Sticker, type Game } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getStickers(): Promise<Sticker[]>;
  getSticker(id: number): Promise<Sticker | undefined>;
  getGameByStickerId(stickerId: number): Promise<Game | undefined>;
  getGame(id: number): Promise<Game | undefined>;
  createSticker(sticker: any): Promise<Sticker>; // Using any for seed mainly
  createGame(game: any): Promise<Game>;
}

export class DatabaseStorage implements IStorage {
  async getStickers(): Promise<Sticker[]> {
    return await db.select().from(stickers);
  }

  async getSticker(id: number): Promise<Sticker | undefined> {
    const [sticker] = await db.select().from(stickers).where(eq(stickers.id, id));
    return sticker;
  }

  async getGameByStickerId(stickerId: number): Promise<Game | undefined> {
    const [game] = await db.select().from(games).where(eq(games.stickerId, stickerId));
    return game;
  }

  async getGame(id: number): Promise<Game | undefined> {
    const [game] = await db.select().from(games).where(eq(games.id, id));
    return game;
  }

  async createSticker(insertSticker: any): Promise<Sticker> {
    await db.insert(stickers).values(insertSticker);
    // Get the last inserted item
    const allStickers = await db.select().from(stickers);
    return allStickers[allStickers.length - 1];
  }

  async createGame(insertGame: any): Promise<Game> {
    // Convert options array to JSON string for SQLite
    if (insertGame.options && Array.isArray(insertGame.options)) {
      insertGame.options = JSON.stringify(insertGame.options);
    }
    await db.insert(games).values(insertGame);
    // Get the last inserted item
    const allGames = await db.select().from(games);
    return allGames[allGames.length - 1];
  }
}

export const storage = new DatabaseStorage();
