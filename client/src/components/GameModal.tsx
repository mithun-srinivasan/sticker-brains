import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGameBySticker, useVerifyAnswer } from "@/hooks/use-games";
import { useSticker } from "@/hooks/use-stickers";
import { Loader2, HelpCircle, Trophy, AlertCircle, X, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

interface GameModalProps {
  stickerId: number | null;
  onClose: () => void;
}

export function GameModal({ stickerId, onClose }: GameModalProps) {
  const [answer, setAnswer] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{ message: string; stickerUrl?: string } | null>(null);

  const { data: sticker } = useSticker(stickerId || 0);
  const { data: game, isLoading, error } = useGameBySticker(stickerId || 0);
  const verifyMutation = useVerifyAnswer(game?.id || 0);

  // Reset state when modal opens/changes
  useEffect(() => {
    setAnswer("");
    setErrorMsg(null);
    setSuccessData(null);
  }, [stickerId]);

  if (!stickerId) return null;

  const handleSubmit = (submittedAnswer: string) => {
    if (!submittedAnswer.trim()) return;

    verifyMutation.mutate({ answer: submittedAnswer }, {
      onSuccess: (data) => {
        if (data.correct) {
          setSuccessData({ message: data.message, stickerUrl: data.stickerUrl });
          setErrorMsg(null);
          
          // Save to localStorage
          if (stickerId) {
            const saved = localStorage.getItem("unlockedStickers");
            const unlockedIds = saved ? JSON.parse(saved) : [];
            if (!unlockedIds.includes(stickerId)) {
              unlockedIds.push(stickerId);
              localStorage.setItem("unlockedStickers", JSON.stringify(unlockedIds));
            }
          }
          
          confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#a855f7', '#ec4899', '#facc15']
          });
        } else {
          setErrorMsg(data.message);
        }
      },
      onError: () => {
        setErrorMsg("Something went wrong. Try again!");
      }
    });
  };

  const isSuccess = !!successData;

  return (
    <Dialog open={!!stickerId} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-background border-none shadow-2xl rounded-3xl">
        <div className="relative">
          {/* Header Background */}
          <div className={`h-24 ${isSuccess ? 'bg-success/10' : 'bg-primary/10'} w-full absolute top-0 left-0 z-0`} />
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 z-10 rounded-full hover:bg-background/50"
            onClick={onClose}
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </Button>

          <div className="relative z-10 px-6 pt-8 pb-6">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 gap-4 text-muted-foreground">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p>Loading brain teaser...</p>
              </div>
            ) : error || !game ? (
              <div className="text-center py-8">
                <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
                <h3 className="text-lg font-bold">Oops! Failed to load game.</h3>
                <p className="text-muted-foreground text-sm mt-2">Try refreshing or come back later.</p>
              </div>
            ) : isSuccess ? (
              // SUCCESS STATE
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-success/10 animate-bounce">
                  <Trophy className="w-10 h-10 text-success" />
                </div>
                
                <h2 className="text-2xl font-display font-bold text-success mb-2">You Did It!</h2>
                <p className="text-muted-foreground mb-6">{successData.message}</p>

                {successData.stickerUrl && (
                  <div className="bg-gradient-to-br from-white to-primary/5 border border-border rounded-2xl p-8 mb-6 shadow-lg w-full">
                    <img 
                      src={successData.stickerUrl} 
                      alt="Unlocked Sticker" 
                      className="w-full h-48 object-contain drop-shadow-xl"
                    />
                  </div>
                )}

                <div className="flex gap-3 w-full">
                   <Button 
                    className="flex-1 rounded-xl font-bold bg-muted text-foreground hover:bg-muted/80"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                  {stickerId && (
                    <a 
                      href={`/api/stickers/${stickerId}/download`} 
                      download={`${sticker?.name || 'sticker'}.png`}
                      className="flex-1"
                    >
                      <Button className="w-full rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
                        Download Sticker
                      </Button>
                    </a>
                  )}
                </div>
              </motion.div>
            ) : (
              // GAME STATE
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transform -rotate-3 border-2 border-primary/20 shadow-sm">
                  <span className="text-3xl">🤔</span>
                </div>

                <div className="bg-primary/5 rounded-xl px-4 py-1 mb-6 border border-primary/10">
                  <p className="text-xs font-bold text-primary tracking-wide uppercase">
                    Unlocks: {sticker?.name}
                  </p>
                </div>

                <h2 className="text-xl font-bold font-display text-foreground mb-3 leading-tight">
                  {game.question}
                </h2>
                
                {game.hint && (
                  <p className="text-sm text-muted-foreground mb-6 italic bg-muted/50 px-3 py-1.5 rounded-lg border border-border/50">
                    💡 Hint: {game.hint}
                  </p>
                )}

                <div className="w-full mt-4 space-y-4">
                  {game.type === 'choice' && game.options ? (
                    <div className="grid grid-cols-1 gap-3">
                      {(Array.isArray(game.options) ? game.options : JSON.parse(game.options as any)).map((option: string) => (
                        <Button
                          key={option}
                          variant="outline"
                          className="h-auto py-4 px-6 rounded-xl border-2 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all text-lg font-medium justify-between group"
                          onClick={() => handleSubmit(option)}
                          disabled={verifyMutation.isPending}
                        >
                          {option}
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity text-primary">➜</span>
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(answer);
                      }}
                      className="flex flex-col gap-4"
                    >
                      <Input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Type your answer..."
                        className="text-center text-lg h-14 rounded-xl border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10"
                        autoFocus
                      />
                      <Button 
                        type="submit" 
                        disabled={!answer.trim() || verifyMutation.isPending}
                        className="h-12 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                      >
                        {verifyMutation.isPending ? (
                          <Loader2 className="animate-spin w-5 h-5" />
                        ) : "Submit Answer"}
                      </Button>
                    </form>
                  )}

                  <AnimatePresence>
                    {errorMsg && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg text-sm font-medium justify-center"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errorMsg}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
