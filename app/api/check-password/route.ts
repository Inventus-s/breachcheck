import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const password = body.password;

        if (!password) {
            return NextResponse.json(
                { error: "Password is required" },
                { status: 400 }
            );
        }

        // Step 1: SHA-1 hash
        const hash = crypto
            .createHash("sha1")
            .update(password)
            .digest("hex")
            .toUpperCase();

        const prefix = hash.slice(0, 5);
        const suffix = hash.slice(5);

        // Step 2: Call HIBP API
        const res = await fetch(
            `https://api.pwnedpasswords.com/range/${prefix}`
        );

        if (!res.ok) {
            return NextResponse.json(
                { error: "HIBP API failed" },
                { status: 500 }
            );
        }

        const data = await res.text();
        const lines = data.split("\n");

        // Step 3: Match suffix
        for (const line of lines) {
            const [hashSuffix, count] = line.split(":");

            if (hashSuffix === suffix) {
                return NextResponse.json({
                    found: true,
                    count: parseInt(count),
                });
            }
        }

        // Not found
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