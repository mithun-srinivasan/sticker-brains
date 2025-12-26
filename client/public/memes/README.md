# Add Your Meme Stickers Here

## How to use:
1. Add your meme image files (.jpg, .png, .gif, .webp) to this folder
2. Update the seed data in `server/routes.ts` to reference your images
   - Use paths like `/memes/your-image.jpg`
3. Create a new sticker and puzzle in the seedDatabase function
4. Restart the app

## Example:
```typescript
const sticker = await storage.createSticker({
  name: "Your Meme Name",
  imageUrl: "/memes/your-image.jpg",
  category: "Funny"
});

await storage.createGame({
  stickerId: sticker.id,
  question: "Your brain teaser question?",
  answer: "Answer",
  type: "text",
  hint: "Optional hint"
});
```

## Supported formats:
- JPEG (.jpg)
- PNG (.png) 
- GIF (.gif)
- WebP (.webp)
