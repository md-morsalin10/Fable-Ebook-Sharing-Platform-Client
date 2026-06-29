"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'; // 👈 Framer Motion ইম্পোর্ট করা হয়েছে
import { 
  Book, 
  Magnifier, 
  Heart, 
  Rocket, 
  ShieldCheck, 
  XmarkShape
} from '@gravity-ui/icons'; 

const genres = [
  { 
    name: 'Fiction', 
    slug: 'fiction',
    icon: Book, 
    color: 'text-amber-400', 
    glow: 'hover:border-amber-400/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.1)]' 
  },
  { 
    name: 'Mystery', 
    slug: 'mystery',
    icon: Magnifier, 
    color: 'text-purple-400', 
    glow: 'hover:border-purple-400/40 hover:shadow-[0_0_20px_rgba(192,132,252,0.1)]' 
  },
  { 
    name: 'Romance', 
    slug: 'romance',
    icon: Heart, 
    color: 'text-rose-400', 
    glow: 'hover:border-rose-400/40 hover:shadow-[0_0_20px_rgba(251,113,133,0.1)]' 
  },
  { 
    name: 'Sci-Fi', 
    slug: 'sci-fi',
    icon: Rocket, 
    color: 'text-emerald-400', 
    glow: 'hover:border-emerald-400/40 hover:shadow-[0_0_20px_rgba(52,211,153,0.1)]' 
  },
  { 
    name: 'Fantasy', 
    slug: 'fantasy',
    icon: ShieldCheck, 
    color: 'text-orange-400', 
    glow: 'hover:border-orange-400/40 hover:shadow-[0_0_20px_rgba(251,146,60,0.1)]' 
  },
  { 
    name: 'Horror', 
    slug: 'horror',
    icon: XmarkShape, 
    color: 'text-indigo-400', 
    glow: 'hover:border-indigo-400/40 hover:shadow-[0_0_20px_rgba(129,140,248,0.1)]' 
  },
];

// গ্রিডের প্যারেন্ট কন্টেইনার ভেরিয়েন্ট (Stagger Effect)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // প্রতিটি কার্ড একটার পর একটা স্মুথলি আসবে
    },
  },
};

// প্রতিটি একক জেনারে কার্ডের ভেরিয়েন্ট
const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

const BrowseByGenre = () => {
  return (
    <div className="w-full text-white py-14 px-6 md:px-12 overflow-hidden select-none">
      <div className="max-w-[1400px] mx-auto">
        
        {/* 🏷️ Section Header with Motion */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-2xl font-semibold tracking-wide text-[#E5BA73]">
            Browse by Genre
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Explore your favorite literary worlds through curated categories.
          </p>
        </motion.div>

        {/* 🎴 Responsive Grid Area with Motion */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5"
        >
          {genres.map((genre, index) => {
            const IconComponent = genre.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ 
                  y: -5,
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeInOut" }
                }}
                className="w-full"
              >
                <Link
                  href={`/browse-ebooks?genre=${genre.slug}`}
                  className={`group block bg-[#161B26] border border-gray-800/40 rounded-xl p-6 flex flex-col items-center justify-center gap-4 transition-all duration-300 shadow-md ${genre.glow}`}
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
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
};

export default BrowseByGenre;