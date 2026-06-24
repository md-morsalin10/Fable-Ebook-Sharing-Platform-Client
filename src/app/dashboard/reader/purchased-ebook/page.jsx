import BooksCard from '@/components/Books/BooksCard';
import { getPaymentDataById } from '@/lib/api/bookPayment';
import { getUserSeason } from '@/lib/core/Session';
import { BookOpen } from '@gravity-ui/icons';

import Link from 'next/link';
import React from 'react';

const PurchaseEbookPage = async () => {
    const user = await getUserSeason();
    const userId = user?.id;
    
    const paymentData = await getPaymentDataById(userId) || [];

    return (
        <div className="min-h-screen bg-[#0B0F17] text-gray-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
              
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-5 border-b border-gray-800/60">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
                            All Purchased Ebooks
                        </h2>
                        <p className="text-xs md:text-sm text-gray-400 mt-1">
                            Manage and read all the digital books you have unlocked.
                        </p>
                    </div>
                    
                    <div className="self-start md:self-auto px-4 py-1.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full text-xs font-bold uppercase tracking-wider">
                        Total: {paymentData.length} {paymentData.length === 1 ? 'Book' : 'Books'}
                    </div>
                </div>

                {paymentData.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-20 bg-[#0E1420]/50 border border-gray-800/80 rounded-2xl p-8 max-w-xl mx-auto shadow-2xl">
                        <div className="w-16 h-16 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center text-2xl mx-auto mb-5 border border-purple-500/20">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-wide">No Books Found</h3>
                        <p className="text-gray-400 text-xs md:text-sm mt-2 max-w-sm mx-auto leading-relaxed">
                            You havent purchased any ebooks yet. Explore our extensive collection and find your next favorite read!
                        </p>
                        <Link
                            href="/browse-ebooks" 
                            className="mt-6 px-6 py-2.5 bg-[#E5BA73] hover:bg-[#d4ab63] text-[#0E1420] text-xs font-bold rounded-xl transition-all shadow-md uppercase tracking-wider"
                        >
                            Browse Ebooks
                        </Link>
                    </div>
                ) : (
                  
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {paymentData.map((item, index) => {
                            const bookWithCorrectId = {
                                ...item,
                                _id: item.bookId,
                                
                            };

                            return (
                                <div 
                                    key={item._id || index} 
                                    className="transition-transform duration-300 hover:-translate-y-1"
                                >
                                    <BooksCard book={bookWithCorrectId} />
                                </div>
                            );
                        })}
                    </div>
                )}

            </div>
        </div>
    );
};

export default PurchaseEbookPage;