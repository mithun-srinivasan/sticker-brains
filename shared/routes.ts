import { z } from 'zod';
import { stickers, games } from './schema';

export const errorSchemas = {
  notFound: z.object({
    message: z.string(),
  }),
  validation: z.object({
    message: z.string(),
  }),
};

export const api = {
  stickers: {
    list: {
      method: 'GET' as const,
      path: '/api/stickers',
      responses: {
        200: z.array(z.custom<typeof stickers.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/stickers/:id',
      responses: {
        200: z.custom<typeof stickers.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },
  games: {
    getBySticker: {
      method: 'GET' as const,
      path: '/api/stickers/:id/game',
      responses: {
        200: z.custom<typeof games.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    verify: {
      method: 'POST' as const,
      path: '/api/games/:id/verify',
      input: z.object({ answer: z.string() }),
      responses: {
        200: z.object({ 
          correct: z.boolean(), 
          message: z.string(),
          stickerUrl: z.string().optional() 
        }),
        404: errorSchemas.notFound,
      },
    }
  },
  download: {
    sticker: {
      method: 'GET' as const,
      path: '/api/stickers/:id/download',
      responses: {
        200: z.string(), // Image binary data
        404: errorSchemas.notFound,
      },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
