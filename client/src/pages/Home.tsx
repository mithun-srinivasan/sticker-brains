import { useState } from "react";
import { useStickers } from "@/hooks/use-stickers";
import { Header } from "@/components/Header";
import { StickerCard } from "@/components/StickerCard";
import { GameModal } from "@/components/GameModal";
import { Loader2, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: stickers, isLoading, error } = useStickers();
  const [selectedStickerId, setSelectedStickerId] = useState<number | null>(null);

  // In a real app, we'd persist unlocked state in a user profile or localStorage
  // For now, we'll keep track of unlocked stickers in local state just for this session effect
  // Note: The REAL source of truth is the backend verification response providing the URL.
  // This state is just for UI polish during the session.
  const [sessionUnlocked, setSessionUnlocked] = useState<number[]>([]);

  const handleGameComplete = () => {
    // If we passed a callback to the modal, we could update this.
    // However, the modal handles its own success state.
    // We could refetch to get updated status if the backend persisted user progress.
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="max-w-5xl mx-auto px-4 pt-8">
        {/* Hero Section */}
        <div className="text-center py-10 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-black text-foreground mb-4 leading-tight">
              Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Fun!</span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Solve quirky brain teasers to collect exclusive high-quality stickers for your chats. Warning: May cause giggles.
            </p>
          </motion.div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="font-display text-lg text-muted-foreground">Loading stickers...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20 px-4 bg-destructive/5 rounded-3xl border border-destructive/10">
            <h3 className="text-2xl font-bold text-destructive mb-2">Oops!</h3>
            <p className="text-muted-foreground">Couldn't load the sticker gallery.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
            {stickers?.map((sticker, index) => (
              <motion.div
                key={sticker.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <StickerCard
                  sticker={sticker}
                  onClick={() => setSelectedStickerId(sticker.id)}
                  unlocked={sessionUnlocked.includes(sticker.id)}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty State / Coming Soon */}
        {!isLoading && stickers?.length === 0 && (
          <div className="text-center py-20 opacity-50">
            <Zap className="w-16 h-16 mx-auto mb-4" />
            <p>No stickers available yet. Check back soon!</p>
          </div>
        )}
      </main>

      {/* Game Modal */}
      <GameModal 
        stickerId={selectedStickerId} 
        onClose={() => setSelectedStickerId(null)} 
      />
    </div>
  );
}
