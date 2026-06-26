import React from 'react';

export default function DashboardGlobalLoader() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] w-full text-white p-6">
            {/* 🌀 গ্লোয়িং থ্রি-ডট বা রিং স্পিনার */}
            <div className="relative flex items-center justify-center w-20 h-20 mb-6">
                <div className="absolute w-full h-full border-4 border-t-[#E5BA73] border-r-transparent border-b-[#3b82f6] border-l-transparent rounded-full animate-spin"></div>
                <div className="absolute w-12 h-12 border-4 border-t-transparent border-r-[#00C49F] border-b-transparent border-l-[#a855f7] rounded-full animate-spin [animation-duration:1.5s] reverse"></div>
                <div className="w-4 h-4 bg-white rounded-full animate-ping"></div>
            </div>

            <div className="text-center space-y-2">
                <h3 className="text-xl font-bold tracking-wider bg-gradient-to-r from-[#E5BA73] via-white to-[#3b82f6] bg-clip-text text-transparent animate-pulse">
                    Loading Components
                </h3>
                <p className="text-xs font-mono text-gray-500 tracking-widest uppercase animate-pulse">
                    Please wait...
                </p>
            </div>
        </div>
    );
}