export default function Footer() {
    return (
        <footer className="bg-slate-950 w-full py-12 mt-auto border-t border-slate-800/30">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <div className="font-headline font-bold text-slate-200 text-xl mb-4">
                        BreachCheck
                    </div>
                    <p className="font-body text-sm text-slate-400">
                        © {new Date().getFullYear()} BreachCheck. Privacy-first password security.
                    </p>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-4 md:justify-end">
                    <a className="text-sm text-slate-500 hover:text-cyan-400">Privacy</a>
                    <a className="text-sm text-slate-500 hover:text-cyan-400">Terms</a>
                    <a className="text-sm text-slate-500 hover:text-cyan-400">Security</a>
                    <a className="text-sm text-slate-500 hover:text-cyan-400">API Status</a>
                </div>
            </div>
        </footer>
    );
}