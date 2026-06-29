import { getFeaturedBooks } from '@/lib/api/books';
import React from 'react';
import BooksCard from './Books/BooksCard';
import FadeIn from './MotionWrapper/FadeIn';
import Link from 'next/link';


const FeaturedBooks = async () => {
  const featuresBook = await getFeaturedBooks();

  if (!featuresBook || !Array.isArray(featuresBook)) {
    return <div className="text-gray-400 text-center p-6">No featured books found.</div>;
  }

  return (
    <div className="w-full text-white py-14 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <FadeIn className="flex justify-between items-end mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] font-bold text-[#E5BA73]/60 mb-2">
              ✦ Curated Collection
            </p>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-[#F0F4FF]">
              Featured <span className="italic text-[#E5BA73]">Ebooks</span>
            </h2>
            <p className="text-xs text-gray-400 mt-1 font-light">
              Handpicked literary gems from our curated collection.
            </p>
          </div>
          <Link
            href="/browse-ebooks"
            className="text-xs text-[#E5BA73] hover:text-[#F0D090] tracking-wider font-medium transition-colors group flex items-center gap-1"
          >
            View All Collection
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">→</span>
          </Link>
        </FadeIn>

        {/* Divider */}
        <FadeIn delay={0.15}>
          <div
            className="mb-10 h-px"
            style={{
              background: "linear-gradient(90deg, rgba(229,186,115,0.4), rgba(229,186,115,0.05) 60%, transparent)",
            }}
          />
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuresBook.map((book, index) => (
            <FadeIn key={book._id?.$oid || book._id} delay={index * 0.08}>
              <BooksCard book={book} />
            </FadeIn>
          ))}
        </div>

      </div>
    </div>
  );
};

export default FeaturedBooks;