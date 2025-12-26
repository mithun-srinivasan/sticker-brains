# 🎯 StickerQuest - Unlock Memes Through Brain Teasers

A fun, interactive web app where users **solve brain teasers to unlock exclusive meme stickers** that they can download and use in chats!

---

## 🎮 What Is StickerQuest?

**The Concept:**
Users don't just get stickers for free—they **earn them** by solving clever brain teasers. Correct answer? Boom! 🎉 Confetti celebration + sticker unlocked + ready to download.

**Perfect for:**
- Meme collections
- Engagement & gamification
- Interactive content
- Fun messaging apps (WhatsApp, Telegram, Discord)

---

## 🚀 Live Demo Flow

### 1️⃣ **Home Page**
- See a grid of locked sticker tiles
- Each sticker has a brain teaser puzzle attached

### 2️⃣ **Click a Sticker**
- Opens a modal with the puzzle
- Shows the brain teaser question
- Option for text answer or multiple choice

### 3️⃣ **Solve & Unlock**
- Submit your answer
- ✅ Correct? → Confetti animation + sticker unlocked
- ❌ Wrong? → Try again (with optional hint)

### 4️⃣ **Download**
- Get the sticker image as a downloadable file
- Use it in WhatsApp, Telegram, Discord, etc.

### 5️⃣ **My Stickers Page**
- View all unlocked stickers in your collection
- Download any unlocked sticker anytime
- Track your progress

---

## 🛠️ How to Set Up (2 Minutes)

### Installation
```bash
npm install
npm run dev
```

The app runs on `http://localhost:5000`

### Add Your Own Memes

**Step 1:** Put your meme image files in `/client/public/memes/`
- Supported formats: JPG, PNG, GIF, WebP
- Example: `epic-win.jpg`, `big-brain.png`

**Step 2:** Edit `server/routes.ts` in the `seedDatabase()` function:

```typescript
// Add a new sticker with its brain teaser
const mySticker = await storage.createSticker({
  name: "Your Meme Name",
  imageUrl: "/memes/your-image.jpg",  // Path to your file
  category: "Funny"  // Category for organization
});

// Create the puzzle to unlock it
await storage.createGame({
  stickerId: mySticker.id,
  question: "What is the answer to life, the universe, and everything?",
  answer: "42",  // Correct answer (case-insensitive)
  type: "text",  // "text" for free-form, "choice" for multiple choice
  hint: "It's a famous number"  // Optional hint
});
```

**Step 3:** Restart the app
```bash
npm run dev
```

Done! Your new sticker is live.

---

## 🎯 Example: Adding Multiple Stickers

```typescript
// Sticker 1 - Text Answer
const sticker1 = await storage.createSticker({
  name: "Big Brain Moment",
  imageUrl: "/memes/big-brain.jpg",
  category: "Memes"
});

await storage.createGame({
  stickerId: sticker1.id,
  question: "I have cities but no houses, forests but no trees, and water but no fish. What am I?",
  answer: "Map",
  type: "text",
  hint: "You use this for navigation"
});

// Sticker 2 - Multiple Choice
const sticker2 = await storage.createSticker({
  name: "Epic Win",
  imageUrl: "/memes/epic-win.jpg",
  category: "Funny"
});

await storage.createGame({
  stickerId: sticker2.id,
  question: "What has a crown but is not a king?",
  answer: "Tooth",
  type: "choice",
  options: ["Tooth", "Hat", "Princess", "Diamond"],
  hint: "It's in your mouth"
});
```

---

## 📱 Features

✅ **Interactive Brain Teasers**
- Text-based and multiple-choice questions
- Optional hints to help users
- Case-insensitive answers

✅ **Visual Feedback**
- Confetti celebration on correct answers
- Modal-based puzzle interface
- Sticker preview before unlock

✅ **Download System**
- Download unlocked stickers as image files
- Works with both local meme files and external URLs
- Proper file naming and headers

✅ **User Collection**
- "My Stickers" page shows all unlocked stickers
- Persistent tracking (browser localStorage)
- Download any sticker anytime

✅ **Mobile Friendly**
- Responsive design
- Works on phones, tablets, desktops
- Touch-friendly interface

