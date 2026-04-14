"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./ui/Button";
import Icon from "./comman/Icon";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/api-docs", label: "API Docs" },
];

export default function Header() {
    const pathname = usePathname();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-cyan-600 font-headline">
                        BreachCheck
                    </div>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`font-headline px-1 pb-1 transition-all duration-200 relative
                  ${isActive
                                        ? "text-cyan-400 font-bold border-b-2 border-cyan-400"
                                        : "text-slate-400 hover:text-cyan-300"
                                    }`}
                            >
                                {link.label}
                                {/* Optional underline animation for non-active links */}
                                {!isActive && (
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* CTA Button */}
                <Button
                    onClick={() => window.open("/api-docs", "_self")}
                    className="px-5 py-2.5" px="5" py="2.5"
                >
                    View API
                </Button>
            </div>
        </nav>
    );
}