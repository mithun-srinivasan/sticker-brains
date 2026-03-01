import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type VerifyAnswerRequest } from "@shared/schema";

// GET /api/stickers/:id/game
export function useGameBySticker(stickerId: number) {
  return useQuery({
    queryKey: [api.games.getBySticker.path, stickerId],
    queryFn: async () => {
      const url = buildUrl(api.games.getBySticker.path, { id: stickerId });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch game");
      return api.games.getBySticker.responses[200].parse(await res.json());
    },
    enabled: !!stickerId,
  });
}

// POST /api/games/:id/verify
export function useVerifyAnswer(gameId: number) {
  return useMutation({
    mutationFn: async (data: VerifyAnswerRequest) => {
      const url = buildUrl(api.games.verify.path, { id: gameId });
      // Input validation happens in the UI or schema, but good to be type-safe here
      const validated = api.games.verify.input.parse(data);
      
      const res = await fetch(url, {
        method: api.games.verify.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to verify answer");
      return api.games.verify.responses[200].parse(await res.json());
    },
  });
}
