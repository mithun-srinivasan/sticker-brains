# Demo Instructions

## Run Project Locally

**Single command (first time):**
```powershell
npm install ; npm run db:push ; $env:NODE_ENV="development" ; npx tsx server/index.ts
```

**After first time:**
```powershell
$env:NODE_ENV="development" ; npx tsx server/index.ts
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
- Creates database tables and seeds with 8 meme stickers
- Starts the development server on port 5000
