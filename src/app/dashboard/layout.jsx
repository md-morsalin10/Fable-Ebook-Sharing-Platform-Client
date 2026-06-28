import DashboardNavbar from '@/components/Dashboard/DasboardNavbar';
import { DashboardSideBar } from '@/components/Dashboard/DashboardSideBar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className='flex min-h-screen w-full bg-[#06090F] text-white font-sans'>

            {/* Left Side: Fixed Sidebar */}
            <aside className='h-screen sticky top-0 flex-shrink-0 z-10 border-r border-gray-900/40 bg-[#0B0F17]'>
                <DashboardSideBar />
            </aside>

            {/* Right Side: Main Content Wrapper */}
            {/* 💡 h-screen overflow-hidden বদলে min-h-screen করা হয়েছে যাতে কন্টেন্ট ছোট হলে স্ক্রিন ভেঙে নিচে অতিরিক্ত কালো অংশ না ঝোলে */}
            <div className='flex-1 flex flex-col min-w-0 min-h-screen bg-[#06090F]'>
                <DashboardNavbar />

                {/* Scrollable Main Content Area with Figma Padding */}
                {/* 💡 এখানে p-6 md:p-8 lg:p-10 প্যাডিংটি রাখা হয়েছে, তাই আপনার পেজ ফাইল থেকে এক্সট্রা প্যাডিং বা মার্জিন দরকার হবে না */}
                <main className='flex-1 p-6 md:p-8 lg:p-10 w-full max-w-[1600px] mx-auto custom-scrollbar'>
                    {children}
                </main>

            </div>
        </div>
    );
};

export default DashboardLayout;