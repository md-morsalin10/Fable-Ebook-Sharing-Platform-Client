"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathName = usePathname()
  if(pathName.includes("dashboard")){
    return null
  }
  return (
    <footer className="bg-[#06090F] text-white border-t border-gray-950 py-16 px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
        
        {/* Left Section: Brand Logo & Description */}
        <div className="md:col-span-4 space-y-4">
          <Link href="/" className="text-2xl font-serif font-bold text-[#E5BA73] tracking-wide hover:opacity-90 transition-opacity">
            Fable
          </Link>
          <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
            © 2024 Fable. The Private Digital Gallery for Authors. Elevating literature through curated digital experiences.
          </p>
        </div>

        {/* Center Left Section: Quick Links */}
        <div className="md:col-span-2.5 col-span-1">
          <h4 className="text-xs uppercase font-semibold text-gray-300 tracking-wider mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/about" className="text-xs text-gray-400 hover:text-[#E5BA73] transition-colors font-light">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/careers" className="text-xs text-gray-400 hover:text-[#E5BA73] transition-colors font-light">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-xs text-gray-400 hover:text-[#E5BA73] transition-colors font-light">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-xs text-gray-400 hover:text-[#E5BA73] transition-colors font-light">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Center Right Section: Community */}
        <div className="md:col-span-2.5 col-span-1">
          <h4 className="text-xs uppercase font-semibold text-gray-300 tracking-wider mb-4">
            Community
          </h4>
          <ul className="space-y-2.5">
            <li>
              <Link href="/writers" className="text-xs text-gray-400 hover:text-[#E5BA73] transition-colors font-light">
                For Writers
              </Link>
            </li>
            <li>
              <Link href="/newsletter" className="text-xs text-gray-400 hover:text-[#E5BA73] transition-colors font-light">
                Newsletter
              </Link>
            </li>
            <li>
              <Link href="/support" className="text-xs text-gray-400 hover:text-[#E5BA73] transition-colors font-light">
                Contact Support
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section: Newsletter Form without Hydration overhead */}
        <div className="md:col-span-3 space-y-4">
          <div>
            <h4 className="text-xs uppercase font-semibold text-gray-300 tracking-wider mb-2">
              Newsletter
            </h4>
            <p className="text-gray-400 text-xs font-light leading-relaxed">
              Subscribe to get book drops and writer spotlights.
            </p>
          </div>

          {/* Pure HTML Form - Ready for Next.js Server Actions */}
          <form className="flex items-center gap-2">
            <input
              type="email"
              name="email"
              required
              placeholder="Your email"
              className="w-full bg-[#0E131F] border border-gray-800 text-xs rounded-xl px-4 py-3 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-gray-700 transition-colors"
            />
            <button
              type="submit"
              className="bg-[#E5BA73] text-[#0B0F17] hover:bg-[#d4a75e] font-medium text-xs px-5 py-3 rounded-xl transition-all active:scale-[0.98]"
            >
              Join
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
};

export default Footer;