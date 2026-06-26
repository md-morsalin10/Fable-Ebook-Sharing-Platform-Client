import React from 'react';

const GlobalLoadingPage = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070a12]/85 backdrop-blur-md text-white select-none pointer-events-auto">
      
      {/* 🔮 Background ambient neon glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#E5BA73]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 👑 Premium Spinner Core */}
      <div className="relative flex items-center justify-center w-24 h-24">
        
        <div className="absolute inset-0 border border-dashed border-[#E5BA73]/20 rounded-full animate-[spin_8s_linear_infinite]" />
        
        <div className="absolute w-16 h-16 border-2 border-gray-800/40 border-t-[#E5BA73] rounded-full animate-[spin_1.5s_cubic-bezier(0.53,0.21,0.29,0.67)_infinite]" />
        

        <div className="absolute w-10 h-10 border border-transparent border-t-[#E5BA73]/60 border-b-[#E5BA73]/40 rounded-full animate-[spin_1s_linear_infinite] reverse" />
       
        <div className="absolute w-2 h-2 bg-[#E5BA73] rounded-full shadow-[0_0_15px_#E5BA73]" />
      </div>
      
   
      <div className="mt-8 text-center relative z-10 space-y-1.5">
        <h3 className="text-sm font-semibold tracking-[0.3em] text-[#E5BA73] uppercase bg-gradient-to-r from-[#E5BA73] via-[#fff5e4] to-[#E5BA73] bg-clip-text text-transparent animate-pulse">
          Processing
        </h3>
        
        <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase">
          Securing connection...
        </p>
      </div>

      {/* 🔒 Footer Micro-copy */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-40">
        <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
        <span className="text-[9px] uppercase tracking-widest text-gray-400 font-medium">
          Fable Encryption Active
        </span>
      </div>
    </div>
  );
};

export default GlobalLoadingPage;