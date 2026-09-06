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
    <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.2 }} className="h-full">
      <Link
        href={`/browse-ebooks/${bookId}`}
        className="group relative bg-[#0D131F] border border-gray-800 hover:border-[#E5BA73]/50 rounded-2xl p-3.5 shadow-lg transition-all duration-300 flex flex-col justify-between h-full overflow-hidden"
      >
        <div>
          {/* Cover Image */}
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-gray-950 border border-gray-800/80 mb-3">
            <Image
              src={book?.coverImage || 'https://i.ibb.co/99V1Hzp5/7260188.jpg'}
              alt={book?.title || 'Ebook'}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Genre Badge */}
            <span className="absolute top-2.5 left-2.5 bg-[#0B0F17]/80 text-[#E5BA73] text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase border border-[#E5BA73]/30">
              {book?.genre || 'General'}
            </span>

            {/* Bookmark Heart Button */}
            <button
              onClick={handleBookmark}
              className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-[#0B0F17]/80 text-gray-300 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>

            {/* Sold Badge */}
            {isSold && (
              <div className="absolute inset-x-2 bottom-2 bg-red-900/90 text-red-200 text-[10px] font-bold py-1 rounded text-center uppercase tracking-wider">
                Sold Out
              </div>
            )}
          </div>

          {/* Info */}
          <div className="px-1 space-y-0.5">
            <div className="flex items-center gap-1 text-[11px] text-[#E5BA73]">
              <Star className="w-3 h-3 fill-[#E5BA73]" />
              <span className="font-medium">4.8</span>
            </div>

            <h3 className="text-sm font-bold text-white group-hover:text-[#E5BA73] transition-colors line-clamp-1">
              {book?.title}
            </h3>

            <p className="text-xs text-gray-400 line-clamp-1">
              By {book?.writerName || 'Writer'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-3 pt-2.5 border-t border-gray-800 flex items-center justify-between px-1">
          <span className="text-base font-extrabold text-[#E5BA73]">
            ${Number(book?.price || 0).toFixed(2)}
          </span>

          {isSold ? (
            <span className="text-[10px] px-2 py-0.5 font-bold bg-red-500/10 text-red-400 rounded border border-red-500/20 uppercase">
              Sold
            </span>
          ) : (
            <div className="flex items-center gap-1 text-xs font-semibold text-[#0B0F17] bg-[#E5BA73] px-2.5 py-1 rounded-lg">
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default BooksCard;