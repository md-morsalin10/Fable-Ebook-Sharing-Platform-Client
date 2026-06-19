"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const topWriters = [
  {
    id: "writer-1",
    name: "Julian Thorne",
    sales: "42.5k Books Sold",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop",
    borderColor: "border-[#E5BA73]", 
  },
  {
    id: "writer-2",
    name: "Elena Vance",
    sales: "38.2k Books Sold",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
    borderColor: "border-purple-500/80", 
  },
  {
    id: "writer-3",
    name: "Marcus Vane",
    sales: "29.8k Books Sold",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    borderColor: "border-emerald-500/80", 
  },
];

const TopWriters = () => {
  return (
    <section className="bg-[#0B0F17] py-24 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#E5BA73] tracking-wide">
            Master Storytellers
          </h2>
          <p className="text-gray-400 text-sm mt-3 font-light max-w-md mx-auto">
            Meet the architects behind the worlds you love.
          </p>
        </div>

        {/* Writers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {topWriters.map((writer) => (
            <div
              key={writer.id}
              className="bg-[#161B26] rounded-2xl border border-gray-800/40 p-8 flex flex-col items-center justify-center text-center shadow-2xl hover:border-gray-700/60 transition-all duration-300 group"
            >
              
              {/* FIXED: Writer Avatar Container with Perfect Rounding */}
              <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
                {/* বাইরের গ্লোয়িং এবং বর্ডার রিং */}
                <div className={`absolute inset-0 rounded-full border-4 ${writer.borderColor} transition-transform duration-500 group-hover:scale-105`} />
                
                {/* ভেতরের একচুয়াল ইমেজ কন্টেইনার যা ১০০% রাউন্ডেড মাস্ক করবে */}
                <div className="relative w-[112px] h-[112px] rounded-full overflow-hidden bg-gray-950">
                  <Image
                    src={writer.avatar}
                    alt={writer.name}
                    fill
                    sizes="112px"
                    className="object-cover rounded-full" 
                  />
                </div>
              </div>

              {/* Writer Name & Sales */}
              <div className="mb-6">
                <h3 className="text-xl font-serif font-semibold text-white tracking-wide group-hover:text-[#E5BA73] transition-colors duration-200">
                  {writer.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1.5 font-light tracking-wide">
                  {writer.sales}
                </p>
              </div>

              {/* Button */}
              <Link
                href={`/writers/${writer.id}`}
                className="bg-[#E5BA73] text-[#0B0F17] px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-950/10 hover:bg-[#d4a75e] transition-all duration-200 transform hover:-translate-y-0.5"
              >
                View Books
              </Link>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TopWriters;