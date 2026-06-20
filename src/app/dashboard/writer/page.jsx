import React from 'react';
import { 
  Book, 
  Person, 
  ArrowRightArrowLeft, 
  Eye, 

  Star, 
  CirclePlus
} from '@gravity-ui/icons';
import { BiTrendingUp } from 'react-icons/bi';
import Link from 'next/link';

async function getWriterStats() {
  // এখানে আপনার MongoDB বা API ফেচিং লজিক বসবে
  return [
    { id: 1, title: 'Total Ebooks', value: '12', change: '+2 this month', color: 'text-amber-400' },
    { id: 2, title: 'Total Readers', value: '1,420', change: '+18% growth', color: 'text-blue-400' },
    { id: 3, title: 'Total Earnings', value: '$450.00', change: '+$120.50 this week', color: 'text-emerald-400' },
    { id: 4, title: 'Avg. Rating', value: '4.8', change: 'Based on 320 reviews', color: 'text-yellow-400' },
  ];
}

async function getRecentBooks() {
  return [
    { id: 1, title: 'The Shadow of Hogwarts', genre: 'Fantasy', status: 'Published', sales: 142, price: '$4.99' },
    { id: 2, title: 'Whispers in the Dark', genre: 'Mystery', status: 'Published', sales: 89, price: '$3.50' },
    { id: 3, title: 'Beyond the Horizon', genre: 'Sci-Fi', status: 'Draft', sales: 0, price: '$0.00' },
  ];
}

// 🚀 এটি একটি পিওর সার্ভার কম্পোনেন্ট
export default async function WritersDashboardPage() {
  // সার্ভার সাইডেই ডেটা প্যারালালি ফেচ হচ্ছে
  const [stats, recentBooks] = await Promise.all([
    getWriterStats(),
    getRecentBooks()
  ]);

  // আইকন ম্যাপিং (সার্ভার কম্পোনেন্টে অবজেক্টের ভেতর সরাসরি আইকন পাস করার চেয়ে এভাবে রেন্ডার করা সেফ)
  const iconMap = {
    1: Book,
    2: Person,
    3: ArrowRightArrowLeft,
    4: Star
  };

  return (
    <div className="min-h-screen bg-[#0E1420] text-gray-100 p-6 lg:p-10">
      
      {/* 👋 Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#E5BA73] tracking-wide">
            Writers Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Welcome back! Here is an overview of your published books and sales performance.
          </p>
        </div>
        
        {/* ➕ Isolated Client Action Button */}
         <Link href="/dashboard/writer/add-ebook" className="flex items-center gap-2 bg-[#E5BA73] text-[#0B0F17] px-5 py-3 rounded-xl text-sm font-bold shadow-lg shadow-amber-900/10 hover:bg-[#d4a75e] transition-all duration-200 transform hover:-translate-y-0.5">
           <CirclePlus className="w-4 h-4" />
           Publish Book
         </Link>
      </div>

      {/* 📊 Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat) => {
          const IconComponent = iconMap[stat.id] || Book;
          return (
            <div 
              key={stat.id} 
              className="bg-[#0B0F17] border border-gray-800/60 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-[#E5BA73]/30 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs uppercase tracking-wider font-semibold text-gray-400">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mt-2 text-white">
                    {stat.value}
                  </h3>
                </div>
                <div className={`p-3 bg-gray-900/60 rounded-xl border border-gray-800 ${stat.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
              </div>
              
              <div className="flex items-center gap-1.5 mt-4 pt-4 border-t border-gray-900 text-xs text-gray-400">
                <BiTrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                <span>{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 📑 Bottom Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* 📚 Left 2 Columns: Manage Books Table */}
        <div className="lg:col-span-2 bg-[#0B0F17] border border-gray-800/60 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Book className="text-[#E5BA73] w-4 h-4" /> Recent Ebooks
            </h2>
            <button className="text-xs text-[#E5BA73] hover:underline">
              View All Books
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-800 text-xs uppercase tracking-wider text-gray-400">
                  <th className="pb-4 font-semibold">Book Details</th>
                  <th className="pb-4 font-semibold">Status</th>
                  <th className="pb-4 font-semibold">Copies Sold</th>
                  <th className="pb-4 font-semibold text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50 text-sm">
                {recentBooks.map((book) => (
                  <tr key={book.id} className="group hover:bg-gray-900/20 transition-colors">
                    <td className="py-4 pr-4">
                      <div className="font-semibold text-white group-hover:text-[#E5BA73] transition-colors">
                        {book.title}
                      </div>
                      <div className="text-xs text-gray-400 mt-0.5">{book.genre}</div>
                    </td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        book.status === 'Published' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-gray-800 text-gray-400 border border-gray-700'
                      }`}>
                        {book.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-300 font-medium">
                      {book.sales}
                    </td>
                    <td className="py-4 text-right font-semibold text-white">
                      {book.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 🔔 Right 1 Column: Mini Insights */}
        <div className="bg-[#0B0F17] border border-gray-800/60 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Eye className="text-[#E5BA73] w-4 h-4" /> Writing Insights
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              Tips and trends to help increase your ebook sales on Fable.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-gray-900/40 rounded-xl border border-gray-800/80">
                <h4 className="text-xs font-bold text-[#E5BA73] uppercase tracking-wider mb-1">
                  Trending Genre
                </h4>
                <p className="text-sm text-gray-300">
                  Fantasy Mystery numbers have gone up by 25% this week. Consider planning your next release in this niche!
                </p>
              </div>

              <div className="p-4 bg-gray-900/40 rounded-xl border border-gray-800/80">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-1">
                  Complete Profile
                </h4>
                <p className="text-sm text-gray-300">
                  Writers with a complete bio and profile picture receive up to 40% more book downloads.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-gray-800 text-center">
            <span className="text-xs text-gray-500">
              Fable Author Hub © 2026
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}