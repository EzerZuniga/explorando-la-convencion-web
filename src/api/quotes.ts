import { apiClient } from './httpClient';
import type { QuoteData } from './types';

// DummyJSON Quotes API — Free, no API key needed, always available
export async function getRandomQuote(): Promise<QuoteData> {
  const data = await apiClient.get<{ id: number; quote: string; author: string }>(
    'https://dummyjson.com/quotes/random',
  );

  return {
    id: String(data.id),
    content: data.quote,
    author: data.author,
  };
}

export async function getQuotesByTag(): Promise<QuoteData[]> {
  const data = await apiClient.get<{ quotes: { id: number; quote: string; author: string }[] }>(
    'https://dummyjson.com/quotes',
    { params: { limit: '5' } },
  );
  return data.quotes.map((q) => ({
    id: String(q.id),
    content: q.quote,
    author: q.author,
  }));
}
