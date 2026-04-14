"use client";

import React from "react";
import Button from "@/components/ui/Button";
import Icon from "@/components/comman/Icon";

interface CompromisedResultProps {
    count: number;
    onCheckAnother: () => void;
    onGeneratePassword?: () => void;
}

export default function CompromisedResult({
    count,
    onCheckAnother,
    onGeneratePassword,
}: CompromisedResultProps) {
    return (
        <main className="grow flex items-center justify-center relative overflow-hidden">
            <div className="max-w-4xl w-full z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                    {/* Status Indicator */}
                    <div className="lg:col-span-4 flex flex-col justify-between gap-6">
                        {/* Urgent Status Card */}
                        <div className="bg-surface-container-high p-8 rounded-xl border border-error/20 flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-full bg-error-container/30 flex items-center justify-center mb-6 border border-error/30">
                                <Icon name="alertTriangle" size={52} className="text-error" />
                            </div>
                            <div className="uppercase tracking-[0.2em] text-xs font-bold text-error mb-2">STATUS</div>
                            <div className="text-3xl font-headline font-bold text-on-surface tracking-tight">COMPROMISED</div>
                        </div>

                        {/* AI Sentinel Note */}
                        <div className="bg-surface-container-low p-6 rounded-xl border-l-2 border-tertiary/40">
                            <Icon name="brain" size={28} className="text-tertiary mb-3" />
                            <p className="text-sm text-secondary leading-relaxed">
                                Our AI sentinel detected this password in multiple historical global breaches.
                                This credential is now public knowledge.
                            </p>
                        </div>
                    </div>

                    {/* Main Alert Details */}
                    <div className="lg:col-span-8 bg-surface-container-highest rounded-xl p-1 shadow-2xl bg-linear-to-br from-error/10 to-transparent">
                        <div className="bg-surface-container-highest rounded-[11px] p-8 md:p-10 h-full flex flex-col">
                            <header className="mb-8">
                                <h1 className="text-3xl md:text-4xl font-headline font-bold text-on-surface leading-tight mb-4 text-left">
                                    Password found in data breaches
                                </h1>
                                <div className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-error animate-pulse" />
                                    <span className="text-error font-medium uppercase tracking-widest text-xs">
                                        High Priority Threat
                                    </span>
                                </div>
                            </header>

                            <div className="flex flex-col md:flex-row gap-8 mb-10">
                                {/* Breach Count */}
                                <div className="flex-1 border-r border-outline-variant/20 pr-8">
                                    <div className="text-5xl md:text-6xl font-headline font-bold text-error mb-1 tracking-tighter">
                                        {count.toLocaleString()}
                                    </div>
                                    <div className="text-sm uppercase tracking-widest text-secondary font-medium">
                                        Times seen in breaches
                                    </div>
                                </div>

                                {/* Warning Message */}
                                <div className="flex-[1.5] flex items-center">
                                    <p className="text-lg text-on-surface-variant italic leading-snug">
                                        "This password is unsafe and should not be used in any environment."
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-auto flex flex-col sm:flex-row gap-4">
                                <Button
                                    onClick={onGeneratePassword}
                                    className="px-3 py-2"
                                    py="3"
                                >
                                    {/* <Icon name="lock_reset" size={20} className="mr-2" /> */}
                                    Generate Strong Password
                                </Button>

                                <Button
                                    onClick={onCheckAnother}      // We'll add this variant in Button later if needed
                                    className="px-3 py-2"
                                    py="3"
                                >
                                    {/* <Icon name="search" size={20} className="mr-2" /> */}
                                    Check another password
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}