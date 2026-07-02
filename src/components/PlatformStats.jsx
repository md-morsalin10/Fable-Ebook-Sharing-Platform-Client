"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  { id: 1, number: "500+", label: "Published Ebooks", desc: "Original creations by local & global writers" },
  { id: 2, number: "12K+", label: "Active Readers", desc: "Immersive literature lovers exploring daily" },
  { id: 3, number: "150+", label: "Verified Authors", desc: "Talented creators managing independent suites" },
  { id: 4, number: "99.9%", label: "Secure Transactions", desc: "Fully encrypted dynamic Stripe checkout flows" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function PlatformStats() {
  return (
    /* 🛠️ ব্যাকগ্রাউন্ড কালারকে transparent করে দেওয়া হয়েছে যেন মেইন ডার্ক থিমটিই নিচে শো করে */
    <section className="relative w-full bg-transparent py-20 px-4 overflow-hidden selection:bg-[#E5BA73]/20 selection:text-[#E5BA73]">
      
      {/* ব্যাকগ্রাউন্ড লাইট ইফেক্ট */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-950/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                scale: 1.02,
                transition: { duration: 0.2, ease: "easeInOut" }
              }}
              /* 💡 কার্ডের ভেতরের ব্যাকগ্রাউন্ড আরেকটু অপাসিটি কমিয়ে গ্লাস মরফিক লুক বাড়ানো হয়েছে */
              className="group relative bg-[#0B0F17]/30 backdrop-blur-md border border-gray-800/30 hover:border-[#E5BA73]/30 p-8 rounded-2xl transition-all duration-300 hover:shadow-[0_0_40px_-15px_rgba(229,186,115,0.15)] cursor-pointer"
            >
              <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-gray-700 group-hover:bg-[#E5BA73] transition-colors duration-300"></div>

              <h3 className="text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-[#E5BA73] via-yellow-200 to-[#C29B53] bg-clip-text text-transparent origin-left">
                {stat.number}
              </h3>
              
              <p className="text-gray-200 font-semibold text-base mt-3 tracking-wide">
                {stat.label}
              </p>
              
              <p className="text-gray-500 text-xs md:text-sm mt-2 leading-relaxed font-light group-hover:text-gray-400 transition-colors duration-300">
                {stat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}