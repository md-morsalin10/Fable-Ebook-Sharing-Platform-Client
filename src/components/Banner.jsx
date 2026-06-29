"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "@gravity-ui/icons";

// ── Slide Data ─────────────────────────────────────────────────────────────────

const SLIDES = [
  {
    id: 1,
    badge: "✦ Premium Digital Literature",
    title: "Discover & Read",
    italic: "Original Ebooks",
    description:
      "Step into a curated digital gallery where literary craftsmanship meets immersive design. Experience stories as they were meant to be read.",
    bookTitle: "THE\nGILDED\nSILENCE",
    bookSubtitle: "A Novel of Shadows",
    accent: "#E5BA73",
    bookBg: "from-[#16222F] to-[#0D1520]",
    glowColor: "rgba(229,186,115,0.08)",
  },
  {
    id: 2,
    badge: "✦ Sci-Fi & Cyberpunk",
    title: "Chronicles of the",
    italic: "Distant Stars",
    description:
      "Lose yourself in mind-bending cosmic anomalies and futuristic cyber realms. Handpicked science fiction masterpieces await your discovery.",
    bookTitle: "NEON\nECHOES\n2099",
    bookSubtitle: "A Cyber Odyssey",
    accent: "#34D399",
    bookBg: "from-[#0D1E2D] to-[#0A0D14]",
    glowColor: "rgba(52,211,153,0.07)",
  },
  {
    id: 3,
    badge: "✦ Dark Psychological Thriller",
    title: "Echoes Beyond the",
    italic: "Shadowed Veil",
    description:
      "Unravel twisted mysteries and psychological depths that will keep you awake. Dive deep into the unwritten secrets of master thrillers.",
    bookTitle: "WHISPERS\nIN THE\nDARK",
    bookSubtitle: "A Thriller Masterpiece",
    accent: "#A78BFA",
    bookBg: "from-[#201324] to-[#0C0812]",
    glowColor: "rgba(167,139,250,0.08)",
  },
];

// ── Animation Variants ─────────────────────────────────────────────────────────

const textVariants = {
  enter:  { opacity: 0, y: 28 },
  center: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   { opacity: 0, y: -20, transition: { duration: 0.35, ease: "easeIn" } },
};

const bookVariants = {
  enter:  (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, rotateY: dir > 0 ? 25 : -25 }),
  center: { opacity: 1, x: 0, rotateY: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:   (dir) => ({ opacity: 0, x: dir < 0 ? 80 : -80, rotateY: dir < 0 ? 25 : -25, transition: { duration: 0.4, ease: "easeIn" } }),
};

const badgeVariants = {
  enter:  { opacity: 0, scale: 0.85 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.4, delay: 0.1 } },
  exit:   { opacity: 0, scale: 0.9, transition: { duration: 0.25 } },
};

