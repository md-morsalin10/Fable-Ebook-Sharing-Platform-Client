"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { createBookmark } from '@/lib/action/bookmark';

export default function EbookDetailsClient({ book: initialBook, isInitiallyBookmarked }) {
    const [book, setBook] = useState(initialBook); // স্ট্যাটাস লাইভ আপডেট করার জন্য স্টেট
    const [isBookmarked, setIsBookmarked] = useState(isInitiallyBookmarked);
    const [mounted, setMounted] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false); // পাবলিশ বাটনের লোডিং স্টেট
    
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const stripeFormRef = useRef(null);

    // কম্পোনেন্ট ব্রাউজারে মাউন্ট হওয়ার পর স্টেট ট্রু হবে
    useEffect(() => {
        setMounted(true);
    }, []);

    const currentBookId = book._id?.$oid || book._id;

    const isSold = book.status?.toLowerCase() === 'sold';
    const isWriter = user && user.email === book.writerEmail;
    const isBuyer = user && user.email === book.buyerEmail;

    // 🎯 মাউন্ট হওয়ার আগে সার্ভার ও ক্লায়েন্টকে একই স্টেট রাখতে হবে যাতে এরর না আসে
    const isContentUnlocked = mounted && (isWriter || isBuyer);

    const handleBookmarkToggle = async () => {
        if (!user) {
            window.location.href = `/login?redirect=/browse-ebooks/${currentBookId}`;
            return;
        }

        // 🔄 UI-তে সাথে সাথে স্টার বাটন টগল করে দেওয়া (Instant Feedback)
        setIsBookmarked(!isBookmarked);

        try {
            // 🚀 আপনার তৈরি করা সার্ভার অ্যাকশন কল
            await createBookmark({
                userId: user.id,
                bookId: currentBookId,
                title: book.title,
                coverImage: book.coverImage,
                price: book.price,
                genre: book.genre,
                writerName: book.writerName,
            });
        } catch (error) {
            console.error("Bookmark sync failed:", error);
            // যদি ব্যাকএন্ডে কোনো কারণে এরর হয়, তবে UI স্টেট আগের অবস্থায় ফিরিয়ে নেওয়া
            setIsBookmarked(isBookmarked);
        }
    };

    // 🚀 রাইটারের জন্য সরাসরি বুক ডিটেইলস পেজ থেকে পাবলিশ করার ফাংশন
    const handlePublishNow = async () => {
        if (isPublishing) return;
        
        setIsPublishing(true);
        try {
            // ব্যাকএন্ডের নতুন ইউনিভার্সাল এপিআই রুটটি কল করা হচ্ছে
            const response = await fetch(`/api/books/status/${currentBookId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status: "published" }),
            });

            const data = await response.json();

            if (response.ok) {
                // UI স্টেট আপডেট করে স্ট্যাটাস 'published' করে দেওয়া
                setBook(prev => ({ ...prev, status: "published" }));
                alert("🎉 Your ebook is now live for everyone to browse and buy!");
            } else {
                alert(data.message || "Failed to publish the book.");
            }
        } catch (error) {
            console.error("Error publishing book:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsPublishing(false);
        }
    };

    const handlePurchase = (e) => {
        if (e) e.preventDefault();
        if (!user) {
            window.location.href = `/login?redirect=/browse-ebooks/${currentBookId}`;
            return;
        }
        if (stripeFormRef.current) {
            stripeFormRef.current.submit();
        }
    };

    const formattedDate = new Date(book.dateUploaded).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="max-w-6xl mx-auto flex flex-col gap-12">

            {/* উপরের সেকশন: কভার এবং বিবরণ */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">

                {/* বাম পাশ: কভার ইমেজ */}
                <div className="md:col-span-4 flex flex-col gap-5">
                    <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-gray-950 border border-gray-800 shadow-2xl">
                        {book.coverImage && <Image src={book.coverImage} alt={book.title} fill className="object-cover" priority />}
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                        <div className="bg-[#0B0F17] border border-gray-800/60 rounded-xl p-3">
                            <span className="block text-[10px] uppercase text-gray-500 font-semibold">Length</span>
                            <span className="text-sm font-bold text-gray-200 mt-1 block">412 pp</span>
                        </div>
                        <div className="bg-[#0B0F17] border border-gray-800/60 rounded-xl p-3">
                            <span className="block text-[10px] uppercase text-gray-500 font-semibold">Language</span>
                            <span className="text-sm font-bold text-gray-200 mt-1 block">EN</span>
                        </div>
                    </div>
                </div>

                {/* ডান পাশ: বইয়ের ডিটেইলস */}
                <div className="md:col-span-8 flex flex-col">
                    <div className="mb-3">
                        <span className="text-[10px] px-2.5 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md font-bold uppercase">
                            {book.genre}
                        </span>
                    </div>

                    <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-wide mb-4">
                        {book.title}
                    </h1>

                    <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-800/60">
                        <p className="text-xs text-gray-400">
                            Written by <Link href={`/browse-ebooks?search=${book.writerName}`} className="font-bold text-[#E5BA73] hover:underline">{book.writerName}</Link>
                        </p>
                        {/* 🎯 ১. পরিমার্জিত স্ট্যাটাস ব্যাজ (Unpublished এর জন্য হলুদ কালার) */}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                            book.status?.toLowerCase() === 'sold'
                                ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                : book.status?.toLowerCase() === 'unpublished'
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                            {book.status}
                        </span>
                    </div>

                    <div className="mb-6">
                        <span className="text-3xl font-extrabold text-[#E5BA73]">${Number(book.price).toFixed(2)}</span>
                        <span className="text-[11px] text-gray-500 mt-1 block">Single-user digital license • DRM Free</span>
                    </div>

                    <div className="mb-8">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Synopsis / Preview</span>
                        <p className="text-sm text-gray-300 leading-relaxed font-light whitespace-pre-line">
                            {/* 🎯 হাইড্রেশন সেফ প্রিভিউ লজিক */}
                            {!mounted ? (
                                book.description && book.description.substring(0, 150) + "..."
                            ) : isContentUnlocked ? (
                                book.description
                            ) : (
                                book.description && book.description.length > 250
                                    ? book.description.slice(0, 250) + "..."
                                    : book.description
                            )}
                        </p>
                        <span className="text-[11px] text-gray-500 mt-3 block">Published: {formattedDate}</span>
                    </div>

                    {/* অ্যাকশন বাটন প্যানেল */}
                    <div className="flex flex-col sm:flex-row gap-4 max-w-xl w-full">
                        {!mounted ? (
                            <div className="flex-1 h-12 bg-gray-800/40 rounded-xl animate-pulse"></div>
                        ) : isWriter ? (
                            /* 🎯 ২. পরিমার্জিত রাইটার অ্যাকশন এরিয়া */
                            <div className="flex-1 flex flex-col sm:flex-row gap-3">
                                <button disabled className="flex-1 bg-gray-800 text-gray-500 cursor-not-allowed font-bold text-sm py-3 px-6 rounded-xl border border-gray-700/50">
                                    You Own This Ebook
                                </button>
                                {book.status?.toLowerCase() === "unpublished" && (
                                    <button 
                                        onClick={handlePublishNow} 
                                        disabled={isPublishing}
                                        className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-md whitespace-nowrap min-w-[140px]"
                                    >
                                        {isPublishing ? "Publishing..." : "Publish Live 🚀"}
                                    </button>
                                )}
                            </div>
                        ) : isBuyer ? (
                            <div className="flex-1 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 font-bold text-sm py-3 px-6 rounded-xl text-center flex items-center justify-center">
                                ✓ Already Purchased
                            </div>
                        ) : isSold ? (
                            <button disabled className="flex-1 bg-red-950/40 text-red-400 font-bold text-sm py-3 px-6 rounded-xl border border-red-900/50 cursor-not-allowed">
                                ✘ Sold Out
                            </button>
                        ) : (
                            <form ref={stripeFormRef} action="/api/payment" method="POST" onSubmit={handlePurchase} className="flex-1">
                                <input name="price" value={book.price || ''} type="hidden" />
                                <input name="title" value={book.title || ''} type="hidden" />
                                <input name="bookId" value={currentBookId || ''} type="hidden" />
                                <input name="writerId" value={book.writerId || ''} type="hidden" />
                                <input name="writerEmail" value={book.writerEmail || ''} type="hidden" />
                                <input name="writerName" value={book.writerName || ''} type="hidden" />
                                <input name="userName" value={user?.name || ''} type="hidden" />
                                <input name="userEmail" value={user?.email || ''} type="hidden" />
                                <input name="userId" value={user?.id || ''} type="hidden" />
                                <input name="coverImage" value={book.coverImage || ''} type="hidden" />

                                <button type="submit" className="w-full bg-[#E5BA73] hover:bg-[#d4ab63] text-[#0E1420] font-bold text-sm py-3 px-6 rounded-xl transition-all shadow-md">
                                    Buy Now
                                </button>
                            </form>
                        )}

                        <button onClick={handleBookmarkToggle} className={`px-6 py-3 border rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${isBookmarked ? 'bg-purple-500/10 text-purple-400 border-purple-500/40' : 'bg-[#0B0F17] text-gray-300 border-gray-800 hover:border-gray-700'}`}>
                            <span>{isBookmarked ? '★' : '☆'}</span>
                            {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                        </button>
                    </div>
                </div>
            </div>

            {/* নিচের সেকশন: ফুল কন্টেন্ট সেকশন (লক/আনলক লজিক) */}
            <div className="mt-6 border-t border-gray-800/60 pt-10">
                {isContentUnlocked ? (
                    <div className="bg-[#0B0F17] border border-emerald-500/20 rounded-2xl p-6 md:p-8 shadow-xl">
                        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800">
                            <span className="text-xl">📖</span>
                            <div>
                                <h2 className="text-lg font-bold text-white">Full Ebook Content Unlocked</h2>
                                <p className="text-xs text-emerald-400 font-medium">You have full access to this book materials.</p>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none text-gray-300 text-sm md:text-base leading-relaxed space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
                            <h4 className="text-lg font-bold text-[#E5BA73] mb-4">Complete Story / Detailed Text</h4>
                            <p className="whitespace-pre-line text-gray-200 font-light">{book.description}</p>
                            {book.fullContent && <p className="whitespace-pre-line mt-4 text-gray-200 font-light">{book.fullContent}</p>}
                        </div>
                    </div>
                ) : (
                    <div className="relative bg-[#0B0F17]/60 border border-gray-800/80 rounded-2xl p-12 text-center max-w-2xl mx-auto shadow-2xl">
                        <div className="w-12 h-12 bg-amber-500/10 text-[#E5BA73] rounded-full flex items-center justify-center text-xl mx-auto mb-4 border border-amber-500/20">🔒</div>
                        <h3 className="text-lg font-bold text-white tracking-wide">Content Locked</h3>
                        <p className="text-gray-400 text-xs md:text-sm mt-2 max-w-sm mx-auto leading-relaxed">
                            You are reading a limited preview of this ebook. {isSold ? "This ebook is already sold out." : "Purchase the book to unlock the remaining chapters and full detailed story."}
                        </p>
                        {!isSold && (
                            <button onClick={handlePurchase} className="mt-6 px-6 py-2.5 bg-[#E5BA73] hover:bg-[#d4ab63] text-[#0E1420] text-xs font-bold rounded-xl transition-all shadow-md uppercase">
                                Unlock Full Access
                            </button>
                        )}
                    </div>
                )}
            </div>

        </div>
    );
}