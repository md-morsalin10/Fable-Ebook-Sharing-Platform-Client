"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function EbookDetailsClient({ book }) {
    // 💡 Auth ও Purchase ট্র্যাকিং স্টেট
    const [user, setUser] = useState({ email: 'user@gmail.com', role: 'reader' }); 
    const [isAlreadyPurchased, setIsAlreadyPurchased] = useState(false); // টেস্ট করার জন্য true/false করে দেখতে পারেন
    const [isBookmarked, setIsBookmarked] = useState(false);

    const isSold = book.status?.toLowerCase() === 'sold';
    const isWriter = user && user.email === book.writerEmail;

    // 💳 Stripe Purchase Handler
    const handlePurchase = async () => {
        if (!user) {
            window.location.href = `/login?redirect=/browse-ebooks/${book._id?.$oid || book._id}`;
            return;
        }
        console.log("Redirecting to Stripe for:", book.title);
    };

    // 🔖 Bookmark Handler
    const handleBookmark = () => {
        if (!user) {
            window.location.href = `/login`;
            return;
        }
        setIsBookmarked(!isBookmarked);
    };

    const formattedDate = new Date(book.dateUploaded).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // ✂️ ডেসক্রিপশন ছোট করার লজিক (কেনার আগে অল্প দেখানোর জন্য)
    // বইয়ের ডেসক্রিপশন ২৫০ অক্ষরের বেশি হলে কেটে ছোট করবে এবং শেষে '...' যোগ করবে
    const shortDescription = book.description && book.description.length > 250 
        ? book.description.slice(0, 250) + "..." 
        : book.description;

    return (
        <div className="max-w-6xl mx-auto flex flex-col gap-12">
            
            {/* 📋 উপরের সেকশন: বইয়ের বিবরণ ও মেটাডেটা */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
                
                {/* বাম পাশ: কভার ইমেজ এবং মেটা বক্স */}
                <div className="md:col-span-4 flex flex-col gap-5">
                    <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gray-950 border border-gray-800 shadow-2xl">
                        <Image 
                            src={book.coverImage} 
                            alt={book.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-[#0B0F17] border border-gray-800/60 rounded-xl p-3 text-center">
                            <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Length</span>
                            <span className="text-sm font-bold text-gray-200 mt-1 block">412 pp</span>
                        </div>
                        <div className="bg-[#0B0F17] border border-gray-800/60 rounded-xl p-3 text-center">
                            <span className="block text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Language</span>
                            <span className="text-sm font-bold text-gray-200 mt-1 block">EN</span>
                        </div>
                    </div>
                </div>

                {/* ডান পাশ: মেইন বুক ডিটেইলস */}
                <div className="md:col-span-8 flex flex-col">
                    <div className="mb-3">
                        <span className="text-[10px] px-2.5 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md font-bold uppercase tracking-wider">
                            {book.genre}
                        </span>
                    </div>

                    <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-wide leading-tight mb-4">
                        {book.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 mb-6 pb-6 border-b border-gray-800/60">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">Written by</span>
                            <Link href={`/browse-ebooks?search=${book.writerName}`} className="text-xs font-bold text-[#E5BA73] hover:underline">
                                {book.writerName}
                            </Link>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">Status:</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide ${
                                isSold ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            }`}>
                                {book.status}
                            </span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <span className="text-3xl font-extrabold text-[#E5BA73]">${Number(book.price).toFixed(2)}</span>
                        <span className="text-[11px] text-gray-500 mt-1 block">Single-user digital license • DRM Free</span>
                    </div>

                    <div className="mb-8">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Synopsis / Preview</h3>
                        <p className="text-sm text-gray-300 leading-relaxed font-light whitespace-pre-line">
                            {/* 🎯 কন্ডিশনাল ডেসক্রিপশন: কেনা হয়ে গেলে উপরেও ফুল দেখতে পারবে, না কিনলে শুধু শর্ট প্রিভিউ দেখাবে */}
                            {isAlreadyPurchased || isWriter ? book.description : shortDescription}
                        </p>
                        <span className="text-[11px] text-gray-500 mt-3 block">Published: {formattedDate}</span>
                    </div>

                    {/* অ্যাকশন বাটন প্যানেল */}
                    <div className="flex flex-col sm:flex-row gap-4 max-w-xl">
                        {isAlreadyPurchased ? (
                            <div className="flex-1 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-bold text-sm py-3 px-6 rounded-xl text-center flex items-center justify-center gap-2">
                                ✓ Already Purchased
                            </div>
                        ) : isWriter ? (
                            <button disabled className="flex-1 bg-gray-800 text-gray-500 cursor-not-allowed font-bold text-sm py-3 px-6 rounded-xl border border-gray-700/50">
                                You Own This Ebook
                            </button>
                        ) : (
                            <button onClick={handlePurchase} disabled={isSold} className="flex-1 bg-[#E5BA73] hover:bg-[#d4ab63] disabled:bg-gray-800 disabled:text-gray-500 text-[#0E1420] font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-md">
                                {isSold ? "Sold Out" : "Buy Now"}
                            </button>
                        )}

                        <button onClick={handleBookmark} className={`px-6 py-3 border rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                            isBookmarked ? 'bg-purple-500/10 text-purple-400 border-purple-500/40' : 'bg-[#0B0F17] text-gray-300 border-gray-800 hover:border-gray-700'
                        }`}>
                            <span>{isBookmarked ? '★' : '☆'}</span>
                            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                        </button>
                    </div>
                </div>
            </div>

            {/* 🔒 নিচের সেকশন: পারচেজ কন্ডিশনের ওপর ভিত্তি করে কনটেন্ট চেঞ্জার */}
            <div className="mt-6 border-t border-gray-800/60 pt-10">
                {isAlreadyPurchased || isWriter ? (
                    /* 🔓 কেস ১: কেনা হয়ে গেছে বা ইউজার নিজেই লেখক -> ফুল কন্টেন্ট সেকশনে সম্পূর্ণ ডেসক্রিপশন আনলক */
                    <div className="bg-[#0B0F17] border border-emerald-500/20 rounded-2xl p-6 md:p-8 shadow-xl animate-fadeIn">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                            <span className="text-xl">📖</span>
                            <div>
                                <h2 className="text-lg font-bold text-white">Full Ebook Content Unlocked</h2>
                                <p className="text-xs text-emerald-400 font-medium">You have full access to this book materials.</p>
                            </div>
                        </div>
                        
                        {/* 📚 এখানে সম্পূর্ণ আনকাট পুরো ডেসক্রিপশন/কাহিনীটি রেন্ডার হবে */}
                        <div className="prose prose-invert max-w-none text-gray-300 text-sm md:text-base leading-relaxed space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                            <h4 className="text-lg font-bold text-[#E5BA73] mb-4">Complete Story / Detailed Text</h4>
                            <p className="whitespace-pre-line text-gray-200 font-light">
                                {book.description}
                            </p>
                            
                            {/* যদি আপনার কাছে ভবিষ্যতে "fullContent" থাকে তবে সেটিও এখানে নিচে চেইন করে দিতে পারেন */}
                            {book.fullContent && (
                                <p className="whitespace-pre-line mt-4">
                                    {book.fullContent}
                                </p>
                            )}
                        </div>
                    </div>
                ) : (
                    /* 🔒 কেস ২: কেনা হয়নি -> "Content Locked" গেট বক্স */
                    <div className="relative bg-[#0B0F17]/60 border border-gray-800/80 rounded-2xl p-12 text-center max-w-2xl mx-auto shadow-2xl overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0E1420]/20 backdrop-blur-[2px] pointer-events-none"></div>
                        
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-amber-500/10 text-[#E5BA73] rounded-full flex items-center justify-center text-xl mx-auto mb-4 border border-amber-500/20">
                                🔒
                            </div>
                            <h3 className="text-lg font-bold text-white tracking-wide">Content Locked</h3>
                            <p className="text-gray-400 text-xs md:text-sm mt-2 max-w-sm mx-auto leading-relaxed">
                                You are reading a limited preview of this ebook. Purchase the book to unlock the remaining chapters, full detailed story, and downloading assets.
                            </p>
                            
                            <button
                                onClick={handlePurchase}
                                disabled={isSold}
                                className="mt-6 px-6 py-2.5 bg-[#E5BA73] hover:bg-[#d4ab63] text-[#0E1420] text-xs font-bold rounded-xl transition-all shadow-md tracking-wide uppercase disabled:bg-gray-800 disabled:text-gray-500"
                            >
                                {isSold ? "Sold Out" : "Unlock Full Access"}
                            </button>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}