const staggerChildren = {
  center: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const fadeUp = {
  enter:  { opacity: 0, y: 20 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit:   { opacity: 0,       transition: { duration: 0.2 } },
};

// ── Book Cover ─────────────────────────────────────────────────────────────────

function BookCover({ slide }) {
  return (
    <div className="relative" style={{ perspective: 1200 }}>
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-3xl blur-2xl scale-90 translate-y-4 pointer-events-none"
        style={{ background: slide.glowColor }}
      />

      {/* Card frame */}
      <div
        className="relative p-5 rounded-3xl border"
        style={{
          background: "rgba(15,20,30,0.6)",
          borderColor: `${slide.accent}18`,
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Book */}
        <div
          className={`w-[260px] sm:w-[300px] aspect-[3/4] bg-gradient-to-b ${slide.bookBg} rounded-2xl overflow-hidden border`}
          style={{ borderColor: `${slide.accent}20` }}
        >
          <div className="w-full h-full p-6 flex flex-col justify-between items-center text-center">
            {/* Top label */}
            <div className="flex flex-col items-center gap-2 w-full">
              <span
                className="text-[9px] tracking-[0.35em] uppercase font-bold"
                style={{ color: slide.accent }}
              >
                Fable Original
              </span>
              <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${slide.accent}30, transparent)` }} />
            </div>

            {/* Book title */}
            <div className="flex flex-col items-center gap-3">
              <h2
                className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold tracking-widest leading-tight whitespace-pre-line"
                style={{ color: slide.accent }}
              >
                {slide.bookTitle}
              </h2>
              <div className="w-8 h-px" style={{ background: `${slide.accent}50` }} />
              <p className="text-[11px] tracking-widest uppercase font-light" style={{ color: `${slide.accent}80` }}>
                {slide.bookSubtitle}
              </p>
            </div>

            {/* Bottom */}
            <div className="flex flex-col items-center gap-1.5 w-full">
              <div className="w-full h-px" style={{ background: `linear-gradient(90deg, transparent, ${slide.accent}30, transparent)` }} />
              <span className="text-[9px] tracking-[0.25em] uppercase font-semibold text-gray-500">
                Bestseller
              </span>
            </div>
          </div>
        </div>

        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0, x: 16, y: -16 }}
          animate={{ opacity: 1, x: 0,  y: 0  }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="absolute -top-3 -right-3 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg"
          style={{
            background: `${slide.accent}18`,
            border: `1px solid ${slide.accent}35`,
            color: slide.accent,
          }}
        >
          New Release
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -16, y: 16 }}
          animate={{ opacity: 1, x: 0,  y: 0  }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="absolute -bottom-3 -left-3 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg bg-[#0B0F17] border border-white/10 text-gray-400"
        >
          ★ 4.9 Rating
        </motion.div>
      </div>
    </div>
  );
}

// ── Main Banner ────────────────────────────────────────────────────────────────

export default function Banner() {
  const [[page, direction], setPage] = useState([0, 0]);
  const activeIndex = Math.abs(page % SLIDES.length);
  const slide       = SLIDES[activeIndex];

  const paginate = (dir) => setPage(([p]) => [p + dir, dir]);

  // Auto-play
  useEffect(() => {
    const t = setInterval(() => paginate(1), 6000);
    return () => clearInterval(t);
  }, [page]);

  return (
    <section className="relative bg-[#0B0F17] text-white min-h-[calc(100vh-72px)] flex items-center overflow-hidden select-none">

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Ambient orbs */}
        <motion.div
          key={slide.id + "orb1"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px]"
          style={{ background: slide.glowColor }}
        />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] bg-indigo-500/5" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-10 py-16">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={page}
            custom={direction}
            variants={staggerChildren}
            initial="enter"
            animate="center"
            exit="exit"
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
          >
            {/* ── Left: Text ── */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6">

              {/* Badge */}
              <motion.span
                variants={badgeVariants}
                className="px-4 py-1.5 text-[11px] uppercase tracking-[0.22em] font-bold rounded-full border"
                style={{
                  color: slide.accent,
                  borderColor: `${slide.accent}35`,
                  background: `${slide.accent}12`,
                }}
              >
                {slide.badge}
              </motion.span>

              {/* Heading */}
              <motion.h1
                variants={textVariants}
                className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.12]"
              >
                {slide.title}
                <br />
                <span
                  className="italic font-['Playfair_Display'] transition-colors duration-700"
                  style={{ color: slide.accent }}
                >
                  {slide.italic}
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="text-gray-400 text-base sm:text-lg max-w-lg leading-relaxed font-light"
              >
                {slide.description}
              </motion.p>

              {/* Stats row */}
              <motion.div variants={fadeUp} className="flex items-center gap-6">
                {[["12K+", "Authors"], ["48K+", "Ebooks"], ["200K+", "Readers"]].map(([num, label]) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-xl font-bold" style={{ color: slide.accent }}>{num}</span>
                    <span className="text-[11px] text-gray-500 uppercase tracking-wider">{label}</span>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link
                  href="/browse-ebooks"
                  className="px-8 py-3.5 rounded-xl font-bold text-sm text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                  style={{
                    background: slide.accent,
                    color: "#0B0F17",
                    boxShadow: `0 4px 24px ${slide.accent}30`,
                  }}
                >
                  Browse Ebooks
                </Link>
                <Link
                  href="/dashboard/writer"
                  className="px-8 py-3.5 rounded-xl font-semibold text-sm text-center text-gray-300 border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition-all duration-200"
                >
                  Become a Writer
                </Link>
              </motion.div>
            </div>

            {/* ── Right: Book ── */}
            <motion.div
              variants={bookVariants}
              custom={direction}
              className="lg:col-span-5 flex justify-center lg:justify-end"
              style={{ transformStyle: "preserve-3d" }}
            >
              <BookCover slide={slide} />
            </motion.div>

          </motion.div>
        </AnimatePresence>

        {/* ── Controls ── */}
        <div className="flex items-center justify-between mt-14">
          {/* Dots */}
          <div className="flex items-center gap-2.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage([i, i > activeIndex ? 1 : -1])}
                aria-label={`Go to slide ${i + 1}`}
                className="h-1.5 rounded-full transition-all duration-400"
                style={{
                  width: i === activeIndex ? 32 : 8,
                  background: i === activeIndex ? slide.accent : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/[0.04] text-gray-400 hover:text-white hover:border-white/20 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-200"
              style={{
                background: `${slide.accent}18`,
                borderColor: `${slide.accent}35`,
                color: slide.accent,
              }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}