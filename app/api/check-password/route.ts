// src/app/api/check-password/route.ts

import { getCache, setCache } from "@/lib/cache";
import { checkRateLimit } from "@/lib/rateLimit";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for") || "unknown";

        // 🚦 Rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: "Too many requests" },
                { status: 429 }
            );
        }

        const { password } = await req.json();

        if (!password || password.length > 100) {
            return NextResponse.json(
                { error: "Invalid input" },
                { status: 400 }
            );
        }

        // 🔐 Hash
        const hash = crypto
            .createHash("sha1")
            .update(password)
            .digest("hex")
            .toUpperCase();

        const prefix = hash.slice(0, 5);
        const suffix = hash.slice(5);

        // ⚡ Cache check
        let data = getCache(prefix);

        if (!data) {
            const res = await fetch(
                `https://api.pwnedpasswords.com/range/${prefix}`
            );

            if (!res.ok) {
                throw new Error("HIBP failed");
            }

            data = await res.text();

            setCache(prefix, data); // store
        }

        const lines = data.split("\n");

        for (const line of lines) {
            const [hashSuffix, count] = line.split(":");

            if (hashSuffix === suffix) {
                return NextResponse.json({
                    found: true,
                    count: parseInt(count),
                });
            }
        }

        return NextResponse.json({
            found: false,
            count: 0,
        });
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}