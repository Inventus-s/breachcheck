"use client";

import React from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/comman/Icon";

interface SafeResultProps {
    onCheckAnother: () => void;
}

export default function SafeResult({ onCheckAnother }: SafeResultProps) {
    return (
        <main className="grow flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Decorative Glows - Smaller & Softer */}
            <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-primary/10 blur-[100px] rounded-full -z-10" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-tertiary/5 blur-[120px] rounded-full -z-10" />

            <div className="w-full max-w-3xl animate-fade-in">
                <div className="relative group">
                    {/* Outer Ambient Glow - Reduced intensity */}
                    <div className="absolute -inset-1 bg-linear-to-r from-emerald-500/20 to-cyan-500/20 blur-2xl opacity-70 group-hover:opacity-90 transition duration-700" />

                    {/* Main Success Card - More Compact */}
                    <div className="relative bg-surface-container-high rounded-2xl border-t border-white/5 p-8 md:p-10 overflow-hidden">
                        {/* Top Sheen */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-emerald-400/30 to-transparent" />

                        <div className="flex flex-col items-center text-center space-y-6">
                            {/* Smaller Icon */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full scale-125" />
                                <div className="relative w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30">
                                    <Icon
                                        name="shield"
                                        size={52}
                                        className="text-emerald-400"
                                    />
                                </div>
                            </div>

                            {/* Tighter Text Section */}
                            <div className="space-y-3 max-w-xl">
                                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-headline leading-tight">
                                    Password not found in breaches
                                </h1>
                                <p className="text-lg text-secondary leading-relaxed">
                                    This password does not appear in known leaked datasets.
                                    Your credential remains secure against historical breach databases.
                                </p>
                            </div>

                            {/* Compact Alert Box */}
                            <div className="bg-surface-container-lowest/60 rounded-xl px-5 py-4 flex items-start gap-3 border border-outline-variant/10 md:max-w-xl max-w-md">
                                <Icon name="info" size={20} className="text-tertiary mt-0.5 shrink-0" />
                                <span className="text-sm text-secondary text-left">
                                    Still consider using a password manager for unique secrets across services.
                                </span>
                            </div>

                            {/* CTA Button - Slightly Smaller */}
                            <div className="pt-2">
                                <Button
                                    onClick={onCheckAnother}
                                    className="px-8"
                                >
                                    Check another password
                                </Button>
                            </div>
                        </div>

                        {/* Subtle Decorative Grid - Smaller */}
                        <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
                            <svg height="140" width="140" viewBox="0 0 100 100">
                                <defs>
                                    <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                                        <path
                                            d="M 8 0 L 0 0 0 8"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="0.5"
                                        />
                                    </pattern>
                                </defs>
                                <rect width="100" height="100" fill="url(#grid)" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Compact Support Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                    <div className="md:col-span-2 bg-surface-container-low p-6 rounded-xl border-l-4 border-emerald-500/50">
                        <span className="uppercase tracking-widest text-emerald-400 font-bold text-xs mb-2 block">
                            Real-time Sentinel
                        </span>
                        <h3 className="text-lg font-bold text-white mb-2">Continuous Monitoring</h3>
                        <p className="text-secondary text-xs leading-relaxed">
                            We monitor data dumps 24/7. Monthly checks are recommended even if safe today.
                        </p>
                    </div>

                    <div className="bg-surface-container-low p-6 rounded-xl flex flex-col justify-center items-center text-center">
                        <Icon name="api" size={28} className="text-primary mb-3" />
                        <h3 className="text-base font-bold text-white">Secure API</h3>
                        <p className="text-secondary text-xs mt-1">
                            Integrate into your onboarding flow
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}