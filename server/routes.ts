import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

async function seedDatabase() {
  const existing = await storage.getStickers();
  if (existing.length === 0) {
    console.log("Seeding database...");
    
    // Level 1 - Unga Vaai Unga Uruttu
    const s1 = await storage.createSticker({
      name: "Unga Vaai Unga Uruttu",
      imageUrl: "/memes/unnamed_1766654814067.png",
      category: "Comedy"
    });
    await storage.createGame({
      stickerId: s1.id,
      question: "I have cities but no houses, forests but no trees, and water but no fish. What am I?",
      answer: "Map",
      type: "choice",
      options: ["Map", "Painting", "Picture", "Video"],
      hint: "You use this for navigation"
    });

    // Level 2 - Manda Batharam
    const s2 = await storage.createSticker({
      name: "Manda Batharam",
      imageUrl: "/memes/st,small,507x507-pad,600x600,f8f8f8_1766654814066.jpg",
      category: "Memes"
    });
    await storage.createGame({
      stickerId: s2.id,
      question: "What number comes next in this sequence? 2, 4, 8, 16, ?",
      answer: "32",
      type: "text",
      hint: "Each number is double the previous"
    });

    // Level 3 - Dubai-ah
    const s3 = await storage.createSticker({
      name: "Hello Dubai-ah",
      imageUrl: "/memes/st,small,507x507-pad,600x600,f8f8f8_1766654814066.jpg",
      category: "Funny"
    });
    await storage.createGame({
      stickerId: s3.id,
      question: "If you have a bowl with six apples and you take away three, how many do you have?",
      answer: "3",
      type: "choice",
      options: ["6", "3", "0", "9"],
      hint: "Focus on what you HAVE in your hand"
    });

    // Level 4 - Shock Aayitten
    const s4 = await storage.createSticker({
      name: "Naa Apdiye Shock Aayitten",
      imageUrl: "/memes/st,small,507x507-pad,600x600,f8f8f8.u3_1766654814066.jpg",
      category: "Comedy"
    });
    await storage.createGame({
      stickerId: s4.id,
      question: "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?",
      answer: "Echo",
      type: "text",
      hint: "It repeats what you say"
    });

    // Level 5 - Sethudhu
    const s5 = await storage.createSticker({
      name: "Sethudhu Logic Puzzle",
      imageUrl: "/memes/3ae325ca-ff88-484b-a553-f7bf8ed27c43_1766654814065.jpg",
      category: "Brain Teaser"
    });
    await storage.createGame({
      stickerId: s5.id,
      question: "What has a head and a tail but no body?",
      answer: "Coin",
      type: "choice",
      options: ["Coin", "Snake", "Kite", "Arrow"],
      hint: "You flip it to make decisions"
    });

    // Level 6 - Serious Face
    const s6 = await storage.createSticker({
      name: "Serious Thoughts",
      imageUrl: "/memes/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8_1766654814067.jpg",
      category: "Reaction"
    });
    await storage.createGame({
      stickerId: s6.id,
      question: "A train travels at 60 mph. After 2 hours, how far has it traveled?",
      answer: "120",
      type: "text",
      hint: "Distance = Speed × Time"
    });

    // Level 7 - Tamil Meme
    const s7 = await storage.createSticker({
      name: "Tamil Comedy",
      imageUrl: "/memes/0.thumb128_1766654814063.jpg",
      category: "Memes"
    });
    await storage.createGame({
      stickerId: s7.id,
      question: "What five-letter word becomes shorter when you add two letters to it?",
      answer: "Short",
      type: "choice",
      options: ["Short", "Long", "Letter", "Word"],
      hint: "Short + 'er' = ?"
    });

    // Level 8 - String Puzzle
    const s8 = await storage.createSticker({
      name: "Physics Challenge",
      imageUrl: "/memes/3ae325ca-ff88-484b-a553-f7bf8ed27c43_(1)_1766654814064.jpg",
      category: "Brain Teaser"
    });
    await storage.createGame({
      stickerId: s8.id,
      question: "I have branches but no leaves, no trunk and no fruit. What am I?",
      answer: "River",
      type: "choice",
      options: ["River", "Tree", "Road", "Building"],
      hint: "Water flows through me"
    });
    
    console.log("Database seeded with 8 meme stickers!");
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Initialize seed data
  seedDatabase();

  app.get(api.stickers.list.path, async (req, res) => {
    const stickers = await storage.getStickers();
    res.json(stickers);
  });

  app.get(api.stickers.get.path, async (req, res) => {
    const sticker = await storage.getSticker(Number(req.params.id));
    if (!sticker) {
      return res.status(404).json({ message: "Sticker not found" });
    }
    res.json(sticker);
  });

  app.get(api.games.getBySticker.path, async (req, res) => {
    const game = await storage.getGameByStickerId(Number(req.params.id));
    if (!game) {
      return res.status(404).json({ message: "Game not found for this sticker" });
    }
    
    // Parse options if it's a JSON string
    const gameData = { ...game };
    if (gameData.options && typeof gameData.options === 'string') {
      try {
        gameData.options = JSON.parse(gameData.options);
      } catch (e) {
        // If parsing fails, keep as is
      }
    }
    res.json(gameData);
  });

  app.post(api.games.verify.path, async (req, res) => {
    try {
      const { answer } = api.games.verify.input.parse(req.body);
      const game = await storage.getGame(Number(req.params.id));

      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }

      const isCorrect = game.answer.toLowerCase().trim() === answer.toLowerCase().trim();
      
      let stickerUrl: string | undefined;
      if (isCorrect) {
        const sticker = await storage.getSticker(game.stickerId);
        stickerUrl = sticker?.imageUrl;
      }

      res.json({
        correct: isCorrect,
        message: isCorrect ? "Correct! Unlocked!" : "Try again!",
        stickerUrl
      });
    } catch (error) {
       if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid input" });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Download sticker - handles both local files and external URLs
  app.get(api.download.sticker.path, async (req, res) => {
    try {
      const sticker = await storage.getSticker(Number(req.params.id));
      if (!sticker) {
        return res.status(404).json({ message: "Sticker not found" });
      }

      const isLocalPath = sticker.imageUrl.startsWith('/');
      let buffer: Buffer;
      let contentType = 'image/jpeg';

      if (isLocalPath) {
        // Serve local file from public folder
        const path = require('path');
        const fs = require('fs');
        const filePath = path.join(process.cwd(), 'client', 'public', sticker.imageUrl);
        
        if (!fs.existsSync(filePath)) {
          return res.status(404).json({ message: "Sticker image not found. Please add the image to /client/public/memes/" });
        }

        buffer = fs.readFileSync(filePath);
        // Determine content type from file extension
        const ext = path.extname(filePath).toLowerCase();
        if (ext === '.png') contentType = 'image/png';
        else if (ext === '.gif') contentType = 'image/gif';
        else if (ext === '.webp') contentType = 'image/webp';
      } else {
        // Fetch external URL
        const imageResponse = await fetch(sticker.imageUrl);
        if (!imageResponse.ok) {
          return res.status(404).json({ message: "Image not found" });
        }

        contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
        const arrayBuffer = await imageResponse.arrayBuffer();
        buffer = Buffer.from(arrayBuffer);
      }

      // Determine file extension
      const ext = sticker.imageUrl.includes('.png') ? '.png' : 
                  sticker.imageUrl.includes('.gif') ? '.gif' :
                  sticker.imageUrl.includes('.webp') ? '.webp' : '.jpg';

      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${sticker.name.replace(/\s+/g, '_')}${ext}"`);
      res.setHeader('Cache-Control', 'public, max-age=3600');

      res.send(buffer);
    } catch (error) {
      console.error('Download error:', error);
      res.status(500).json({ message: "Failed to download sticker" });
    }
  });

  return httpServer;
}
