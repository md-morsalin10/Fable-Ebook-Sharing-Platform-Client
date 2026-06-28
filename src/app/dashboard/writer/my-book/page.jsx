import { getBooksByWriterId } from '@/lib/api/books';
import { getUserSeason, getUserToken } from '@/lib/core/Session';
import Image from 'next/image';
import React from 'react';
import { Book } from '@gravity-ui/icons';
import EbookActions from '@/components/Dashboard/EbookActions'; 
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

const WriterBooks = async () => {
    const user = await getUserSeason();
    const currentWriterId = user?.id; 

    console.log("Current Logged-in Writer ID:", currentWriterId);

  
//     const session = await auth.api.getToken({
//     headers: await headers()
//   })
//   const token = session?.token || null;

//   console.log(token, "from token")

    // const books = []
    const books = await getBooksByWriterId({ writerId: currentWriterId });
    console.log("Fetched Books from DB:", books);

    return (
        <div className="min-h-screen bg-[#0E1420] text-gray-100 p-6 lg:p-10">
            {/* 📑 Header Section */}
            <div className="mb-8">
                <h1 className="text-2xl font-serif font-bold text-[#E5BA73] tracking-wide flex items-center gap-2">
                    <Book className="w-6 h-6" /> Manage Ebooks
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                    Table/list of your own ebooks. You can edit, delete, or change publication status.
                </p>
            </div>

            {/* 📊 Main Table Layout */}
            {!books || books.length === 0 ? (
                <div className="bg-[#0B0F17] border border-gray-800 rounded-2xl p-10 text-center text-gray-400">
                    You haven't added any books yet or ID mismatched.
                </div>
            ) : (
                <div className="bg-[#0B0F17] border border-gray-800/60 rounded-2xl p-6 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-400">
                                    <th className="pb-4 font-semibold pl-2">Book Details</th>
                                    <th className="pb-4 font-semibold">Price</th>
                                    {/* ⚡ ইমার্জিং ক্লায়েন্ট রো লজিকের সুবিধার্থে কলামগুলো কম্পোনেন্টে হ্যান্ডেল হচ্ছে */}
                                    <th className="pb-4 font-semibold">Status</th>
                                    <th className="pb-4 font-semibold text-right pr-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50 text-sm">
                                {books?.map((book) => {
                                    // মঙ্গোডিবি অবজেক্ট আইডি বা প্লেইন আইডি স্ট্রিং এক্সট্র্যাক্ট করা
                                    const currentId = book._id?.toString() || (book._id?.$oid) || book._id;
                                    
                                    return (
                                        <tr key={currentId} className="group hover:bg-gray-900/20 transition-colors">
                                            {/* 📖 Title & Cover Image */}
                                            <td className="py-4 pr-4 pl-2">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative w-12 h-16 flex-shrink-0 bg-gray-900 rounded overflow-hidden border border-gray-800">
                                                        {book.coverImage && (
                                                            <Image 
                                                                src={book.coverImage} 
                                                                alt={book.title || "book"} 
                                                                fill
                                                                sizes="48px"
                                                                className="object-cover"
                                                            />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-white group-hover:text-[#E5BA73] transition-colors line-clamp-1">
                                                            {book.title}
                                                        </div>
                                                        <div className="text-xs text-gray-400 mt-0.5 capitalize">{book.genre}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* 💰 Price */}
                                            <td className="py-4 font-medium text-gray-300">
                                                ${Number(book.price).toFixed(2)}
                                            </td>

                                            {/* ⚡ Status + Actions (আউটডেটেড initialPublished রিমুভ করা হয়েছে) */}
                                            <EbookActions 
                                                bookId={currentId} 
                                                currentStatus={book.status || 'unpublished'} 
                                            />
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WriterBooks;