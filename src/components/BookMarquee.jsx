"use client";

import Marquee from "react-fast-marquee";
import {
  BookOpen,
  StarFill,
  ShieldCheck,
  CrownDiamond,
  Sparkles,
  Firewall,
} from "@gravity-ui/icons";
import { PiMaskSad } from "react-icons/pi";
import { BsLightning } from "react-icons/bs";

const ITEMS = [
  { icon: BsLightning,  label: "Trending",    value: "Sci-Fi & Cyberpunk",       accent: "#60A5FA" },
  { icon: Firewall,     label: "Top Writer",  value: "Julian Vance",             accent: "#F87171" },
  { icon: BookOpen,     label: "Available",   value: "500+ Original Ebooks",     accent: "#E5BA73" },
  { icon: Sparkles,     label: "New Release", value: "Exclusive Romance Drops",  accent: "#F472B6" },
  { icon: ShieldCheck,  label: "Secured by",  value: "Stripe Payments",          accent: "#34D399" },
  { icon: PiMaskSad,    label: "Just Added",  value: "Mystery & Thriller",       accent: "#A78BFA" },
  { icon: CrownDiamond, label: "Featured",    value: "Editor's Pick This Week",  accent: "#E5BA73" },
  { icon: StarFill,     label: "Genre",       value: "Fantasy & Dark Academia",  accent: "#818CF8" },
];

function MarqueeItem({ icon: Icon, label, value, accent }) {
  return (
    <div
      className="group flex items-center gap-3 mx-3 px-4 py-2 rounded-xl border cursor-pointer transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.02)",
        borderColor: "rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${accent}30`;
        e.currentTarget.style.background  = `${accent}08`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
        e.currentTarget.style.background  = "rgba(255,255,255,0.02)";
      }}
    >
      {/* Icon box */}
      <span
        className="w-6 h-6 flex items-center justify-center rounded-lg flex-shrink-0 transition-all duration-300"
        style={{
          background: `${accent}12`,
          border: `1px solid ${accent}25`,
        }}
      >
        <Icon
          className="w-3 h-3 transition-colors duration-300"
          style={{ color: accent }}
        />
      </span>

      {/* Text */}
      <span className="text-[11px] tracking-wide whitespace-nowrap">
        <span className="text-gray-600 uppercase text-[10px] font-medium">{label} </span>
        <span className="text-gray-400 font-semibold group-hover:text-gray-200 transition-colors duration-300">
          {value}
        </span>
      </span>

      {/* Separator */}
      <span className="w-px h-3 bg-white/[0.06] flex-shrink-0" />
    </div>
  );
}

export default function BookMarquee() {
  return (
    <section
      className="relative w-full py-3.5 overflow-hidden border-y"
      style={{
        background: "rgba(4,6,14,0.98)",
        borderColor: "rgba(255,255,255,0.04)",
      }}
    >
      {/* Left fade */}
      <div
        className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgb(4,6,14) 20%, transparent)" }}
      />
      {/* Right fade */}
      <div
        className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(270deg, rgb(4,6,14) 20%, transparent)" }}
      />

      <Marquee gradient={false} speed={36} pauseOnHover direction="left">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <MarqueeItem key={i} {...item} />
        ))}
      </Marquee>
    </section>
  );
}