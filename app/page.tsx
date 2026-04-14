"use client";

import Icon, { IconName } from "@/components/comman/Icon";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import { useState } from "react";

type ResultType = {
  found: boolean;
  count: number;
};

export default function Home() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheck = async () => {
    if (!password.trim()) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await fetch("/api/check-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept-encoding-x": process.env.API_KEY?.toString() || "", // Recommended: use NEXT_PUBLIC_ for client
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || "Request failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleCheck();
    }
  };

  return (
    <>
      <Header />

      <main className="relative pt-32 pb-24 overflow-hidden">
        {/* Background Ambient Glows */}
        <div className="absolute top-[-10%] right-[-10%] w-150 h-150 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-5%] w-125 h-125 bg-tertiary/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Hero Section */}
        <section className="max-w-4xl mx-auto px-6 text-center relative z-10">
          {/* Live Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-container border border-primary/20 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-tertiary">
              Live Breach Database Active
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tight mb-6 leading-tight text-on-surface">
            Check if your password has been{" "}
            <span className="text-gradient-cyan">exposed</span>
          </h1>

          <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Private, secure, and instant breach detection using k-anonymity. The
            Sentinel’s Veil ensures your actual credentials never leave your
            machine.
          </p>

          {/* Checker Input Card */}
          <div className="relative group max-w-2xl mx-auto">
            <div className="absolute -inset-0.5 bg-linear-to-r from-primary/30 to-tertiary/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
            <div className="relative bg-surface-container-high rounded-xl p-2 flex flex-col md:flex-row items-stretch gap-2">
              <div className="grow relative">
                <Icon name="lock" size={24} className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Enter your password to check security"
                  className="w-full bg-surface-container-lowest border-none focus:ring-1 focus:ring-primary/50 text-on-surface py-5 pl-12 pr-4 rounded-lg placeholder:text-outline-variant font-body"
                  disabled={loading}
                />
              </div>
              {/* <button
                onClick={handleCheck}
                disabled={loading || !password.trim()}
                className="bg-primary text-on-primary px-8 py-5 rounded-lg font-bold font-headline hover:shadow-[0_0_20px_rgba(0,220,229,0.3)] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Checking..." : "Check Password"}
              </button> */}
              <Button
                onClick={handleCheck}
                loading={loading}
                loadingText="Checking..."     // ← You control what shows during loading
                disabled={!password.trim()}
              >
                Check Password
              </Button>
            </div>
          </div>

          {/* Result Display */}
          <div className="mt-10 max-w-2xl mx-auto">
            {error && (
              <div className="bg-error-container text-error px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {loading && (
              <div className="text-secondary text-sm mt-4">
                Securely checking breach database...
              </div>
            )}

            {result && !loading && (
              <>
                {result.found ? (
                  <div className="bg-error-container border border-error/30 text-error px-6 py-5 rounded-xl text-left">
                    <p className="font-semibold text-lg mb-1">
                      ⚠ Password found in breaches
                    </p>
                    <p className="text-sm">
                      Seen{" "}
                      <span className="font-bold text-primary">
                        {result.count.toLocaleString()}
                      </span>{" "}
                      times in known data leaks.
                    </p>
                    <p className="text-xs mt-2 opacity-70">
                      This password is unsafe. Change it immediately.
                    </p>
                  </div>
                ) : (
                  <div className="bg-green-900/20 border border-green-500/20 text-green-400 px-6 py-5 rounded-xl text-left">
                    <p className="font-semibold text-lg mb-1">
                      ✅ Password not found
                    </p>
                    <p className="text-sm">
                      This password does not appear in known breach datasets.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Trust Pills */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="flex items-center space-x-2 text-secondary/60 text-sm font-label">
              <Icon name="shieldCheck" size={12} className="material-symbols-outlined text-xs" />
              <span className="uppercase tracking-widest">We never store your password</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary/60 text-sm font-label">
              <Icon name="shield" size={12} className="material-symbols-outlined text-xs" />
              <span className="uppercase tracking-widest">Only partial hash is sent</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary/60 text-sm font-label">
              <Icon name="key" size={12} className="material-symbols-outlined text-xs" />
              <span className="uppercase tracking-widest">End-to-end privacy</span>
            </div>
          </div>
        </section>

        {/* Why check for pwned passwords? */}
        <section className="max-w-7xl mx-auto px-6 mt-40">
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">
                Why check for pwned passwords?
              </h2>
              <p className="text-secondary text-lg mb-6 leading-relaxed">
                Password reuse is extremely common and puts your accounts at risk. When credentials are exposed in data breaches, attackers can use these known email and password combinations to access your other accounts.
              </p>
              <p className="text-secondary text-lg leading-relaxed">
                <a
                  href="#"
                  className="text-primary hover:underline font-semibold decoration-primary/30 underline-offset-4"
                >
                  NIST guidelines specifically recommend
                </a>{" "}
                checking user passwords against previously breached datasets. This service provides a simple, secure way to comply with these guidelines.
              </p>
            </div>

            <div className="w-full md:w-1/2">
              <div className="bg-surface-container-high border border-primary/10 rounded-xl p-8 shadow-2xl">
                <h3 className="text-xl font-headline font-bold mb-8">
                  The dangers of password reuse
                </h3>
                <div className="space-y-8">
                  {[
                    {
                      icon: "cloudLock",
                      title: "Credential Stuffing",
                      desc: "Attackers automate login attempts using leaked credentials from other sites, exploiting password reuse habits.",
                    },
                    {
                      icon: "database",
                      title: "Data Breaches",
                      desc: "Large-scale breaches expose millions of passwords, which are often used across multiple services.",
                    },
                    {
                      icon: "key",
                      title: "Password Patterns",
                      desc: "Even when users modify passwords between sites, attackers can easily predict common patterns.",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="mt-1 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon name={item.icon as IconName} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-secondary">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reliable Service Performance */}
        <section className="max-w-7xl mx-auto px-6 mt-40">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">
                verified_user
              </span>
              <h2 className="text-3xl md:text-4xl font-headline font-bold">
                Reliable Service Performance
              </h2>
            </div>
            <div className="h-1 w-24 bg-linear-to-r from-transparent via-primary to-transparent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { value: "18B+", label: "Monthly Requests" },
              { value: ">99.9%", label: "Cache Hit Ratio" },
              { value: "335", label: "Edge Locations" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-surface-container-low border border-outline-variant/10 p-8 rounded-xl text-center group hover:border-primary/30 transition-all"
              >
                <div className="text-4xl font-headline font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-secondary uppercase tracking-widest text-xs font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-2/5 p-10 md:p-14 border-r border-outline-variant/20">
              <h3 className="text-2xl font-headline font-bold mb-6">
                Globally Distributed Performance
              </h3>
              <div className="space-y-6 text-secondary leading-relaxed">
                <p>
                  Our password checking service handles{" "}
                  <span className="text-primary font-semibold">
                    over 18 billion requests monthly
                  </span>
                  , delivered through Cloudflare&apos;s global network for high
                  availability.
                </p>
                <p>
                  With a{" "}
                  <span className="text-primary font-semibold">
                    cache hit ratio over 99.9%
                  </span>
                  , the service provides lightning-fast responses regardless of
                  your location.
                </p>
                <p>
                  The service is delivered via{" "}
                  <span className="text-primary font-semibold">
                    335 edge locations
                  </span>{" "}
                  distributed across{" "}
                  <span className="text-primary font-semibold">125+ countries</span>
                  .
                </p>
              </div>
            </div>

            <div className="w-full md:w-3/5 relative min-h-100 flex items-center justify-center overflow-hidden">
              {/* Stylized World Map Placeholder */}
              <div className="world-map-svg-container">
                <img
                  alt="Stylized World Map"
                  className="world-map-base"
                  src="/CloudflareMap.svg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Technical Integrity / How It Works */}
        <section className="max-w-7xl mx-auto px-6 mt-40">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-4xl font-headline font-bold mb-2">
                Technical Integrity
              </h2>
              <p className="text-secondary max-w-md">
                Our multi-layered security protocol ensures zero-knowledge
                verification.
              </p>
            </div>
            <div className="h-px grow bg-outline-variant/20 mx-8 hidden md:block" />
            <span className="text-primary font-label text-xs tracking-[0.3em] uppercase">
              Architecture v2.4
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                icon: "terminal2",
                color: "primary",
                title: "Hashing Locally",
                desc: "Your password is immediately hashed using SHA-1 inside your browser. The raw text never touches our servers.",
              },
              {
                num: "02",
                icon: "sitemap",
                color: "tertiary",
                title: "Partial k-Anonymity",
                desc: "We only send the first 5 characters of the hash. This prefix matches thousands of passwords, making identification impossible.",
                highlight: true,
              },
              {
                num: "03",
                icon: "cloudDataConnection",
                color: "primary",
                title: "Cloud Comparison",
                desc: "Our engine retrieves all matching suffixes from the leak database and performs a client-side comparison for a final match.",
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`bg-surface-container-${step.highlight ? "high" : "low"} p-8 rounded-xl relative overflow-hidden group ${step.highlight ? "border-t border-primary/10 transform md:-translate-y-4 shadow-2xl" : ""}`}
              >
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <span className="text-8xl font-headline font-bold">
                    {step.num}
                  </span>
                </div>
                <div
                  className={`w-12 h-12 bg-${step.color}/10 rounded-lg flex items-center justify-center mb-6`}
                >
                  <Icon name={step.icon as IconName} className={`text-${step.color}`} /> {/* Fallback to custom icon if material symbol is not found */}
                </div>
                <h3 className="text-xl font-headline font-bold mb-4">
                  {step.title}
                </h3>
                <p className="text-secondary leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Security & Trust Section */}
        <section className="max-w-7xl mx-auto px-6 mt-40">
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <div className="w-full md:w-1/2 relative h-80 md:h-auto">
              <img
                alt="Cybersecurity Operations Center"
                className="w-full h-full object-cover grayscale opacity-60"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwsl_ok_VKfqq_0-gTBuOSTfVNYOmdXIduPOKea04IgK2fHtfrSThp9xV0S7HVUKaUQIah85hNxdTkyD6Iv17wfZZdIBFbLH91YnUF_OZ_OZ-L7hxdTpLqmvhcA8p7vbKIjFrNBHU9K8MEm81ejtmVHE2mh2fEnwhThqFKfc7gJnwXysnKQ0avvSym7cOdH7HO2lTRNZ4OXtQ2zWijgmFLSuVbVN7rAnSj-5YGjbVYdpG6HYDrNREdtB9lui3ey6L6RG5vc1TRTg"
              />
              <div className="absolute inset-0 bg-linear-to-r from-surface via-transparent to-transparent" />
            </div>
            <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
              <h2 className="text-3xl font-headline font-bold mb-6">
                The Sentinel’s Veil
              </h2>
              <p className="text-secondary mb-8 leading-relaxed">
                Security is not just a feature; it&apos;s our architectural
                foundation. LeakShield employs enterprise-grade k-anonymity
                protocols to ensure that even in the process of protecting you,
                your privacy is never compromised.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: "ISO 27001 Compliant",
                    desc: "Our data handling processes meet global security standards.",
                  },
                  {
                    title: "Open Source Verification",
                    desc: "Our client-side hashing scripts are available for public audit.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="check" size={12} className="text-primary text-xs" /> {/* Fallback to custom check icon */}
                    </div>
                    <div>
                      <p className="text-on-surface font-semibold">
                        {item.title}
                      </p>
                      <p className="text-sm text-secondary">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}