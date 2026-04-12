type RateEntry = {
    count: number;
    expiry: number;
};

const rateMap = new Map<string, RateEntry>();

const WINDOW = 60 * 1000; // 1 minute
const LIMIT = 10; // 10 requests per minute

export function checkRateLimit(ip: string): boolean {
    const now = Date.now();

    const entry = rateMap.get(ip);

    if (!entry || now > entry.expiry) {
        rateMap.set(ip, { count: 1, expiry: now + WINDOW });
        return true;
    }

    if (entry.count >= LIMIT) {
        return false;
    }

    entry.count += 1;
    return true;
}