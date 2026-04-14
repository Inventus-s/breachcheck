import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "BreachCheck",
  description: "Check if your password has been exposed in data breaches using privacy-safe methods.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable} theme-scrollbar-premium`}>
      <body className="bg-background text-on-surface font-body">
        {children}
      </body>
    </html>
  );
}
