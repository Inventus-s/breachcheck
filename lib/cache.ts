// Simple in-memory cache (per server instance)

type CacheEntry = {
    data: string;
    expiry: number;
};

const cache = new Map<string, CacheEntry>();

const TTL = 1000 * 60 * 60; // 1 hour

export function getCache(key: string): string | null {
    const entry = cache.get(key);

    if (!entry) return null;

    if (Date.now() > entry.expiry) {
        cache.delete(key);
        return null;
    }

    return entry.data;
}

export function setCache(key: string, data: string) {
    cache.set(key, {
        data,
        expiry: Date.now() + TTL,
    });
}