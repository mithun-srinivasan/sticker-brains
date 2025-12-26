import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type VerifyAnswerRequest } from "@shared/schema";

// GET /api/stickers
export function useStickers() {
  return useQuery({
    queryKey: [api.stickers.list.path],
    queryFn: async () => {
      const res = await fetch(api.stickers.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch stickers");
      return api.stickers.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/stickers/:id
export function useSticker(id: number) {
  return useQuery({
    queryKey: [api.stickers.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.stickers.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch sticker");
      return api.stickers.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
