import { apiClient } from './client';
import { withCache } from './cache';
import type { QuoteData } from './types';

// Quotes are static content — refresh every 30 minutes
const QUOTE_TTL = 30 * 60 * 1000;

// DummyJSON Quotes API — Free, no API key needed, always available
export function getRandomQuote(): Promise<QuoteData> {
  return withCache(
    'quote:random',
    async () => {
      const data = await apiClient.get<{
        id: number;
        quote: string;
        author: string;
      }>('https://dummyjson.com/quotes/random');

      return {
        id: String(data.id),
        content: data.quote,
        author: data.author,
      };
    },
    QUOTE_TTL,
  );
}

export function getQuotesByTag(): Promise<QuoteData[]> {
  return withCache(
    'quotes:list',
    async () => {
      const data = await apiClient.get<{
        quotes: { id: number; quote: string; author: string }[];
      }>('https://dummyjson.com/quotes', { params: { limit: '5' } });

      return data.quotes.map((q) => ({
        id: String(q.id),
        content: q.quote,
        author: q.author,
      }));
    },
    QUOTE_TTL,
  );
}