---

## 🎨 Tech Stack

- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Express.js + Node.js
- **Database:** PostgreSQL (with Drizzle ORM)
- **Animations:** Framer Motion + Canvas Confetti
- **Routing:** Wouter (lightweight routing)
- **UI Components:** Shadcn/ui (Radix UI)

---

## 📂 Project Structure

```
client/
├── src/
│   ├── pages/
│   │   ├── Home.tsx          # Sticker grid & puzzle entry
│   │   └── MyStickers.tsx    # Collection view
│   ├── components/
│   │   ├── GameModal.tsx     # Puzzle interface
│   │   ├── StickerCard.tsx   # Sticker tile
│   │   └── Header.tsx        # Navigation
│   └── hooks/
│       └── use-stickers.ts   # Data fetching
│
├── public/
│   └── memes/                # YOUR MEME FILES HERE
│       ├── epic-win.jpg
│       ├── big-brain.jpg
│       └── README.md         # Instructions
│
server/
├── routes.ts                 # API endpoints & seed data
├── storage.ts               # Data operations
└── vite.ts                  # Server config

shared/
└── schema.ts                # Database schema
```

---

## 🎤 Hackathon Demo Script

### Opening (30 seconds)
> "StickerQuest is a gamified way to collect meme stickers. Instead of free stickers, users earn them by solving brain teasers. It's engagement meets fun."

### Live Demo (2 minutes)

1. **Show Home Page**
   - "Here's our sticker gallery. All locked. Let's unlock one."

2. **Click a Sticker**
   - "Click any sticker to see the brain teaser."
   - Opens modal with puzzle

3. **Solve the Puzzle**
   - "Here's our brain teaser. Let me solve it..."
   - Type or click answer
   - **BOOM!** 🎉 Confetti animation
   - "Sticker unlocked!"

4. **Download the Sticker**
   - "Click download to get the meme image."
   - Shows download button

5. **Show My Stickers**
   - "Click 'My Stickers' to see the collection."
   - Shows all unlocked stickers
   - Can download any anytime

6. **Show Customization**
   - "Adding new memes is super easy. Just add image files to the memes folder and update the seed data."
   - Quick code example

### Closing (30 seconds)
> "Perfect for any app that wants engagement and fun. Whether it's a messaging platform, community app, or loyalty system—turn stickers into a reward!"

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Database operations
npm run db:push        # Sync database schema
```

---

## 💡 Ideas for Customization

- **Difficulty Levels:** Easy, Medium, Hard stickers
- **Categories:** Group stickers by theme
- **Streaks:** Unlock bonuses for consecutive correct answers
- **Time Challenges:** Speed-based unlocking
- **Social Sharing:** Share unlocked stickers with friends
- **Leaderboards:** Track who's unlocked the most

---

## 📝 File Format Support

**Images:** JPG, PNG, GIF, WebP

**Example paths:**
```
/memes/epic-win.jpg
/memes/big-brain.png
/memes/funny-face.gif
/memes/crazy-reaction.webp
```

---

## ❓ FAQ

**Q: How do users access the app?**
- It's a web app running on `localhost:5000` (or deployed URL)

**Q: Can I use external image URLs instead of uploading?**
- Yes! The system supports both local files and external URLs

**Q: Are unlocked stickers saved permanently?**
- Currently saved in browser localStorage. Easily extendable to user accounts/backend

**Q: How many stickers can I add?**
- Unlimited! Add as many as you want

**Q: Can I change the brain teasers later?**
- Yes! Just edit `server/routes.ts` and restart the app

---

## 🎯 Why This Works for Hackathons

✨ **Impressive Demo** - Visual, interactive, fun to watch
🎮 **Engagement** - Users actually want to solve puzzles
📱 **Mobile-Ready** - Works on any device
⚡ **Easy to Customize** - Judges can see it's scalable
🎨 **Beautiful UI** - Modern, polished design
🚀 **Production-Ready** - Real database, real downloads

---

## 📞 Need Help?

Check out the `/client/public/memes/README.md` file for detailed instructions on adding your own memes.

---

**Made with ❤️ for the Hackathon**

Good luck! Go unlock some stickers! 🎉
