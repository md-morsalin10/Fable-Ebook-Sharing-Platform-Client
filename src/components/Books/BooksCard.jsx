import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BooksCard = ({ book }) => {
    // MongoDB Object ID অথবা নরমাল ID হ্যান্ডেল করার জন্য
    const bookId = book._id?.$oid || book._id;
    
    // ডাটাবেজের স্ট্যাটাস চেক
    const isSold = book.status?.toLowerCase() === 'sold';

    return (
        <Link 
            href={`/browse-ebooks/${bookId}`}
            className="group bg-[#0B0F17] border border-gray-800/60 rounded-2xl p-4 shadow-md hover:border-gray-700/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer focus:outline-none focus:border-[#E5BA73]"
        >
            <div> 
                {/* 📔 Cover Image Container */}
                <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-gray-950 border border-gray-900 mb-4">
                    <Image 
                        src={book.coverImage} 
                        alt={book.title} 
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        priority={false}
                    />
                    
                    {/* Sold Badge Overlay */}
                    {isSold && (
                        <div className="absolute top-2 right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md uppercase tracking-wider z-10">
                            Sold Out
                        </div>
                    )}
                </div>

                {/* 🏷️ Book Metadata */}
                <div className="text-[10px] text-[#E5BA73] font-semibold tracking-wider uppercase px-1 mb-1">
                    {book.genre}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#E5BA73] transition-colors line-clamp-1 px-1">
                    {book.title}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5 px-1 line-clamp-1">
                    By {book.writerName}
                </p>
            </div>

            {/* 💰 Footer Area: Price, Badges & Details Button */}
            <div className="mt-4 pt-3 border-t border-gray-800/50 flex flex-col gap-3">
                <div className="flex items-center justify-between px-1">
                    <span className="text-base font-bold text-gray-200">
                        ${Number(book.price).toFixed(2)}
                    </span>
                    
                    {isSold ? (
                        <span className="text-[10px] px-2.5 py-0.5 font-bold tracking-wide bg-red-500/10 text-red-400 rounded-md border border-red-500/20 uppercase">
                            Sold
                        </span>
                    ) : (
                        <span className="text-[10px] px-2.5 py-0.5 font-medium tracking-wide bg-emerald-500/10 text-emerald-400 rounded-md border border-emerald-500/20 uppercase">
                            Available
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default BooksCard;