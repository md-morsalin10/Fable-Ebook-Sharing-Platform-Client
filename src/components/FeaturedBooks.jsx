"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

// 🌟 স্ক্রিনশটের সাথে মিলিয়ে ফেক ডেটা অ্যারে
const fakeBooks = [
  {
    id: "1",
    title: "Midnight Echoes",
    author: "Julian Thorne",
    price: "$12.99",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=600&auto=format&fit=crop", // পরে আপনার ডাটাবেজ ইমেজ ইউআরএল বসাবেন
  },
  {
    id: "2",
    title: "The Fabric of Time",
    author: "Elena Vance",
    price: "$14.50",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Obsidian Skies",
    author: "Marcus Vane",
    price: "$9.99",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Unwritten Sins",
    author: "Sarah Sterling",
    price: "$11.00",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Crystalline Orbit",
    author: "Orion Kael",
    price: "$15.99",
    image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "6",
    title: "The Last Harvest",
    author: "Clara Bloom",
    price: "$10.50",
    image: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=600&auto=format&fit=crop",
  },
];

const FeaturedBooks = () => {
  return (
    <section className="bg-[#0B0F17] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex justify-between items-end mb-12 border-b border-gray-800/50 pb-6">
          <div>
            <h2 className="text-3xl font-serif font-bold text-white tracking-wide">
              Featured Ebooks
            </h2>
            <p className="text-gray-400 text-sm mt-2 font-light">
              Handpicked literary gems from our curated collection.
            </p>
          </div>
          <Link 
            href="/browse" 
            className="text-xs uppercase tracking-widest font-semibold text-[#E5BA73] hover:text-[#d4a75e] transition-colors duration-200"
          >
            View All Collection
          </Link>
        </div>

        {/* Ebook Grid Card Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {fakeBooks.map((book) => (
            <div 
              key={book.id} 
              className="bg-[#111622] rounded-2xl border border-gray-800/60 p-4 flex flex-col justify-between hover:border-gray-700 transition-all duration-300 group shadow-xl"
            >
              {/* Card Image Wrapper with Next.js Image Component */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gray-950 mb-5">
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  sizes="(max-w-7xl) 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out brightness-[0.9] group-hover:brightness-100"
                  priority
                />
              </div>

              {/* Title, Author, and Price details */}
              <div className="flex items-center justify-between gap-4 mt-auto">
                <div className="min-w-0">
                  <h3 className="text-base font-serif font-semibold text-white truncate tracking-wide group-hover:text-[#E5BA73] transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-400 truncate mt-1 font-light">
                    by {book.author}
                  </p>
                </div>
                
                {/* Golden Border Badge Style Price Tag */}
                <span className="flex-shrink-0 bg-[#E5BA73]/10 text-[#E5BA73] border border-[#E5BA73]/20 text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider">
                  {book.price}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedBooks;