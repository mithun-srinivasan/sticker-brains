import { Sticker, Package } from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

export function Header() {
  const [location] = useLocation();
  
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer hover:opacity-80 transition-opacity">
          <div className="p-2 bg-primary rounded-xl text-primary-foreground transform group-hover:rotate-12 transition-transform duration-300">
            <Sticker size={24} strokeWidth={2.5} />
          </div>
          <h1 className="text-xl md:text-2xl font-black text-foreground tracking-tight">
            Sticker<span className="text-primary">Quest</span>
          </h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:block text-sm font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
            🧠 Brain Games = 🖼️ Free Stickers
          </div>
          {location !== "/my-stickers" && (
            <Link href="/my-stickers">
              <Button variant="outline" size="sm" className="rounded-lg gap-2">
                <Package size={16} />
                <span className="hidden sm:inline">My Stickers</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
