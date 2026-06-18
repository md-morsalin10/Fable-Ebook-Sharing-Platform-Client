"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Banner = () => {
  // Framer Motion Variants for Staggered Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative bg-[#0B0F17] text-white min-h-[calc(100vh-80px)] flex items-center overflow-hidden px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      
      {/* Background Glow effects matching image_d2d345.png */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full relative z-10">
        
        {/* Left Content Column */}
        <motion.div 
          className="lg:col-span-7 flex flex-col justify-center text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Small Top Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 mb-6">
            <span className="px-3 py-1 text-[11px] uppercase tracking-[0.2em] font-bold text-[#E5BA73] bg-[#E5BA73]/15 border border-[#E5BA73]/30 rounded-full">
              ✦ Premium Digital Literature
            </span>
          </motion.div>

          {/* Main Typography Heading from image_d2d345.png */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-serif font-medium tracking-tight leading-[1.15] mb-6"
          >
            Unveiling the Next <br />
            Chapter of <span className="italic font-serif text-[#E5BA73] pr-2">Original Ebooks</span>
          </motion.h1>

          {/* Description Paragraph */}
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10 font-light"
          >
            Step into a curated digital gallery where literary craftsmanship meets immersive design. 
            Experience stories as they were meant to be read.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <Link
              href="/browse"
              className="bg-[#E5BA73] text-[#0B0F17] px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-amber-900/10 hover:bg-[#d4a75e] text-center transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Explore Gallery
            </Link>
            <Link
              href="/dashboard/writer"
              className="bg-[#1E2533]/60 text-gray-300 border border-gray-700/60 px-8 py-3.5 rounded-xl font-semibold hover:bg-[#1E2533] hover:text-white text-center transition-all duration-200"
            >
              Become a Writer
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Book Cover Column */}
        <motion.div 
          className="lg:col-span-5 flex justify-center lg:justify-end items-center w-full"
          initial={{ opacity: 0, x: 50, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        >
          {/* Glassmorphic Shadow Container for the Book/Tablet */}
          <div className="relative group p-4 sm:p-6 bg-gradient-to-b from-gray-800/20 to-gray-900/40 border border-gray-800/50 rounded-3xl shadow-2xl transition-all duration-500 hover:border-gray-700/50">
            
            {/* Subtle glow edge on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/0 to-amber-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Ebook Device Frame / Cover Placeholder */}
            <div className="w-[280px] sm:w-[320px] aspect-[3/4] bg-[#0F141C] border-4 border-[#1A202C] rounded-2xl overflow-hidden shadow-2xl relative flex items-center justify-center">
              
              {/* If you have the image or placeholder, replace this div with an <img> tag */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#16222F] to-[#0D1520] p-6 flex flex-col justify-between border border-gray-800 text-center">
                <div className="w-full h-full border border-[#E5BA73]/30 rounded-xl p-4 flex flex-col justify-between items-center bg-radial-gradient">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[#E5BA73]/60 font-semibold">Fable Original</span>
                  
                  {/* Mock Book Title matching the image design */}
                  <div className="my-auto py-4">
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#E5BA73] font-normal tracking-wide leading-tight">
                      THE <br /> GILDED <br /> SILENCE
                    </h2>
                    <div className="w-12 h-[1px] bg-[#E5BA73]/40 mx-auto my-3" />
                  </div>

                  <span className="text-[10px] tracking-wider text-gray-500 font-medium">BESTSELLER</span>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Banner;