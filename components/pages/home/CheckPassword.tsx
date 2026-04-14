import Icon from "@/components/comman/Icon"
import Button from "@/components/ui/Button"

function CheckPassword({ password, setPassword, loading, handleCheck, handleKeyDown }: { password: string; setPassword: (password: string) => void; loading: boolean; handleCheck: () => void; handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void }) {
    return (
        <>
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
                    <Button
                        onClick={handleCheck}
                        loading={loading}
                        loadingText="Checking..."     // ← You control what shows during loading
                        disabled={!password.trim()}
                        className="px-8"
                    >
                        Check Password
                    </Button>
                </div>
            </div>
        </>
    )
}

export default CheckPassword