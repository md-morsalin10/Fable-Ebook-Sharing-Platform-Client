"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star, ArrowUpRight } from 'lucide-react';

const BooksCard = ({ book }) => {
  const bookId = book?._id;
  const isSold = book?.status?.toLowerCase() === 'sold';
  const [isLiked, setIsLiked] = useState(false);

  const handleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="h-full"
    >
      <Link
        href={`/browse-ebooks/${bookId}`}
        className="group relative bg-[#0D131F]/90 border border-gray-800/80 hover:border-[#E5BA73]/60 rounded-2xl p-3.5 shadow-xl hover:shadow-2xl hover:shadow-[#E5BA73]/5 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden backdrop-blur-md"
      >
        {/* Subtle Hover Ambient Glow */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#E5BA73]/10 rounded-full blur-3xl group-hover:bg-[#E5BA73]/20 transition-all duration-500 pointer-events-none" />

        <div>
          {/* Cover Image Container */}
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#070A0F] border border-gray-800/80 mb-3.5 shadow-inner">
            <Image
              src={book?.coverImage || 'https://i.ibb.co/99V1Hzp5/7260188.jpg'}
              alt={book?.title || 'Ebook Cover'}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            />

            {/* Gradient Overlay for Better Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F17]/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-300" />

            {/* Genre Badge */}
            <span className="absolute top-2.5 left-2.5 bg-[#0B0F17]/85 backdrop-blur-md text-[#E5BA73] text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#E5BA73]/30 shadow-md">
              {book?.genre || 'General'}
            </span>

            {/* Bookmark Heart Button */}
            <button
              onClick={handleBookmark}
              className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-[#0B0F17]/80 border border-gray-700/40 text-gray-300 hover:text-red-500 hover:bg-[#0B0F17] transition-all duration-200 backdrop-blur-md shadow-md"
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>

            {/* Sold Badge */}
            {isSold && (
              <div className="absolute inset-x-2 bottom-2 bg-red-950/90 border border-red-500/30 backdrop-blur-md text-red-200 text-[10px] font-bold py-1 rounded-lg text-center uppercase tracking-widest shadow-lg">
                Sold Out
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="px-1 space-y-1">
            <div className="flex items-center gap-1.5 text-[11px]">
              <div className="flex items-center gap-1 text-[#E5BA73]">
                <Star className="w-3.5 h-3.5 fill-[#E5BA73]" />
                <span className="font-semibold">{book?.rating || '4.8'}</span>
              </div>
              <span className="text-gray-500 text-[10px]">• E-Book</span>
            </div>

            <h3 className="text-sm font-bold text-gray-100 group-hover:text-[#E5BA73] transition-colors line-clamp-1 tracking-tight">
              {book?.title}
            </h3>

            <p className="text-xs text-gray-400 font-medium line-clamp-1">
              by <span className="text-gray-300">{book?.writerName || 'Unknown Writer'}</span>
            </p>
          </div>
        </div>

        {/* Card Footer */}
        <div className="mt-4 pt-3 border-t border-gray-800/80 flex items-center justify-between px-1">
          <div className="flex flex-col">
            <span className="text-[9px] text-gray-400 uppercase tracking-wider font-medium">Price</span>
            <span className="text-base font-extrabold text-[#E5BA73]">
              ${Number(book?.price || 0).toFixed(2)}
            </span>
          </div>

          {isSold ? (
            <span className="text-[10px] px-2.5 py-1 font-bold bg-red-500/10 text-red-400 rounded-lg border border-red-500/20 uppercase tracking-wide">
              Sold
            </span>
          ) : (
            <div className="flex items-center gap-1 text-xs font-semibold text-[#0B0F17] bg-[#E5BA73] group-hover:bg-[#f0c885] px-3 py-1.5 rounded-xl shadow-md transition-all duration-200">
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default BooksCard;