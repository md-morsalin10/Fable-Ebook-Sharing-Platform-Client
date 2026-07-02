"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion"; 

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const TopWriters = () => {
  return (
    /* 🛠️ এখানে ব্যাকগ্রাউন্ড bg-transparent করে দেওয়া হয়েছে যেন মেইন ডার্ক থিমের সাথে মিশে যায় */
    <section className="bg-transparent py-24 px-4 sm:px-6 lg:px-8 select-none overflow-hidden relative">
      
      {/* ব্যাকগ্রাউন্ডে একটি হালকা গ্লো ইফেক্ট (ঐচ্ছিক, প্রিমিয়াম লুকের জন্য) */}
      <div className="absolute top-1/4 right-10 w-[300px] h-[300px] bg-purple-950/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 🎬 Section Title with Motion */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#E5BA73] tracking-wide">
            Master Storytellers
          </h2>
          <p className="text-gray-400 text-sm mt-3 font-light max-w-md mx-auto">
            Meet the architects behind the worlds you love.
          </p>
        </motion.div>

        {/* 🎬 Writers Grid with Stagger Effect */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {topWriters.map((writer) => (
            <motion.div
              key={writer.id}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                borderColor: "rgba(229, 186, 115, 0.3)",
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.6)" 
              }}
              /* 💡 কার্ডের ভেতরের ব্যাকগ্রাউন্ডকে ডার্ক থিমের সাথে ম্যাচ করে গ্লাস-মরফিক টাইপ (bg-[#0B0F17]/30) করা হয়েছে */
              className="bg-[#0B0F17]/30 backdrop-blur-md rounded-2xl border border-gray-800/40 p-8 flex flex-col items-center justify-center text-center transition-all duration-300 group cursor-pointer"
            >
              
              {/* Writer Avatar Container */}
              <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
                {/* বাইরের গ্লোয়িং রিং */}
                <div className={`absolute inset-0 rounded-full border-4 ${writer.borderColor} transition-transform duration-500 group-hover:scale-105`} />
                
                <div className="relative w-[112px] h-[112px] rounded-full overflow-hidden bg-gray-950">
                  <Image
                    src={writer.avatar}
                    alt={writer.name}
                    fill
                    sizes="112px"
                    className="object-cover rounded-full transition-transform duration-500 group-hover:scale-110" 
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
                className="bg-[#E5BA73] text-[#0B0F17] px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-950/10 hover:bg-[#d4a75e] transition-all duration-200 block"
              >
                View Books
              </Link>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default TopWriters;