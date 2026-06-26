"use client";

import { authClient } from '@/lib/auth-client';
import React from 'react';
import { BsSearch, BsBell, BsQuestionCircle } from 'react-icons/bs';
import NavbarProfileDropdown from '../NavbarProfileDropdown';

export default function DashboardNavbar() {
  // ডামি ডাটা (আপনি পরবর্তীতে আপনার Auth Context থেকে রিয়েল ডাটা বসিয়ে নেবেন)
  const { data: session, isPending } = authClient.useSession();
    const user = session?.user
//   const user = {
//     name: "Admin User",
//     role: "System Master",
//     avatar: "https://i.ibb.co.com/v4X4wHz/admin-avatar.png" // আপনার ইমেজ পাথ বা ডামি ইউআরএল
//   };

  return (
    <header className="w-full flex items-center justify-between border-b border-gray-900/40 bg-[#0B0F17] px-6 py-4 lg:px-10">
      
      {/* 🔍 বাম দিক: সার্চ বার */}
      <div className="relative w-full max-w-[400px]">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
          <BsSearch className="w-4 h-4" />
        </span>
        <input 
          type="text" 
          placeholder="Search transactions, users, ebooks..." 
          className="w-full bg-[#06090F] border border-gray-800 text-sm rounded-xl pl-10 pr-4 py-2 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-amber-500/55 transition-all"
        />
      </div>

      {/* 🔔 ডান দিক: নোটিফিকেশন, হেল্প এবং ইউজার প্রোফাইল */}
      <div className="flex items-center gap-6">
        
        {/* আইকন বাটন সমূহ */}
        <div className="flex items-center gap-4 text-gray-400">
          <button className="p-1.5 hover:text-white rounded-lg hover:bg-gray-800/40 transition-all relative">
            <BsBell className="w-5 h-5" />
            {/* নোটিফিকেশন ডট */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>
          
          <button className="p-1.5 hover:text-white rounded-lg hover:bg-gray-800/40 transition-all">
            <BsQuestionCircle className="w-5 h-5" />
          </button>
        </div>

        {/* খাড়া ডিভাইডার লাইন */}
        <div className="h-8 w-[1px] bg-gray-800/60"></div>

        {/* প্রোফাইল সেকশন (ঠিক ফিকমার মতো) */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-gray-200 leading-tight">{user?.name}</p>
            <p className="text-[11px] font-medium text-gray-500 tracking-wide mt-0.5">{user?.role}</p>
          </div>
          <div className="relative">
             <NavbarProfileDropdown/>
            {/* অ্যাক্টিভ স্ট্যাটাস ডট */}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0B0F17]"></span>
          </div>
        </div>

      </div>
    </header>
  );
}