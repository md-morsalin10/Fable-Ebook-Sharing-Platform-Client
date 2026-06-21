"use client";

import React, { useState, useEffect } from 'react';
import BooksCard from './BooksCard';

export default function BrowseEbooksClient({ initialBooks }) {
    // Search, Filter, Sort States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [sortBy, setSortBy] = useState('newest');

    // Pagination States
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // কোনো ফিল্টার পরিবর্তন হলে পেজিনেশন রিসেট হবে
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedGenre, sortBy]);

    // 🎯 ফিল্টারিং লজিক
    const filteredBooks = initialBooks
        .filter((book) => {
            const matchesSearch = 
                book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.writerName?.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesGenre = selectedGenre === 'all' || book.genre?.toLowerCase() === selectedGenre.toLowerCase();

            return matchesSearch && matchesGenre;
        })
        .sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'newest') return new Date(b.dateUploaded) - new Date(a.dateUploaded);
            return 0;
        });

    // 📄 পেজিনেশন হিসাব-নিকাশ
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

    // ফিল্টার পুরোপুরি পরিষ্কার করার ফাংশন
    const handleClearFilters = () => {
        setSearchTerm('');
        setSelectedGenre('all');
        setSortBy('newest');
    };

    return (
        <>
            {/* 🔍 Filters Panel */}
            <div className="bg-[#0B0F17] border border-gray-800/80 rounded-2xl p-5 mb-10 shadow-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                {/* Search */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase text-gray-400">Search Ebook</label>
                    <input 
                        type="text" 
                        placeholder="Search by title or writer..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#121A29] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E5BA73] transition-colors"
                    />
                </div>

                {/* Genre */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase text-gray-400">Filter Genre</label>
                    <select 
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="w-full bg-[#121A29] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E5BA73] transition-colors cursor-pointer"
                    >
                        <option value="all">All Genres</option>
                        <option value="romance">Romance</option>
                        <option value="mystery">Mystery</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="sci-fi">Sci-Fi</option>
                        <option value="horror">Horror</option>
                    </select>
                </div>

                {/* Sort */}
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase text-gray-400">Sort By</label>
                    <select 
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-[#121A29] border border-gray-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E5BA73] transition-colors cursor-pointer"
                    >
                        <option value="newest">Newest Uploads</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>

                {/* Reset Buttons */}
                <button 
                    onClick={handleClearFilters}
                    className="w-full bg-gray-800/40 hover:bg-gray-800 text-xs text-gray-300 font-semibold py-3 px-4 rounded-xl border border-gray-700/60 transition-colors h-[42px]"
                >
                    Clear Filters
                </button>
            </div>

            {/* 📚 Content Area */}
            {currentItems.length === 0 ? (
                /* ✨ Friendly Message Container when no ebooks match */
                <div className="bg-[#0B0F17] border border-gray-800/60 rounded-2xl p-12 md:p-16 text-center max-w-xl mx-auto shadow-2xl mt-6">
                    <div className="w-16 h-16 bg-amber-500/10 text-[#E5BA73] rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                        🔍
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-wide">No Ebooks Found</h3>
                    <p className="text-gray-400 text-sm mt-2 max-w-sm mx-auto leading-relaxed">
                        We couldn't find any books matching your specific filters or search keywords. Try adjusting them or reset to see all books!
                    </p>
                    <button
                        onClick={handleClearFilters}
                        className="mt-6 px-6 py-2.5 bg-[#E5BA73] hover:bg-[#d4ab63] text-[#0E1420] text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-lg"
                    >
                        Reset All Filters
                    </button>
                </div>
            ) : (
                <>
                    {/* Responsive Grid View */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentItems.map((book) => (
                            <BooksCard key={book._id?.$oid || book._id} book={book} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-center gap-4 mt-12">
                            <button 
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 bg-[#0B0F17] border border-gray-800 rounded-xl text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                Previous
                            </button>
                            
                            <span className="text-xs text-gray-400 font-medium">
                                Page <strong className="text-white font-bold">{currentPage}</strong> of <strong className="text-white font-bold">{totalPages}</strong>
                            </span>

                            <button 
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 bg-[#0B0F17] border border-gray-800 rounded-xl text-xs text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
}