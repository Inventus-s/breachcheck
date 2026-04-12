// components/icons/Icon.tsx
import React from "react";

type IconName = keyof typeof icons;

// All your SVGs will be stored here
const icons = {
    lock: (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-lock">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6" />
            <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
            <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
        </svg>
    ),

    shieldCheck: (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shield-check">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" />
            <path d="M15 19l2 2l4 -4" />
        </svg>
    ),
    shield: (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-shield">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
        </svg>
    ),
} as const;

interface IconProps {
    name: IconName;
    size?: number | string;
    className?: string;
    color?: string;
}

export default function Icon({ name, size = 24, className = "", color }: IconProps) {
    const icon = icons[name];

    if (!icon) {
        console.warn(`Icon "${name}" not found`);
        return null;
    }

    return React.cloneElement(icon, {
        width: size,
        height: size,
        className: `inline-block ${className}`,
        style: color ? { color } : undefined,
        "aria-hidden": true,
    });
}