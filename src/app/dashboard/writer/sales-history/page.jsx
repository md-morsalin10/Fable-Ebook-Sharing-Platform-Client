import { getPaymentDataByWriterId } from '@/lib/api/bookPayment';
import { getUserSeason } from '@/lib/core/Session';
import React from 'react';
import Image from 'next/image';
import { Table, Button } from "@heroui/react";

const SalesHistory = async () => {
    const user = await getUserSeason();
    const booksSalesData = (await getPaymentDataByWriterId(user?.id)) || [];

    // 📊 অ্যানালিটিক্স ক্যালকুলেশন
    const totalSalesCount = booksSalesData.length;
    const totalRevenue = booksSalesData.reduce((sum, item) => sum + Number(item.price || 0), 0);

    // চলতি মাসের রেভিনিউ ক্যালকুলেশন
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthRevenue = booksSalesData.reduce((sum, item) => {
        const pDate = item.purchaseDate?.$date ? new Date(item.purchaseDate.$date) : new Date(item.purchaseDate);
        if (pDate.getMonth() === currentMonth && pDate.getFullYear() === currentYear) {
            return sum + Number(item.price || 0);
        }
        return sum;
    }, 0);

    return (
        <div className="w-full text-gray-200 min-h-screen py-6 px-2 md:px-6">
            
            {/* 📈 ১. অ্যানালিটিক্স ওভারভিউ কার্ড সেকশন */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
                {/* কার্ড ১: Total Sales */}
                <div className="bg-[#0B0F17]/50 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md shadow-lg">
                    <span className="block text-xs uppercase font-bold text-gray-500 tracking-wider">Total Sales</span>
                    <span className="text-3xl font-extrabold text-white mt-2 block font-serif">
                        {totalSalesCount.toLocaleString()}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium mt-2 flex items-center gap-1">
                        📈 +12.5% vs last month
                    </span>
                </div>

                {/* কার্ড ২: Total Revenue */}
                <div className="bg-[#0B0F17]/50 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md shadow-lg">
                    <span className="block text-xs uppercase font-bold text-gray-500 tracking-wider">Total Revenue</span>
                    <span className="text-3xl font-extrabold text-[#E5BA73] mt-2 block font-serif">
                        ${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium mt-2 flex items-center gap-1">
                        📈 +8.2% vs last month
                    </span>
                </div>

                {/* কার্ড ৩: This Month */}
                <div className="bg-[#0B0F17]/50 border border-gray-800/80 rounded-2xl p-6 backdrop-blur-md shadow-lg">
                    <span className="block text-xs uppercase font-bold text-gray-500 tracking-wider">This Month</span>
                    <span className="text-3xl font-extrabold text-white mt-2 block font-serif">
                        ${thisMonthRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <div className="mt-3 w-full bg-gray-950 h-1 rounded-full border border-gray-800 overflow-hidden">
                        <div className="bg-[#E5BA73] h-full rounded-full" style={{ width: '65%' }}></div>
                    </div>
                </div>
            </div>

            {/* ⚙️ ফিল্টার ও ট্রানজেকশন কাউন্টার */}
            <div className="bg-[#0B0F17]/30 border border-gray-800/60 rounded-xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm" variant="flat" className="bg-gray-950 border border-gray-800 text-xs font-semibold text-gray-400 rounded-xl">
                        📊 Filters
                    </Button>
                    <div className="text-xs text-gray-400 bg-gray-950 border border-gray-800/60 rounded-xl px-3 py-2">
                        Showing <span className="text-[#E5BA73] font-bold">{booksSalesData.length}</span> transactions
                    </div>
                </div>
            </div>

            {/* 📑 HeroUI সেকেন্ডারি ভ্যারিয়েন্ট টেবিল */}
            <Table variant="secondary" className="shadow-2xl">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Sales History Table" className="min-w-[800px] bg-[#0B0F17]/40 border border-gray-800/60 rounded-2xl backdrop-blur-md">
                        <Table.Header>
                            <Table.Column className="text-[11px] font-bold uppercase tracking-wider text-gray-500 p-5">Ebook Title</Table.Column>
                            <Table.Column className="text-[11px] font-bold uppercase tracking-wider text-gray-500 p-5">Buyer Name</Table.Column>
                            <Table.Column className="text-[11px] font-bold uppercase tracking-wider text-gray-500 p-5">Purchase Date</Table.Column>
                            <Table.Column className="text-[11px] font-bold uppercase tracking-wider text-gray-500 p-5">Amount</Table.Column>
                            <Table.Column className="text-[11px] font-bold uppercase tracking-wider text-gray-500 p-5">Transaction ID</Table.Column>
                        </Table.Header>
                        
                        <Table.Body emptyContent={"No sales records found for your ebooks."}>
                            {booksSalesData.map((sale) => {
                                const rawDate = sale.purchaseDate?.$date || sale.purchaseDate;
                                const formattedDate = new Date(rawDate).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                });

                                return (
                                    <Table.Row key={sale._id?.$oid || sale._id} className="hover:bg-gray-800/10 border-b border-gray-800/40 transition-colors group">
                                        {/* 📖 Title & Image */}
                                        <Table.Cell className="p-5">
                                            <div className="flex items-center gap-4">
                                                <div className="relative aspect-[3/4] w-10 flex-shrink-0 rounded-md bg-gray-950 border border-gray-800 overflow-hidden shadow-md">
                                                    {sale.coverImage ? (
                                                        <Image 
                                                            src={sale.coverImage} 
                                                            alt={sale.title || "book"} 
                                                            fill 
                                                            className="object-cover"
                                                            sizes="40px"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-gray-900 flex items-center justify-center text-[10px]">📖</div>
                                                    )}
                                                </div>
                                                <span className="font-bold text-sm text-gray-100 group-hover:text-[#E5BA73] transition-colors block line-clamp-1">
                                                    {sale.title}
                                                </span>
                                            </div>
                                        </Table.Cell>

                                        {/* 👤 Buyer Details */}
                                        <Table.Cell className="p-5">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-semibold text-gray-200">{sale.userName || "Unknown Buyer"}</span>
                                                <span className="text-[11px] text-gray-500 mt-0.5">{sale.userEmail}</span>
                                            </div>
                                        </Table.Cell>

                                        {/* 📅 Date */}
                                        <Table.Cell className="p-5 text-sm text-gray-400 font-light">
                                            {formattedDate}
                                        </Table.Cell>

                                        {/* 💰 Amount */}
                                        <Table.Cell className="p-5">
                                            <span className="text-sm font-extrabold text-[#E5BA73]">
                                                ${Number(sale.price).toFixed(2)}
                                            </span>
                                        </Table.Cell>

                                        {/* 🔑 Transaction ID */}
                                        <Table.Cell className="p-5 text-xs font-mono text-gray-600 max-w-[150px] truncate">
                                            #{sale.sessionId?.substring(8, 20) || sale._id?.$oid?.substring(0, 12)}...
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>

            {/* 📄 ৪. পেজিনেশন বার */}
            <div className="p-4 bg-[#0B0F17]/40 border border-gray-800/60 border-t-0 rounded-b-2xl flex items-center justify-between text-xs text-gray-500 backdrop-blur-md">
                <span>Page 1 of 1</span>
                <div className="flex items-center gap-1">
                    <button disabled className="w-8 h-8 rounded-lg bg-gray-950 border border-gray-800 flex items-center justify-center opacity-40 cursor-not-allowed">◀</button>
                    <button className="w-8 h-8 rounded-lg bg-[#E5BA73] text-[#0E1420] font-bold flex items-center justify-center shadow-sm">1</button>
                    <button disabled className="w-8 h-8 rounded-lg bg-gray-950 border border-gray-800 flex items-center justify-center opacity-40 cursor-not-allowed">▶</button>
                </div>
            </div>

        </div>
    );
};

export default SalesHistory;