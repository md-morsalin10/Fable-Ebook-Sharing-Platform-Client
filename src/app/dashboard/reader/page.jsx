import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getPaymentDataById } from '@/lib/api/bookPayment';
import { getUserSeason } from '@/lib/core/Session';

const calculateStats = (paymentData) => {
    const totalPurchased = paymentData.length;
    const totalSpent = paymentData.reduce((sum, item) => sum + Number(item.price || 0), 0);
    return { totalPurchased, totalSpent };
};

const ReaderDashboardPage = async () => {
    const user = await getUserSeason();
    const userId = user?.id;
    const userName = user?.name || "Reader";

    const paymentData = (await getPaymentDataById(userId)) || [];
    const { totalPurchased, totalSpent } = calculateStats(paymentData);

    const bookmarkCount = user?.bookmarks?.length || 0;

  
    const recentPurchases = paymentData.slice(0, 2);

    // আজকের ডেট ফরম্যাট করার জন্য
    const formattedDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="w-full text-gray-200 min-h-screen py-6 px-2 md:px-6">
            <div className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-white flex items-center gap-2">
                    Hello, {userName.split(' ')[0]}! <span className="animate-bounce">👋</span>
                </h1>
                <p className="text-xs md:text-sm text-gray-400 mt-1">{formattedDate}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
                <div className="bg-[#0B0F17]/50 border border-gray-800/80 rounded-2xl p-6 flex items-center gap-5 backdrop-blur-md shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-xl text-blue-400">
                        📚
                    </div>
                    <div>
                        <span className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">Books Purchased</span>
                        <span className="text-2xl md:text-3xl font-extrabold text-white mt-0.5 block">{totalPurchased}</span>
                    </div>
                </div>

                <div className="bg-[#0B0F17]/50 border border-gray-800/80 rounded-2xl p-6 flex items-center gap-5 backdrop-blur-md shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xl text-purple-400">
                        🔖
                    </div>
                    <div>
                        <span className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">Books Bookmarked</span>
                        <span className="text-2xl md:text-3xl font-extrabold text-white mt-0.5 block">{bookmarkCount || 128}</span>
                    </div>
                </div>

                <div className="bg-[#0B0F17]/50 border border-gray-800/80 rounded-2xl p-6 flex items-center gap-5 backdrop-blur-md shadow-lg">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl text-[#E5BA73]">
                        💼
                    </div>
                    <div>
                        <span className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider">Amount Spent</span>
                        <span className="text-2xl md:text-3xl font-extrabold text-[#E5BA73] mt-0.5 block">
                            ${totalSpent.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <div className="flex items-center justify-between mb-6 border-b border-gray-800/60 pb-3">
                    <h2 className="text-lg font-bold text-gray-100 tracking-wide">Continue Reading</h2>
                    <Link href="/dashboard/reader/purchased-ebook" className="text-xs text-[#E5BA73] hover:underline flex items-center gap-1 transition-all">
                        View all reading history →
                    </Link>
                </div>

                {recentPurchases.length === 0 ? (
                    <div className="text-center py-16 bg-[#0B0F17]/30 border border-gray-800/60 rounded-2xl">
                        <span className="text-3xl block mb-2">📖</span>
                        <p className="text-gray-400 text-sm">No books purchased yet.</p>
                        <Link href="/browse-ebooks" className="text-xs text-[#E5BA73] hover:underline mt-2 inline-block">
                            Explore Ebooks Now
                        </Link>
                    </div>
                ) : (
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recentPurchases.map((book) => (
                            <div key={book._id} className="bg-[#0B0F17]/40 border border-gray-800/60 rounded-2xl p-5 flex gap-5 items-center hover:border-gray-700 transition-all shadow-md group">
                            
                                <div className="relative aspect-3/4 w-20 flex-shrink-0 rounded-xl bg-gray-950 border border-gray-800 overflow-hidden shadow-md">
                                    {book.coverImage && (
                                        <Image 
                                            src={book.coverImage} 
                                            alt={book.title} 
                                            fill 
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                            sizes="80px"
                                        />
                                    )}
                                </div>
                                
                                <div className="flex-1 flex flex-col justify-between h-full py-1">
                                    <div>
                                        <h3 className="font-bold text-base text-gray-100 line-clamp-1 group-hover:text-[#E5BA73] transition-colors">
                                            {book.title}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-0.5">By {book.writerName}</p>
                                    </div>

                                    {/* প্রগ্রেস বার লেআউট (প্রিমিয়াম লুকের জন্য) */}
                                    <div className="mt-4">
                                        <div className="flex justify-between text-[10px] text-gray-500 font-medium mb-1.5">
                                            <span>74% Complete</span>
                                            <span>128 pages left</span>
                                        </div>
                                        <div className="w-full bg-gray-950 rounded-full h-1.5 border border-gray-800/80 overflow-hidden">
                                            <div className="bg-[#E5BA73] h-full rounded-full transition-all duration-500" style={{ width: '74%' }}></div>
                                        </div>
                                    </div>

                                    {/* অ্যাকশন বাটন */}
                                    <div className="mt-4">
                                        <Link 
                                            href={`/browse-ebooks/${book.bookId}`} 
                                            className="inline-flex items-center justify-center gap-1 w-full sm:w-auto text-xs font-bold px-4 py-2 bg-[#E5BA73] hover:bg-[#d4ab63] text-[#0E1420] rounded-xl transition-all shadow-sm"
                                        >
                                            Continue Reading <span>→</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReaderDashboardPage;