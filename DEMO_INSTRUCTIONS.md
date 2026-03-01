# Demo Instructions

## Run Project Locally

**Best for demo day (single command):**

```powershell
npm run demo:start
```

**Single command (first time):**

```powershell
npm install
npm run demo:ready
npm run dev
```

**After first time:**

```powershell
npm run demo:ready
npm run dev
```

**Access the app:**

```
http://localhost:5000
```

**To exit:**
Press `Ctrl + C`

---

## What This Does:

- Installs all dependencies
- Frees port 5000 if another process is using it
- Creates database tables and seeds with 8 meme stickers
- Starts the development server on port 5000
