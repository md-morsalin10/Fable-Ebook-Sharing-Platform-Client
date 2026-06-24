import { getPaymentDataById } from '@/lib/api/bookPayment';
import { getUserSeason } from '@/lib/core/Session';
import React from 'react';
import Image from 'next/image';
import { Lock } from '@gravity-ui/icons';

const ReaderProfilePage = async () => {
    const user = await getUserSeason();
    
    const userData = {
        name: user?.name || "Reader Name",
        email: user?.email || "reader@fable.com",
        image: user?.image || "https://i.ibb.co.com/HLX9ZRdG/new2.png",
        createdAt: user?.createdAt?.$date || user?.createdAt,
        role: user?.role || "reader"
    };

    const paymentData = (await getPaymentDataById(user?.id)) || [];
    const librarySize = paymentData.length;

    const memberSince = userData.createdAt 
        ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })
        : 'Recently';

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 min-h-screen text-gray-300 font-sans">
            
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-wide">Reader Profile</h1>
                <p className="text-xs md:text-sm text-gray-400 mt-2 max-w-md mx-auto">
                    Manage your literary presence and digital library settings within the Fable ecosystem.
                </p>
            </div>

            <div className="bg-[#0B0F17]/60 border border-gray-800/60 rounded-3xl p-6 md:p-10 shadow-2xl backdrop-blur-md relative mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="relative w-36 h-36 rounded-full p-1 bg-gradient-to-b from-[#E5BA73] to-transparent shadow-xl">
                            <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-950 border border-gray-900">
                                <Image 
                                    src={userData.image} 
                                    alt={userData.name} 
                                    fill 
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <span className="absolute bottom-2 right-2 bg-[#E5BA73] text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow">
                                ✓
                            </span>
                        </div>
                        
                        <button className="mt-5 px-4 py-2 bg-[#E5BA73]/10 hover:bg-[#E5BA73]/20 text-[#E5BA73] text-xs font-semibold rounded-lg border border-[#E5BA73]/30 transition-all">
                            Edit Avatar
                        </button>
                        
                        <span className="mt-3 inline-block text-[10px] px-3 py-1 font-bold tracking-widest bg-gray-800/60 text-gray-400 rounded-full uppercase border border-gray-700/50">
                            {userData.role}
                        </span>
                    </div>

                    <div className="md:col-span-2 space-y-5">
                        <div>
                            <label className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block mb-2">Full Name</label>
                            <div className="flex items-center justify-between w-full bg-[#111622]/60 border border-gray-800/80 rounded-xl px-4 py-3.5 text-white font-serif text-base">
                                <span>{userData.name}</span>
                                <Lock className="w-4 h-4 text-gray-600" />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-bold tracking-wider text-gray-500 uppercase block mb-2">Email Address</label>
                            <div className="flex items-center justify-between w-full bg-[#111622]/60 border border-gray-800/80 rounded-xl px-4 py-3.5 text-gray-300 text-sm">
                                <span>{userData.email}</span>
                                <Lock className="w-4 h-4 text-gray-600" />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800/50 text-left">
                            <div>
                                <span className="text-[9px] font-bold tracking-wider text-gray-500 uppercase block">Member Since</span>
                                <span className="text-xs font-semibold text-[#E5BA73] block mt-1">{memberSince}</span>
                            </div>
                            <div>
                                <span className="text-[9px] font-bold tracking-wider text-gray-500 uppercase block">Library Size</span>
                                <span className="text-xs font-semibold text-gray-200 block mt-1">{librarySize} Ebooks</span>
                            </div>
                            <div>
                                <span className="text-[9px] font-bold tracking-wider text-gray-500 uppercase block">Achievements</span>
                                <span className="text-xs font-semibold text-gray-200 block mt-1">0 Unlocked</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 pt-4">
                            <button className="px-5 py-2.5 bg-transparent border border-purple-500/40 text-purple-300 hover:bg-purple-500/10 text-xs font-semibold rounded-lg transition-all shadow-md">
                                Update Preferences
                            </button>
                            <button className="text-xs text-gray-400 hover:text-white transition-colors">
                                View Public Profile
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <div className="bg-[#0B0F17]/40 border border-gray-800/60 rounded-2xl p-5 shadow-lg">
                    <span className="text-lg block mb-2">📖</span>
                    <h3 className="text-2xl font-serif font-bold text-white">{librarySize}</h3>
                    <p className="text-[10px] tracking-wider font-semibold text-gray-500 uppercase mt-1">Books Purchased</p>
                </div>

                <div className="bg-[#0B0F17]/40 border border-gray-800/60 rounded-2xl p-5 shadow-lg">
                    <span className="text-lg block mb-2">⚡</span>
                    <h3 className="text-2xl font-serif font-bold text-white">1</h3>
                    <p className="text-[10px] tracking-wider font-semibold text-gray-500 uppercase mt-1">Day Reading Streak</p>
                </div>

                <div className="bg-[#0B0F17]/40 border border-gray-800/60 rounded-2xl p-5 shadow-lg">
                    <span className="text-lg block mb-2">✍️</span>
                    <h3 className="text-2xl font-serif font-bold text-white">0</h3>
                    <p className="text-[10px] tracking-wider font-semibold text-gray-500 uppercase mt-1">Total Annotations</p>
                </div>
            </div>

        </div>
    );
};

export default ReaderProfilePage;