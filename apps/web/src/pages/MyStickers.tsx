import { useState, useEffect } from "react";
import { useStickers } from "@/hooks/use-stickers";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Loader2, Download, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";

export default function MyStickers() {
  const { data: stickers, isLoading } = useStickers();
  const [unlockedIds, setUnlockedIds] = useState<number[]>([]);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem("unlockedStickers");
    if (saved) {
      setUnlockedIds(JSON.parse(saved));
    }
  }, []);

  const unlockedStickers = stickers?.filter(s => unlockedIds.includes(s.id)) || [];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="max-w-5xl mx-auto px-4 pt-8">
        <div className="text-center py-10 md:py-16">
          <h2 className="text-4xl md:text-6xl font-display font-black text-foreground mb-4">
            Your Collection
          </h2>
          <p className="text-lg text-muted-foreground">
            {unlockedStickers.length} sticker{unlockedStickers.length !== 1 ? 's' : ''} unlocked
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p>Loading...</p>
          </div>
        ) : unlockedStickers.length === 0 ? (
          <div className="text-center py-20 px-4 bg-muted/50 rounded-3xl">
            <Lock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-bold text-foreground mb-2">No stickers yet!</h3>
            <p className="text-muted-foreground mb-6">Solve puzzles to unlock stickers.</p>
            <Button 
              className="rounded-xl font-bold"
              onClick={() => setLocation("/")}
            >
              Go Unlock Stickers
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {unlockedStickers.map((sticker, index) => (
              <motion.div
                key={sticker.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-card rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square rounded-xl bg-muted/50 mb-3 flex items-center justify-center overflow-hidden">
                  <img 
                    src={sticker.imageUrl} 
                    alt={sticker.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%23f0f0f0' width='100' height='100'/%3E%3Ctext x='50' y='50' font-size='14' text-anchor='middle' dy='.3em' fill='%23999'%3EMeme%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
                <h3 className="font-bold text-sm mb-3 line-clamp-2">{sticker.name}</h3>
                <a href={`/api/stickers/${sticker.id}/download`} download={`${sticker.name}.jpg`}>
                  <Button size="sm" className="w-full rounded-lg text-xs">
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
