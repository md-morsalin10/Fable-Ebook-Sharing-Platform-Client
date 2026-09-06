"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Upload, DollarSign, Users } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Create an Account",
      description: "Join our platform as a reader or a writer in just a few clicks.",
      icon: <Users className="w-8 h-8 text-[#E5BA73]" />,
    },
    {
      id: 2,
      title: "Publish or Discover",
      description: "Upload your masterpieces or explore thousands of premium ebooks.",
      icon: <Upload className="w-8 h-8 text-[#E5BA73]" />,
    },
    {
      id: 3,
      title: "Read Anywhere",
      description: "Access your library on any device, anytime, with our seamless reader.",
      icon: <BookOpen className="w-8 h-8 text-[#E5BA73]" />,
    },
    {
      id: 4,
      title: "Earn & Support",
      description: "Writers earn directly, and readers support their favorite authors.",
      icon: <DollarSign className="w-8 h-8 text-[#E5BA73]" />,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 15 } },
  };

  return (
    <section className="py-20 bg-[#06090F] text-white relative overflow-hidden">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E5BA73]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#E5BA73] mb-4">
            How Fable Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            Your journey to incredible stories and successful publishing starts here. A simple, premium experience designed for everyone.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-[#0B0F17] rounded-2xl p-8 border border-gray-800/50 hover:border-[#E5BA73]/30 transition-all duration-300 relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#E5BA73]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              
              <div className="w-16 h-16 rounded-full bg-[#151a23] border border-gray-800 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(229,186,115,0.05)] group-hover:shadow-[0_0_20px_rgba(229,186,115,0.15)] transition-all">
                {step.icon}
              </div>
              
              <div className="text-4xl font-black text-[#E5BA73]/10 absolute top-6 right-6">
                0{step.id}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-[#E5BA73] transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
