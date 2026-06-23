"use client";

import React, { useState } from 'react';
import { authClient } from "@/lib/auth-client";

export default function WriterPricingPage() {
    const [loading, setLoading] = useState(false);
    
    // 👥 Better-Auth সেশন রিড করা
    const { data: session } = authClient.useSession();
    const user = session?.user;

    // 🔄 ফর্ম সাবমিট হলে লোডিং ট্রিগার করার ফাংশন
    const handleSubmit = () => {
        setLoading(true);
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center bg-[#030712] px-4 py-16 relative overflow-hidden selection:bg-[#E5BA73]/30 selection:text-[#E5BA73]">
            
            {/* 🌌 সাইবার-লাক্সারি ব্যাকগ্রাউন্ড আর্ট (অ্যাম্বিয়েন্ট গ্লো) */}
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-600/10 blur-[150px] rounded-full pointer-events-none"></div>
            
            {/* ফাইন লিনিয়ার গ্রিড ব্যাকগ্রাউন্ড ওভারলে */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"></div>

            <div className="relative z-10 max-w-xl w-full">
                
                {/* 🌟 প্রিমিয়াম গ্লাসカード কন্টেইনার */}
                <div className="relative bg-[#0B0F17]/70 backdrop-blur-xl border border-gray-800/40 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_-12px_rgba(229,186,115,0.1)] overflow-hidden group">
                    
                    {/* カードের উপরের সক্ষ্ম গোল্ডেন হাইলাইট লাইন */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    {/* 🎖️ ব্যাজ এবং অ্যানিমেশন ইফেক্ট */}
                    <div className="flex flex-col items-center text-center mb-10">
                        <div className="relative mb-6">
                            {/* গোল্ডেন পালস রিং */}
                            <div className="absolute inset-0 rounded-2xl bg-[#E5BA73]/20 blur-md animate-pulse"></div>
                            <div className="relative w-16 h-16 bg-gradient-to-br from-[#1E2640] to-[#0F1524] text-[#E5BA73] rounded-2xl flex items-center justify-center text-3xl border border-[#E5BA73]/30 shadow-xl">
                                ✒️
                            </div>
                        </div>
                        
                        <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#E5BA73] bg-[#E5BA73]/5 border border-[#E5BA73]/20 px-4 py-1.5 rounded-full shadow-inner">
                            Exclusive Creator Pass
                        </span>

                        <h1 className="text-3xl md:text-4xl font-serif font-black text-white tracking-wide mt-5 mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            Publish Without Limits.
                        </h1>
                        
                        <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-sm font-light">
                            Transform your passion into a secure revenue stream. Join Fable’s elite circle of verified authors today.
                        </p>
                    </div>

                    {/* 💳 লাক্সারি প্রাইসিং কার্ড */}
                    <div className="relative bg-gradient-to-br from-[#0F1524] to-[#070A10] border border-gray-800/60 rounded-2xl p-6 mb-10 text-center shadow-inner group-hover:border-[#E5BA73]/30 transition-all duration-500">
                        <div className="absolute top-3 right-3">
                            <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                                Save 50%
                            </span>
                        </div>
                        
                        <span className="block text-[10px] font-sans uppercase tracking-widest text-gray-500 font-bold mb-1.5">One-Time Activation</span>
                        <div className="flex items-baseline justify-center gap-2">
                            <span className="text-5xl font-sans font-black text-[#E5BA73] tracking-tight">$19.99</span>
                            <span className="text-sm text-gray-500 line-through font-medium">$39.99</span>
                        </div>
                        <p className="text-[11px] text-gray-400 font-light mt-3 flex items-center justify-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                            Lifetime publishing rights. Zero recurring renewals.
                        </p>
                    </div>

                    {/* 📋 ফিচারস গ্রিড (স্লীক ডিজাইন) */}
                    <div className="space-y-4 mb-10 px-2">
                        <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 border-b border-gray-800/60 pb-2">Included Amenities</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <span className="text-[#E5BA73] text-sm mt-0.5">✦</span>
                                <div className="text-xs">
                                    <p className="text-gray-200 font-medium">Unlimited Uploads</p>
                                    <p className="text-gray-500 text-[11px] mt-0.5 font-light">Publish endless digital ebooks</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                                <span className="text-[#E5BA73] text-sm mt-0.5">✦</span>
                                <div className="text-xs">
                                    <p className="text-gray-200 font-medium">Advanced Analytics</p>
                                    <p className="text-gray-500 text-[11px] mt-0.5 font-light">Interactive sales & reader charts</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-[#E5BA73] text-sm mt-0.5">✦</span>
                                <div className="text-xs">
                                    <p className="text-gray-200 font-medium">85% Royalties</p>
                                    <p className="text-gray-500 text-[11px] mt-0.5 font-light">Industry leading payouts directly to you</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <span className="text-[#E5BA73] text-sm mt-0.5">✦</span>
                                <div className="text-xs">
                                    <p className="text-gray-200 font-medium">Verified Status</p>
                                    <p className="text-gray-500 text-[11px] mt-0.5 font-light">Golden creator batch on library</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 🚀 মডার্ন আল্ট্রা-লাক্স বাটন */}
                    <form action="/api/subscription" method="POST" onSubmit={handleSubmit}>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative group/btn overflow-hidden bg-gradient-to-r from-[#E5BA73] to-[#C29B53] disabled:from-gray-800 disabled:to-gray-900 disabled:text-gray-500 disabled:cursor-not-allowed text-[#0E1420] font-sans font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(229,186,115,0.15)] hover:shadow-[0_4px_25px_rgba(229,186,115,0.3)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                        >
                            {/* বাটন শাইন ইফেক্ট */}
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-shine"></span>
                            
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <span className="w-4 h-4 border-2 border-[#0E1420] border-t-transparent rounded-full animate-spin"></span>
                                    <span>Redirecting to Stripe...</span>
                                </div>
                            ) : (
                                <>
                                    <span>Complete Setup & Authenticate</span>
                                    <span className="text-sm font-light transition-transform group-hover/btn:translate-x-1 duration-200">→</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* 🔒 সিকিউরিটি ফুটনোট */}
                    <div className="mt-6 flex items-center justify-center gap-6 text-[10px] text-gray-500 tracking-wider font-medium uppercase border-t border-gray-800/40 pt-5">
                        <span className="flex items-center gap-1.5">
                            <span className="text-[#E5BA73]">🛡️</span> Stripe Secure SSL
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                            <span className="text-[#E5BA73]">⚡</span> Instant Provisioning
                        </span>
                    </div>

                </div>
            </div>

            {/* শাইন অ্যানিমেশনের জন্য গ্লোবাল স্টাইল */}
            <style jsx global>{`
                @keyframes shine {
                    100% { transform: translateX(100%); }
                }
                .group-hover\/btn\:animate-shine:hover, 
                .group:hover .group-hover\/btn\:animate-shine {
                    animation: shine 0.8s ease-in-out;
                }
            `}</style>
        </div>
    );
}