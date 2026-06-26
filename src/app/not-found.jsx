import React from 'react';
import Link from 'next/link';
import { CircleExclamation } from '@gravity-ui/icons';

const NotFoundPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#090D16] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden select-none">
      
      {/* 🌌 ১. প্রিমিয়াম ব্যাকগ্রাউন্ড গ্রিড ও নিওন মেস (Cyber-Luxury Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      
      {/* 🔮 অ্যাম্বিয়েন্ট লাইটিং গ্লো */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#E5BA73]/5 via-transparent to-purple-500/5 rounded-full blur-[140px] pointer-events-none animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#E5BA73]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 📔 মেইন কনটেন্ট এরিয়া */}
      <div className="text-center max-w-lg z-10 flex flex-col items-center">
        
        {/* 🎨 সিনেমাটিক ৪MD নিওন আর্টওয়ার্ক */}
        <div className="relative mb-4 select-none pointer-events-none flex items-center justify-center w-full h-[180px]">
          {/* গ্লসি ব্যাকগ্রাউন্ড ৪MD ওয়াটারমার্ক */}
          <h1 className="text-[140px] md:text-[180px] font-black tracking-tighter leading-none bg-gradient-to-b from-[#1A202C] via-[#111622] to-transparent bg-clip-text text-transparent opacity-80 font-sans">
            404
          </h1>
          
          {/* ৪MD এর ওপর ভাসমান লাক্সারি গ্রাভিটি আইকন */}
          <div className="absolute inset-0 flex items-center justify-center animate-[tbody_4s_ease-in-out_infinite] mt-4">
            <div className="p-5 bg-[#090D16]/90 border border-[#E5BA73]/30 rounded-3xl shadow-[0_0_50px_rgba(229,186,115,0.15)] text-[#E5BA73] backdrop-blur-md relative group">
              <div className="absolute inset-0 rounded-3xl border border-[#E5BA73]/10 animate-ping opacity-25" />
              <CircleExclamation width={42} height={42} strokeWidth={1.2} />
            </div>
          </div>
        </div>

        {/* 📝 প্রিমিয়াম টাইপোগ্রাফি */}
        <div className="space-y-3 mt-4">
          <h2 className="text-2xl font-bold tracking-[0.25em] bg-gradient-to-r from-[#E5BA73] via-[#fff5e4] to-[#E5BA73] bg-clip-text text-transparent uppercase">
            Page Not Found
          </h2>
          
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent via-[#E5BA73]/50 to-transparent mx-auto" />
          
          <p className="text-xs md:text-[13px] text-gray-400 font-medium tracking-wide leading-relaxed max-w-sm mx-auto pt-2">
            The literary world you are looking for doesn't exist, or has been safely archived in another section of our library.
          </p>
        </div>

        {/* 👑 আল্ট্রা-লাক্সারি অ্যাকশন বাটন */}
        <div className="mt-10">
          <Link 
            href="/"
            className="group relative inline-flex items-center justify-center bg-[#E5BA73] text-[#090D16] font-bold text-[11px] tracking-[0.2em] uppercase px-10 py-4 rounded-xl transition-all duration-300 hover:bg-[#fff5e4] shadow-[0_0_30px_rgba(229,186,115,0.1)] hover:shadow-[0_0_35px_rgba(229,186,115,0.3)] active:scale-[0.98] overflow-hidden"
          >
            {/* মডার্ন রিফ্লেক্টিভ গ্লিন্ট লাইন হোভার ইফেক্ট */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
            
            Return to Home
          </Link>
        </div>
      </div>

      {/* 🔒 এস্থেটিক ফুটার ব্র্যান্ডিং ও সেফটি ব্যাজ */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center opacity-30 text-[9px] tracking-[0.15em] uppercase font-mono hidden sm:flex">
        <div>Fable Library System v1.0</div>
        <div className="w-1.5 h-1.5 bg-[#E5BA73] rounded-full animate-pulse" />
        <div>Error Code: 404_NOT_FOUND</div>
      </div>
    </div>
  );
};

export default NotFoundPage;