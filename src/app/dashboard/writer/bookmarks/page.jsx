import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getBookmarksByUserId } from '@/lib/api/bookmark';
import { getUserSeason } from '@/lib/core/Session';

const WriterBookmarksPage = async () => {
    // ১. কারেন্ট ইউজারের সেশন চেক করা
    const user = await getUserSeason();

    // 🔒 ইউজার যদি লগইন না থাকে, তবে সিকিউরিটি গার্ড ইন্টারফেস দেখাবে
    if (!user) {
        return (
            <div className="min-h-[70vh] bg-[#060913] text-gray-100 flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 bg-amber-500/10 text-[#E5BA73] rounded-full flex items-center justify-center text-2xl mb-4 border border-amber-500/20">
                    🔒
                </div>
                <h1 className="text-xl font-bold tracking-wide">Access Denied</h1>
                <p className="text-gray-400 text-sm mt-2 text-center max-w-sm leading-relaxed">
                    Please log in to view your bookmarked ebooks and saved items.
                </p>
                <Link href="/login" className="mt-6 px-6 py-2.5 bg-[#E5BA73] hover:bg-[#d4ab63] text-[#0E1420] text-xs font-bold rounded-xl transition-all shadow-md uppercase tracking-wider">
                    Log In Now
                </Link>
            </div>
        );
    }

    // ২. ডাটাবেজ থেকে বুকমার্ক ডাটা ফেচ করা
    const booksBookmarksData = (await getBookmarksByUserId(user.id)) || [];

    return (
        <div className="min-h-screen bg-[#060913] text-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* 🏷️ পেজ হেডার */}
                <div className="mb-10 pb-5 border-b border-gray-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide text-white flex items-center gap-2">
                            <span className="text-[#E5BA73]">★</span> Writer Bookmarks
                        </h1>
                        <p className="text-xs md:text-sm text-gray-400 mt-1">
                            Your saved collection of reference materials, research books, or inspiring ebooks.
                        </p>
                    </div>
                    <div className="bg-[#0B0F17] px-4 py-2 rounded-xl border border-gray-800 text-xs font-semibold text-gray-300">
                        Total Saved: <span className="text-[#E5BA73] font-bold">{booksBookmarksData.length}</span>
                    </div>
                </div>

                {/* ❌ ফাঁকা স্টেট (যদি কোনো বুকমার্ক না থাকে) */}
                {booksBookmarksData.length === 0 ? (
                    <div className="relative bg-[#0B0F17]/60 border border-gray-800/80 rounded-2xl p-16 text-center max-w-xl mx-auto shadow-2xl mt-12">
                        <div className="w-14 h-14 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border border-purple-500/20">
                            ☆
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-wide">No Bookmarks Found</h3>
                        <p className="text-gray-400 text-xs md:text-sm mt-2 max-w-xs mx-auto leading-relaxed">
                            You haven't bookmarked any ebooks yet as a writer. Explore the library to save materials!
                        </p>
                        <Link href="/browse-ebooks" className="mt-6 inline-block px-6 py-2.5 bg-[#E5BA73] hover:bg-[#d4ab63] text-[#0E1420] text-xs font-bold rounded-xl transition-all shadow-md uppercase tracking-wider">
                            Browse Ebooks
                        </Link>
                    </div>
                ) : (
                    
                    /* 📚 বুকমার্কড বুকস গ্যালারি গ্রিড */
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                        {booksBookmarksData.map((bookmark) => {
                            // আইডি অবজেক্ট বা নরমাল স্ট্রিং সেফলি হ্যান্ডেল করা
                            const currentBookId = bookmark.bookId?.$oid || bookmark.bookId || '';
                            const uniqueKey = bookmark._id?.$oid || bookmark._id;
                            
                            return (
                                <div 
                                    key={uniqueKey}
                                    className="group relative bg-[#0B0F17] border border-gray-800/70 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full"
                                >
                                    {/* কভার ইমেজ সেকশন (হোভার স্কেলিং ইফেক্ট) */}
                                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-950">
                                        {bookmark.coverImage ? (
                                            <Image 
                                                src={bookmark.coverImage} 
                                                alt={bookmark.title || "Ebook Cover"} 
                                                fill 
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                                sizes="(max-w-7xl) 25vw"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-600">No Cover</div>
                                        )}
                                        
                                        {/* জেনার ব্যাজ */}
                                        {bookmark.genre && (
                                            <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-purple-500/20 text-purple-300 backdrop-blur-md rounded border border-purple-500/30">
                                                {bookmark.genre}
                                            </span>
                                        )}
                                    </div>

                                    {/* কন্টেন্ট/ডিটেইলস সেকশন */}
                                    <div className="p-4 flex flex-col flex-grow">
                                        <h3 className="text-sm md:text-base font-bold text-white line-clamp-1 group-hover:text-[#E5BA73] transition-colors">
                                            {bookmark.title}
                                        </h3>
                                        <p className="text-[11px] text-gray-400 mt-1">
                                            by <span className="text-gray-300 font-medium">{bookmark.writerName || "Unknown"}</span>
                                        </p>

                                        {/* দাম এবং অ্যাকশন বাটন */}
                                        <div className="mt-4 pt-3 border-t border-gray-800/60 flex items-center justify-between gap-2">
                                            <div>
                                                <span className="block text-[9px] uppercase text-gray-500 font-semibold tracking-wider">Price</span>
                                                <span className="text-sm md:text-base font-extrabold text-[#E5BA73]">
                                                    ${Number(bookmark.price || 0).toFixed(2)}
                                                </span>
                                            </div>
                                            
                                            <Link 
                                                href={`/browse-ebooks/${currentBookId}`} 
                                                className="px-4 py-2 bg-gray-800/60 hover:bg-[#E5BA73] text-gray-300 hover:text-[#0E1420] text-xs font-bold rounded-xl border border-gray-700/50 hover:border-[#E5BA73] transition-all duration-300"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WriterBookmarksPage;