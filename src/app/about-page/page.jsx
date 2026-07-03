"use client";

import React from 'react';
import Link from 'next/link';
import { Book, ShieldCheck, MagicWand, ArrowRight } from '@gravity-ui/icons';
import { motion } from 'framer-motion';
import { authClient } from '@/lib/auth-client';


const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};


const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        }
    }
};

export default function AboutPage() {
    const { data: session, } = authClient.useSession()
    const user = session?.user
    // console.log(user, "from about page")

    const coreValues = [
        {
            id: 1,
            title: "Complete Privacy",
            description: "Your drafts, galleries, and earnings are protected with military-grade security. Only you control who sees your universe.",
            icon: ShieldCheck,
            color: "text-blue-400",
            bg: "bg-blue-500/5",
            border: "hover:border-blue-500/20"
        },
        {
            id: 2,
            title: "Author-First Economy",
            description: "We bypass the traditional publishing gatekeepers. Keep the maximum share of your revenue with direct, transparent payouts.",
            icon: Book,
            color: "text-amber-400",
            bg: "bg-amber-500/5",
            border: "hover:border-amber-500/20"
        },
        {
            id: 3,
            title: "Immersive Experience",
            description: "A premium digital space designed specifically for modern storytelling, rich imagery, and professional author branding.",
            icon: MagicWand,
            color: "text-purple-400",
            bg: "bg-purple-500/5",
            border: "hover:border-purple-500/20"
        }
    ];

    return (
        <div className="min-h-screen bg-[#0B0F17] text-gray-100 relative overflow-hidden select-none">

            {/* Background Decorative Ambient Light with Breathe Motion */}
            <motion.div
                initial={{ opacity: 0.3, scale: 0.9 }}
                animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#E5BA73]/5 rounded-full blur-[160px] pointer-events-none"
            />
            <motion.div
                initial={{ opacity: 0.02, scale: 1 }}
                animate={{ opacity: [0.02, 0.05, 0.02], scale: [1, 1.15, 1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/[0.02] rounded-full blur-[140px] pointer-events-none"
            />

            {/* 🌟 1. Hero Section (Smooth Entry Animation) */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
                }}
                className="max-w-4xl mx-auto text-center pt-20 pb-16 px-4 relative z-10"
            >
                <motion.span
                    variants={fadeInUpVariants}
                    className="inline-block text-xs uppercase tracking-[0.25em] text-[#E5BA73] font-semibold bg-[#E5BA73]/5 px-4 py-1.5 rounded-full border border-[#E5BA73]/10"
                >
                    Our Story
                </motion.span>

                <motion.h1
                    variants={fadeInUpVariants}
                    className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white mt-6 tracking-wide leading-tight"
                >
                    Where Stories Find Their <br className="hidden sm:inline" />
                    <span className="text-[#E5BA73]">Private Sanctuary</span>
                </motion.h1>

                <motion.p
                    variants={fadeInUpVariants}
                    className="text-base sm:text-lg text-gray-400 font-light mt-6 max-w-2xl mx-auto leading-relaxed"
                >
                    Fable is more than just a publishing platform. It is a premium digital gallery engineered exclusively for independent authors to write, secure, and monetize their literary masterpieces.
                </motion.p>
            </motion.div>

            {/* 🏛️ 2. The Vision / Mission Section (Fade in on Scroll) */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUpVariants}
                className="max-w-5xl mx-auto px-4 py-12 relative z-10"
            >
                <div className="bg-[#111622]/40 border border-gray-800/60 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-2xl grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
                    <div className="md:col-span-3">
                        <h2 className="text-2xl font-serif font-bold text-white mb-4">Reinventing Digital Publishing</h2>
                        <p className="text-sm text-gray-400 font-light leading-relaxed mb-4">
                            The traditional publishing industry is broken, full of gatekeepers and complex distribution loops. On the other hand, mainstream digital platforms lack privacy and professional aesthetics.
                        </p>
                        <p className="text-sm text-gray-400 font-light leading-relaxed">
                            We built Fable to change that. We give authors full creative autonomy, beautiful portfolio setups, and secure, direct-to-reader commercialization paths. Your words deserve a luxury experience, not a cluttered social feed.
                        </p>
                    </div>

                    {/* Stat Box with subtle hover scale */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="md:col-span-2 bg-[#0B0F17] border border-gray-800/80 rounded-2xl p-6 text-center shadow-inner"
                    >
                        <div className="text-4xl font-serif font-bold text-[#E5BA73]">100%</div>
                        <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mt-1">Creator Controlled</div>
                        <div className="h-px bg-gray-800 my-4"></div>
                        <div className="text-2xl font-serif font-bold text-white">Direct</div>
                        <div className="text-xs uppercase tracking-wider text-gray-500 font-medium mt-1">Reader Payouts</div>
                    </motion.div>
                </div>
            </motion.div>

            {/* 💎 3. Core Values Grid (Staggered Scroll View) */}
            <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={fadeInUpVariants}
                    className="text-center mb-12"
                >
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">Built On Unshakable Pillars</h2>
                    <p className="text-xs text-gray-400 font-light mt-2">The core philosophies guiding the Fable Author Ecosystem.</p>
                </motion.div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainerVariants}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {coreValues.map((value) => {
                        const IconComponent = value.icon;
                        return (
                            <motion.div
                                variants={fadeInUpVariants}
                                whileHover={{ y: -6, scale: 1.01, borderColor: "rgba(229, 186, 115, 0.2)" }}
                                key={value.id}
                                className={`bg-[#111622]/30 border border-gray-800/50 rounded-2xl p-6 transition-all duration-300 shadow-lg ${value.border}`}
                            >
                                <div className={`w-12 h-12 rounded-xl ${value.bg} border border-gray-800 flex items-center justify-center mb-5 ${value.color}`}>
                                    <IconComponent className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-serif font-bold text-white mb-2">{value.title}</h3>
                                <p className="text-xs text-gray-400 font-light leading-relaxed">{value.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>


            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUpVariants}
                className="max-w-4xl mx-auto text-center py-20 px-4 relative z-10"
            >
                <div className="inline-block p-1 bg-gradient-to-r from-transparent via-[#E5BA73]/20 to-transparent w-full max-w-md h-px mb-8"></div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">Ready to Publish Your Next Legend?</h2>
                <p className="text-xs text-gray-400 font-light mt-3 max-w-md mx-auto leading-relaxed">
                    Join a premium community of independent storytellers who trust Fable with their legacy.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                    {/* Main CTA Button with Hover and Tap Motion */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                        <Link href="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#E5BA73] text-[#0B0F17] px-6 py-3.5 rounded-xl text-sm font-bold hover:bg-[#d4a75e] transition-colors duration-200 shadow-xl shadow-amber-950/10">
                            <span>Get Started For Free</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    {/* Secondary Button */}
                    {user && <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
                        <Link href={`/dashboard/${user?.role}`} className="w-full sm:w-auto block text-sm text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700 px-6 py-3.5 rounded-xl transition-all font-medium">
                            Explore Dashboard
                        </Link>
                    </motion.div>}
                </div>
            </motion.div>

            {/* 📜 Footer Section */}
            <div className="border-t border-gray-900 bg-[#080B11] py-8 text-center text-xs text-gray-500 font-light relative z-10">
                <p>© 2026 Fable Platforms Inc. All Rights Reserved.</p>
            </div>

        </div>
    );
}