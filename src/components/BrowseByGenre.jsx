import React from 'react';
import Link from 'next/link';
import { 
  Book, 
  Magnifier, 
  Heart, 
  Rocket, 
  ShieldCheck, // Fantasy এর জন্য ক্লোজ রিলেটেড 
  Xmark, // Horror এর জন্য কাস্টমাইজড বা এক্সিস্টিং ওয়ান
  XmarkShape
} from '@gravity-ui/icons'; 

const genres = [
  { 
    name: 'Fiction', 
    slug: 'fiction',
    icon: Book, 
    color: 'text-amber-400', 
    glow: 'hover:border-amber-400/40 hover:shadow-amber-500/5' 
  },
  { 
    name: 'Mystery', 
    slug: 'mystery',
    icon: Magnifier, 
    color: 'text-purple-400', 
    glow: 'hover:border-purple-400/40 hover:shadow-purple-500/5' 
  },
  { 
    name: 'Romance', 
    slug: 'romance',
    icon: Heart, 
    color: 'text-rose-400', 
    glow: 'hover:border-rose-400/40 hover:shadow-rose-500/5' 
  },
  { 
    name: 'Sci-Fi', 
    slug: 'sci-fi',
    icon: Rocket, 
    color: 'text-emerald-400', 
    glow: 'hover:border-emerald-400/40 hover:shadow-emerald-500/5' 
  },
  { 
    name: 'Fantasy', 
    slug: 'fantasy',
    icon: ShieldCheck, 
    color: 'text-orange-400', 
    glow: 'hover:border-orange-400/40 hover:shadow-orange-500/5' 
  },
  { 
    name: 'Horror', 
    slug: 'horror',
    icon: XmarkShape, // Gravity UI তে স্কাল না থাকায় থিম ডার্ক ক্রসের জন্য Xmark ব্যবহার করা হয়েছে
    color: 'text-indigo-400', 
    glow: 'hover:border-indigo-400/40 hover:shadow-indigo-500/5' 
  },
];

const BrowseByGenre = () => {
  return (
    <div className="w-full text-white py-14 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* 🏷️ Section Header */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold tracking-wide text-[#E5BA73]">
            Browse by Genre
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Explore your favorite literary worlds through curated categories.
          </p>
        </div>

        {/* 🎴 Responsive Grid Area */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {genres.map((genre, index) => {
            const IconComponent = genre.icon;
            return (
           
              <Link
                key={index}
                href={`/browse-ebooks?genre=${genre.slug}`}
                className={`group relative bg-[#161B26] border border-gray-800/40 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:bg-[#1c2230] shadow-md ${genre.glow}`}
              >
                {/* 🎨 Icon Box with Gravity UI Component */}
                <div className={`p-3 bg-gray-950/40 rounded-xl border border-gray-900/60 group-hover:scale-105 transition-transform duration-300 ${genre.color}`}>
                  <IconComponent width={24} height={24} />
                </div>

                {/* 📝 Genre Text */}
                <span className="text-xs font-medium tracking-wide text-gray-300 group-hover:text-white transition-colors">
                  {genre.name}
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default BrowseByGenre;