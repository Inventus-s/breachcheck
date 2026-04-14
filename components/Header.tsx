import Link from "next/link";
import Button from "./ui/Button";

export default function Header() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex justify-between items-center w-full px-6 py-4 max-w-screen-2xl mx-auto">
                <div className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-cyan-600 font-headline">
                    BreachCheck
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="text-cyan-400 border-b-2 border-cyan-400 font-bold px-1 pb-1 font-headline">
                        Home
                    </Link>
                    <Link href="/api-docs" className="text-slate-400 font-medium px-1 font-headline hover:text-cyan-300">
                        API Docs
                    </Link>
                </div>
                <Button className="px-5 py-2.5" px="5" py="2.5">
                    View API
                </Button>
            </div>
        </nav>
    );
}