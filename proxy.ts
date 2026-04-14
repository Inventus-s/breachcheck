import { NextResponse } from "next/server";

export function proxy(req: Request) {
    if (req.url.includes("/api-docs")) return;
    if (req.url.includes("/api")) {
        const apiKey = req.headers.get("accept-encoding-x"); // custom header for API key

        if (apiKey !== process.env.API_KEY) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
    }

    return NextResponse.next();
}