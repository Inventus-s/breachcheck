"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    loadingText?: string;        // ← Custom loading text
    children: React.ReactNode;   // Normal text when not loading
    className?: string;
    px?: string;
    py?: string;
}

export default function Button({
    loading = false,
    loadingText = "Processing...",   // Default fallback
    children,
    className = "",
    disabled,
    px = '8',
    py = '5',
    ...props
}: ButtonProps) {
    return (
        <button
            disabled={disabled || loading}
            className={`
        bg-primary
        text-on-primary 
        ${`px-${px} py-${py}`}
        rounded-lg 
        font-bold 
        font-headline 
        hover:shadow-[0_0_20px_rgba(0,220,229,0.3)] 
        transition-all 
        active:scale-[0.985]
        disabled:opacity-70 
        disabled:cursor-not-allowed
        flex items-center justify-center gap-3 cursor-pointer
        ${className}
      `.trim()}
            {...props}
        >
            {loading ? (
                <>
                    <span className="animate-spin w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full" />
                    {loadingText}
                </>
            ) : (
                children
            )}
        </button>
    );
}