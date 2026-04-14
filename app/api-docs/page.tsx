"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Icon from "@/components/comman/Icon";
import { useState } from "react";

export default function ApiDocsPage() {
    const [activeTab, setActiveTab] = useState<"js" | "python">("js");
    const [testPrefix, setTestPrefix] = useState("21BD1");
    const [mockResponse, setMockResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleTest = async () => {
        if (!testPrefix || testPrefix.length !== 5) return;

        setIsLoading(true);
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 420));

        setMockResponse(`00111C0997A6C30331282645620C781E8C9:1
00112A0997A6C30331282645620C781E8C9:4
00114C0997A6C30331282645620C781E8C9:12
001150D328C67B665F292B289659CD0F549:1
001166EDF420215715975A6E9412F5CC64C:1
0011867160395D94D58145100BC91580E8E:3`);
        setIsLoading(false);
    };

    return (
        <>
            <Header />

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                {/* Hero Section */}
                <section className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-6xl font-bold tracking-tight mb-6 bg-linear-to-br from-on-surface to-outline bg-clip-text text-transparent">
                            BreachCheck API
                        </h1>
                        <p className="text-xl text-secondary max-w-xl leading-relaxed mb-8">
                            Check if passwords have been exposed in data breaches using k-anonymity. Our API ensures your users&apos;
                            actual passwords never leave their browser.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 bg-primary-container/30 text-primary px-4 py-2 rounded-full border border-primary/20">
                                <Icon name="shieldCheck" size={18} className="text-primary" />
                                <span className="text-xs font-label uppercase tracking-widest">K-Anonymity Protected</span>
                            </div>
                            <div className="flex items-center gap-2 bg-tertiary-container/30 text-tertiary px-4 py-2 rounded-full border border-tertiary/20">
                                <Icon name="bolt" size={18} className="text-tertiary" />
                                <span className="text-xs font-label uppercase tracking-widest">High Performance</span>
                            </div>
                        </div>
                    </div>

                    {/* API Endpoint Card */}
                    <div className="relative group">
                        <div className="absolute inset-0 bg-primary/10 blur-3xl group-hover:bg-primary/20 transition-all duration-500 rounded-full" />
                        <div className="relative p-8 rounded-xl border border-outline-variant/15 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xs font-label uppercase text-outline tracking-widest">Global Base URL</span>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                            </div>

                            <code className="text-primary-fixed-dim text-lg block bg-surface-container-lowest p-6 rounded-lg border border-primary/10 font-mono">
                                https://api.pwnedpasswords.com/range/&#123;first5hash&#125;
                            </code>

                            <div className="mt-6 flex items-center gap-4 text-secondary/60 text-sm">
                                <Icon name="info" size={18} />
                                <span>Authentication: No authentication required</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bento Grid Docs */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    {/* Endpoint Definition */}
                    <div className="md:col-span-8 rounded-xl p-8 border border-outline-variant/15">
                        <div className="flex items-center gap-3 mb-8">
                            <span className="bg-primary text-on-primary px-3 py-1 rounded-lg font-bold text-sm">GET</span>
                            <h2 className="text-2xl font-bold font-headline">/range/&#123;prefix&#125;</h2>
                        </div>
                        <p className="text-secondary mb-8">
                            Retrieves a list of SHA-1 hash suffixes that match the first 5 characters of a provided SHA-1 hash.
                        </p>

                        <div className="space-y-6">
                            {/* Parameters Table */}
                            <div>
                                <h3 className="text-sm font-label uppercase text-primary tracking-widest mb-4">Parameters</h3>
                                <div className="bg-surface-container-low rounded-lg overflow-hidden">
                                    <div className="grid grid-cols-4 p-4 border-b border-outline-variant/10 text-xs font-label text-outline uppercase">
                                        <span>Parameter</span>
                                        <span>Type</span>
                                        <span>Required</span>
                                        <span>Description</span>
                                    </div>
                                    <div className="grid grid-cols-4 p-4 text-sm items-center">
                                        <code className="text-tertiary">prefix</code>
                                        <span className="text-outline">string</span>
                                        <span className="text-outline">Yes</span>
                                        <span className="text-on-surface">The first 5 characters of SHA-1 password hash.</span>
                                    </div>
                                </div>
                            </div>

                            {/* Example Request */}
                            <div>
                                <h3 className="text-sm font-label uppercase text-primary tracking-widest mb-4">Example Request</h3>
                                <div className="bg-surface-container-lowest p-6 rounded-lg font-mono text-sm text-on-surface-variant">
                                    curl https://api.pwnedpasswords.com/range/21BD1
                                </div>
                            </div>

                            {/* Example Response */}
                            <div>
                                <h3 className="text-sm font-label uppercase text-primary tracking-widest mb-4">Example Response</h3>
                                <div className="bg-surface-container-lowest p-6 rounded-lg font-mono text-sm text-secondary leading-relaxed max-h-48 overflow-y-auto">
                                    00111C0997A6C30331282645620C781E8C9:1<br />
                                    00112A0997A6C30331282645620C781E8C9:4<br />
                                    00114C0997A6C30331282645620C781E8C9:12<br />
                                    001150D328C67B665F292B289659CD0F549:1
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security Notes */}
                    <div className="md:col-span-4 space-y-6">
                        <div className="rounded-xl p-8 border border-outline-variant/15 h-full relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <Icon name="shieldLock" size={120} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-bold font-headline mb-4">Security Standards</h3>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <Icon name="circleCheck" size={24} className="text-primary" />
                                    <div>
                                        <h4 className="font-bold text-sm">Client-side Hashing</h4>
                                        <p className="text-xs text-secondary mt-1">Plaintext passwords never travel across the network.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <Icon name="circleCheck" size={24} className="text-primary" />
                                    <div>
                                        <h4 className="font-bold text-sm">Mandatory HTTPS</h4>
                                        <p className="text-xs text-secondary mt-1">All traffic is encrypted via TLS 1.3 to prevent sniffing.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <Icon name="circleCheck" size={24} className="text-primary" />
                                    <div>
                                        <h4 className="font-bold text-sm">Zero Data Retention</h4>
                                        <p className="text-xs text-secondary mt-1">Queries are logged anonymously for rate-limiting only.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* How it works */}
                    <div className="md:col-span-12 rounded-xl p-8 border border-outline-variant/15">
                        <h3 className="text-2xl font-bold font-headline mb-8">How to use</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { step: "01", title: "Hash", desc: "Compute the SHA-1 hash of the password locally on the user's device." },
                                { step: "02", title: "Prefix", desc: 'Extract the first 5 characters (e.g., "21BD1") from the hash.' },
                                { step: "03", title: "Request", desc: "Send only the prefix to the API to receive all matching suffixes." },
                                { step: "04", title: "Compare", desc: "Locally check if your full hash suffix exists in the API response." },
                            ].map((item) => (
                                <div key={item.step} className="space-y-3">
                                    <span className="text-4xl font-headline font-bold text-primary/20">{item.step}</span>
                                    <h4 className="font-bold text-lg">{item.title}</h4>
                                    <p className="text-sm text-secondary leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Code Examples */}
                    <div className="md:col-span-7 bg-surface-container-high rounded-xl overflow-hidden border border-outline-variant/15">
                        <div className="flex border-b border-outline-variant/10">
                            <button
                                onClick={() => setActiveTab("js")}
                                className={`px-6 py-4 text-sm font-medium transition-colors cursor-pointer ${activeTab === "js"
                                    ? "border-b-2 border-primary text-primary font-bold"
                                    : "text-outline hover:text-on-surface"
                                    }`}
                            >
                                JavaScript
                            </button>
                            <button
                                onClick={() => setActiveTab("python")}
                                className={`px-6 py-4 text-sm font-medium transition-colors cursor-pointer ${activeTab === "python"
                                    ? "border-b-2 border-primary text-primary font-bold"
                                    : "text-outline hover:text-on-surface"
                                    }`}
                            >
                                Python
                            </button>
                        </div>

                        <div className="p-6 bg-surface-container-lowest h-105 theme-scrollbar-premium overflow-auto font-mono text-xs md:text-sm text-cyan-300 leading-relaxed">
                            {activeTab === "js" ? (
                                <pre>
                                    <span className="text-purple-400">async function</span>{" "}
                                    <span className="text-yellow-300">checkPassword</span>(password: string) &#123;
                                    <br />
                                    &nbsp;&nbsp;<span className="text-slate-500">// 1. Compute SHA-1 hash locally</span>
                                    <br />
                                    &nbsp;&nbsp;<span className="text-purple-400">const</span> msgBuffer ={" "}
                                    <span className="text-purple-400">new</span> <span className="text-yellow-300">TextEncoder</span>().encode(password);
                                    <br />
                                    &nbsp;&nbsp;<span className="text-purple-400">const</span> hashBuffer ={" "}
                                    <span className="text-purple-400">await</span> crypto.subtle.digest(<span className="text-emerald-400">&apos;SHA-1&apos;</span>, msgBuffer);
                                    <br />
                                    &nbsp;&nbsp;<span className="text-purple-400">const</span> hashArray ={" "}
                                    <span className="text-yellow-300">Array</span>.from(<span className="text-purple-400">new</span>{" "}
                                    <span className="text-yellow-300">Uint8Array</span>(hashBuffer));
                                    <br />
                                    &nbsp;&nbsp;<span className="text-purple-400">const</span> hashHex = hashArray
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;.map((b) =&gt; b.toString(16).padStart(2, &quot;0&quot;))
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;.join(&quot;&quot;).toUpperCase();
                                    <br />
                                    <br />
                                    &nbsp;&nbsp;<span className="text-purple-400">const</span> prefix = hashHex.slice(0, 5);
                                    <br />
                                    &nbsp;&nbsp;<span className="text-purple-400">const</span> suffix = hashHex.slice(5);
                                    <br />
                                    <br />
                                    &nbsp;&nbsp;<span className="text-slate-500">// 2. Call API with only prefix</span>
                                    <br />
                                    &nbsp;&nbsp;<span className="text-purple-400">const</span> response ={" "}
                                    <span className="text-purple-400">await</span> <span className="text-yellow-300">fetch</span>(
                                    <span className="text-emerald-400">`https://api.pwnedpasswords.com/range/${`{prefix}`}`</span>);
                                    <br />
                                    &nbsp;&nbsp;<span className="text-purple-400">const</span> data ={" "}
                                    <span className="text-purple-400">await</span> response.text();
                                    <br />
                                    <br />
                                    &nbsp;&nbsp;<span className="text-slate-500">// 3. Compare locally</span>
                                    <br />
                                    &nbsp;&nbsp;<span className="text-purple-400">const</span> match = data.split(<span className="text-emerald-400">&quot;\n&quot;</span>)
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;.find((line) =&gt; line.startsWith(suffix));
                                    <br />
                                    &nbsp;&nbsp;<span className="text-purple-400">return</span> match ? parseInt(match.split(<span className="text-emerald-400">&quot;:&quot;</span>)[1]) : 0;
                                    <br />
                                    &#125;
                                </pre>
                            ) : (
                                <pre>
                                    <span className="text-purple-400">import</span> hashlib
                                    <br />
                                    <span className="text-purple-400">import</span> requests
                                    <br />
                                    <br />
                                    <span className="text-purple-400">def</span>{" "}
                                    <span className="text-yellow-300">check_password</span>(password: str) -&gt; int:
                                    <br />
                                    &nbsp;&nbsp;<span className="text-slate-500"># 1. Compute SHA-1 hash locally</span>
                                    <br />
                                    &nbsp;&nbsp;sha1 = hashlib.sha1(password.encode(&quot;utf-8&quot;))
                                    <br />
                                    &nbsp;&nbsp;hash_hex = sha1.hexdigest().upper()
                                    <br />
                                    <br />
                                    &nbsp;&nbsp;<span className="text-slate-500"># 2. Take only first 5 characters (prefix)</span>
                                    <br />
                                    &nbsp;&nbsp;prefix = hash_hex[:5]
                                    <br />
                                    &nbsp;&nbsp;suffix = hash_hex[5:]
                                    <br />
                                    <br />
                                    &nbsp;&nbsp;<span className="text-slate-500"># 3. Call API with prefix only</span>
                                    <br />
                                    &nbsp;&nbsp;url = f&quot;https://api.pwnedpasswords.com/range/&#123;prefix&#125;&quot;
                                    <br />
                                    &nbsp;&nbsp;response = requests.get(url)
                                    <br />
                                    &nbsp;&nbsp;response.raise_for_status()
                                    <br />
                                    <br />
                                    &nbsp;&nbsp;<span className="text-slate-500"># 4. Compare locally</span>
                                    <br />
                                    &nbsp;&nbsp;<span className="text-purple-400">for</span> line <span className="text-purple-400">in</span> response.text.splitlines():
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">if</span> line.startswith(suffix):
                                    <br />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400">return</span> <span className="text-purple-400">int</span>(line.split(&quot;:&quot;)[1])
                                    <br />
                                    &nbsp;&nbsp;<span className="text-purple-400">return</span> 0
                                </pre>
                            )}
                        </div>
                    </div>

                    {/* Interactive Sandbox */}
                    <div className="md:col-span-5 rounded-xl p-8 border border-outline-variant/15 flex flex-col">
                        <h3 className="text-xl font-bold font-headline mb-2">Interactive Sandbox</h3>
                        <p className="text-xs text-secondary mb-6">Test the k-anonymity logic in real-time.</p>

                        <div className="grow space-y-6">
                            {/* Test Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-label uppercase text-outline tracking-wider">Test Prefix (5 chars)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={testPrefix}
                                        onChange={(e) => setTestPrefix(e.target.value.toUpperCase().slice(0, 5))}
                                        className="w-full bg-surface-container-lowest border-none rounded-lg p-4 text-primary font-mono focus:ring-1 focus:ring-primary"
                                        placeholder="21BD1"
                                        maxLength={5}
                                    />
                                    <button
                                        onClick={handleTest}
                                        disabled={isLoading} 
                                        className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-primary/10 text-primary p-2 rounded-lg hover:bg-primary/20 transition-all disabled:opacity-50"
                                    >
                                        <Icon name="send2" size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Response Preview */}
                            <div className="space-y-2 grow">
                                <label className="text-[10px] font-label uppercase text-outline tracking-wider">API Response Preview</label>
                                <div className="bg-surface-container-lowest rounded-lg p-4 font-mono text-[10px] text-secondary h-48 overflow-y-auto border border-outline-variant/5 whitespace-pre">
                                    {isLoading
                                        ? "Fetching..."
                                        : mockResponse
                                            ? mockResponse
                                            : `00111C0997A6C30331282645620C781E8C9:1
00112A0997A6C30331282645620C781E8C9:4
00114C0997A6C30331282645620C781E8C9:12
001150D328C67B665F292B289659CD0F549:1`}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-outline-variant/10 flex items-center justify-between text-xs">
                            <span className="text-secondary/50">Status: 200 OK</span>
                            <span className="text-primary font-bold">Latency: {isLoading ? "..." : "42ms"}</span>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}