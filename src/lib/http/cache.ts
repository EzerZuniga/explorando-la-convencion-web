/**
 * Module-level in-memory cache for client-side API calls.
 *
 * Persists across React renders and client-side navigations within the same
 * browser session, preventing redundant fetches for slowly-changing data
 * (weather, exchange rates, quotes).
 */

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

const _store = new Map<string, CacheEntry<unknown>>();

/**
 * Wraps an async fetcher with a TTL-based in-memory cache.
 *
 * @param key     Unique cache key
 * @param fetcher Async function that fetches the data
 * @param ttlMs   Time-to-live in milliseconds
 */
export function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number,
): Promise<T> {
  const entry = _store.get(key) as CacheEntry<T> | undefined;
  if (entry && Date.now() < entry.expiresAt) {
    return Promise.resolve(entry.data);
  }

  return fetcher().then((data) => {
    _store.set(key, { data, expiresAt: Date.now() + ttlMs });
    return data;
  });
}

/** Remove a specific entry from the cache (useful for manual invalidation). */
export function invalidateCache(key: string): void {
  _store.delete(key);
}
