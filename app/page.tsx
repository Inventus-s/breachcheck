"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | { found: boolean; count: number }>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!password) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/check-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept-encoding-x": process.env.API_KEY?.toString() || "", // match backend
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="relative pt-32 pb-24 overflow-hidden">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-headline font-bold mb-6">
            Check if your password has been{" "}
            <span className="text-gradient-cyan">exposed</span>
          </h1>

          <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12">
            Private, secure, and instant breach detection using k-anonymity.
          </p>

          {/* Input */}
          <div className="bg-surface-container-high rounded-xl p-2 flex flex-col md:flex-row gap-2 max-w-2xl mx-auto">
            <input
              type="password"
              placeholder="Enter your password"
              className="grow bg-surface-container-lowest py-4 px-4 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={handleCheck}
              disabled={loading}
              className="bg-primary text-black px-6 py-4 rounded-lg font-bold disabled:opacity-50"
            >
              {loading ? "Checking..." : "Check Password"}
            </button>
          </div>

          {/* RESULT STATES */}
          <div className="mt-8">
            {error && (
              <p className="text-error">{error}</p>
            )}

            {result && !loading && (
              <>
                {result.found ? (
                  <div className="bg-error-container text-error p-4 rounded-lg">
                    ⚠ Password found {result.count} times in breaches
                  </div>
                ) : (
                  <div className="bg-green-900/30 text-green-400 p-4 rounded-lg">
                    ✅ Password not found in known breaches
                  </div>
                )}
              </>
            )}
          </div>

          {/* Trust */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-secondary">
            <span>✔ No password stored</span>
            <span>✔ Partial hash only</span>
            <span>✔ Privacy-first</span>
          </div>
        </section>

        {/* Why Section */}
        <section className="max-w-7xl mx-auto px-6 mt-32">
          <h2 className="text-3xl font-headline font-bold mb-6">
            Why check your password?
          </h2>

          <p className="text-secondary max-w-2xl">
            Password reuse makes your accounts vulnerable. If one site is
            breached, attackers can access others using the same credentials.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}