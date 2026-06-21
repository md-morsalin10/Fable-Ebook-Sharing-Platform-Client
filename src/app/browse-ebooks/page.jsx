import BrowseEbooksClient from '@/components/Books/BrowseEbooksClient';
import { getBooks } from '@/lib/api/books';
import React, { Suspense } from 'react';


// 💀 Skeleton Loader Component while server fetches data
const BrowseSkeleton = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-4 animate-pulse">
                <div className="bg-gray-800/60 aspect-[3/4] rounded-xl mb-4 w-full"></div>
                <div className="h-4 bg-gray-800/60 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-800/60 rounded w-1/2 mb-4"></div>
                <div className="flex justify-between items-center pt-2 border-t border-gray-900">
                    <div className="h-4 bg-gray-800/60 rounded w-1/4"></div>
                    <div className="h-6 bg-gray-800/60 rounded w-1/3"></div>
                </div>
            </div>
        ))}
    </div>
);

const AllEbooks = async () => {
    // ব্যাকএন্ড API থেকে ডেটা ফেচিং
    let books = [];
    let error = null;
    
    try {
        books = await getBooks() || [];
    } catch (err) {
        console.error("Error fetching books:", err);
        error = "Failed to load ebooks. Please try again later.";
    }

    return (
        <div className="min-h-screen bg-[#0E1420] text-gray-100 p-6 lg:p-10 font-sans">
            {/* 📑 Header */}
            <div className="max-w-7xl mx-auto mb-10 text-center md:text-left">
                <h1 className="text-3xl font-bold text-[#E5BA73] tracking-wide">Browse Ebooks</h1>
                <p className="text-sm text-gray-400 mt-2">Explore, search, and discover your next favorite book from our platform.</p>
            </div>

            {/* ⚠️ Error State Handling */}
            {error ? (
                <div className="max-w-xl mx-auto text-center bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl">
                    <p className="font-medium">{error}</p>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto">
                    <Suspense fallback={<BrowseSkeleton />}>
                        <BrowseEbooksClient initialBooks={books} />
                    </Suspense>
                </div>
            )}
        </div>
    );
};

export default AllEbooks;