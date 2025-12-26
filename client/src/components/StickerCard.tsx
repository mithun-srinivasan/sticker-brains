import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import type { Sticker } from "@shared/schema";

interface StickerCardProps {
  sticker: Sticker;
  onClick: () => void;
  unlocked?: boolean;
}

export function StickerCard({ sticker, onClick, unlocked = false }: StickerCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="cursor-pointer group relative"
      onClick={onClick}
    >
      <div className={`
        relative aspect-square rounded-3xl overflow-hidden
        bg-card border-2 border-border shadow-sm
        group-hover:shadow-xl group-hover:border-primary/30 group-hover:shadow-primary/10
        transition-all duration-300 ease-out
        ${unlocked ? "box-shadow-pop border-primary" : ""}
      `}>
        {/* Image */}
        <div className={`w-full h-full p-6 flex items-center justify-center transition-all duration-500 ${!unlocked ? 'grayscale opacity-60 bg-muted/30' : 'bg-gradient-to-br from-white to-primary/5'}`}>
          <img 
            src={sticker.imageUrl} 
            alt={sticker.name}
            className={`w-full h-full object-contain drop-shadow-lg transition-transform duration-500 ${unlocked ? 'group-hover:scale-110 group-hover:rotate-3' : 'scale-90'}`}
          />
        </div>

        {/* Lock Overlay */}
        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 backdrop-blur-[2px] transition-colors group-hover:bg-black/0">
            <div className="w-12 h-12 bg-background rounded-full flex items-center justify-center shadow-lg border-2 border-border group-hover:scale-110 transition-transform">
              <Lock className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-[10px] uppercase font-bold tracking-wider bg-background/90 backdrop-blur border border-border/50 rounded-lg text-foreground/70 shadow-sm">
            {sticker.category}
          </span>
        </div>
      </div>

      <div className="mt-3 text-center">
        <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors">
          {sticker.name}
        </h3>
      </div>
    </motion.div>
  );
}
