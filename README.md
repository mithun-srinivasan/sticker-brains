# Sticker Brains

A simple web app where you solve puzzles to unlock meme stickers!

## What does it do?

- Solve brain teasers to unlock stickers
- Download the stickers you unlock
- Collect all the stickers in your library

## How to run?

```bash
npm install
npm run dev
```

Then open `http://localhost:5000` in your browser.

## How to add your own stickers?

1. Put your meme images in `/client/public/memes/` folder
2. Edit `server/routes.ts` - find the `seedDatabase()` function
3. Add your sticker like this:

```typescript
const mySticker = await storage.createSticker({
  name: "My Cool Meme",
  imageUrl: "/memes/my-image.jpg",
  category: "Funny"
});

await storage.createGame({
  stickerId: mySticker.id,
  question: "What's 2+2?",
  answer: "4",
  type: "text"
});
```

4. Restart the app

That's it! 

## Tech Stack

- React + TypeScript
- Express.js
- SQLite database
- Tailwind CSS

---

Made for fun 😊
