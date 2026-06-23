import React, { Suspense } from 'react';
import Link from 'next/link';
import EbookDetailsClient from '@/components/Books/EbookDetailsClient';
import { getBookById } from '@/lib/api/books';

// 💀 আপনার তৈরি করা Skeleton Loader
const DetailsSkeleton = () => (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 animate-pulse">
        <div className="md:col-span-4 flex flex-col gap-4">
            <div className="bg-gray-800/40 aspect-[3/4] w-full rounded-2xl border border-gray-800"></div>
            <div className="grid grid-cols-2 gap-4">
                <div className="h-16 bg-gray-800/40 rounded-xl"></div>
                <div className="h-16 bg-gray-800/40 rounded-xl"></div>
            </div>
        </div>
        <div className="md:col-span-8 space-y-6">
            <div className="h-4 bg-gray-800/40 rounded w-16"></div>
            <div className="h-10 bg-gray-800/40 rounded w-3/4"></div>
            <div className="h-12 bg-gray-800/40 rounded-full w-1/3"></div>
            <div className="h-8 bg-gray-800/40 rounded w-24"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-800/40 rounded w-full"></div>
                <div className="h-4 bg-gray-800/40 rounded w-full"></div>
                <div className="h-4 bg-gray-800/40 rounded w-5/6"></div>
            </div>
            <div className="flex gap-4 pt-4">
                <div className="h-12 bg-gray-800/40 rounded-xl w-44"></div>
                <div className="h-12 bg-gray-800/40 rounded-xl w-44"></div>
            </div>
        </div>
    </div>
);

// 📦 এই নতুন ছোট কম্পোনেন্টটি ডেটা নিয়ে আসবে এবং Suspense-কে ট্রিগার করবে
const BookDetailsContent = async ({ id }) => {
    let book = null;
    try {
        book = await getBookById(id);
    } catch (err) {
        console.error("Error fetching book details:", err);
    }

    if (!book) {
        return (
            <div className="min-h-[70vh] bg-[#0E1420] text-gray-100 flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center text-2xl mb-4">📖</div>
                <h1 className="text-xl font-bold tracking-wide">Ebook Not Found</h1>
                <p className="text-gray-400 text-sm mt-2 text-center max-w-sm">
                    The ebook you are looking for might have been removed, or the link is invalid.
                </p>
                <Link href="/browse-ebooks" className="mt-6 text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-[#E5BA73] px-5 py-2.5 rounded-xl border border-gray-700 transition-colors">
                    Back to Browse
                </Link>
            </div>
        );
    }

    return <EbookDetailsClient book={book} />;
};

// 🏠 মেইন পেজ কম্পোনেন্ট
const EbookDetailsPage = async ({ params }) => {
    const { id } = await params;

    return (
        <div className="min-h-screen bg-[#0E1420] text-gray-100 p-6 md:p-12 lg:p-16 font-sans">
            {/* Breadcrumb */}
            <div className="max-w-6xl mx-auto mb-8 text-xs text-gray-500 tracking-wider uppercase flex items-center gap-2">
                <Link href="/browse-ebooks" className="hover:text-gray-300 transition-colors">Ebooks</Link>
                <span>/</span>
                <span className="text-gray-400">Details</span>
            </div>

            {/* 🎯 এখন এটি পারফেক্টলি কাজ করবে কারণ ডেটা ফেচিং কম্পোনেন্টটি এর ভেতরে আছে */}
            <Suspense fallback={<DetailsSkeleton />}>
                <BookDetailsContent id={id} />
            </Suspense>
        </div>
    );
};

export default EbookDetailsPage;