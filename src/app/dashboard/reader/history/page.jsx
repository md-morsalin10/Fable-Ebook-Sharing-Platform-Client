import { getPaymentDataById } from '@/lib/api/bookPayment';
import { getUserSeason } from '@/lib/core/Session';
import React from 'react';
import { Table } from "@heroui/react";
import Image from 'next/image';

const PurchaseHistoryPage = async () => {
    const user = await getUserSeason();
    const userId = user?.id;

    const paymentData = (await getPaymentDataById(userId)) || [];

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 min-h-screen text-gray-200">
            {/* 📋 পেজ হেডার */}
            <div className="mb-8 border-b border-gray-800/60 pb-5">
                <h1 className="text-2xl font-bold tracking-tight text-white">Purchase History</h1>
                <p className="text-sm text-gray-400 mt-1">Manage and view all your purchased digital books here.</p>
            </div>

            {paymentData.length === 0 ? (
                <div className="text-center py-20 bg-[#0B0F17]/40 border border-gray-800/60 rounded-xl">
                    <p className="text-gray-400 text-sm">No purchase history found.</p>
                </div>
            ) : (
                /* 📊 Hero UI Table */
                <Table variant="secondary" className="bg-[#0B0F17]/20 border border-gray-800/60 rounded-xl overflow-hidden shadow-2xl">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Purchase History Table" className="min-w-[750px]">
                            <Table.Header>
                                <Table.Column isRowHeader className="bg-[#111622] text-gray-400 text-xs font-semibold py-4 pl-6">COVER</Table.Column>
                                <Table.Column className="bg-[#111622] text-gray-400 text-xs font-semibold py-4">EBOOK TITLE</Table.Column>
                                <Table.Column className="bg-[#111622] text-gray-400 text-xs font-semibold py-4">WRITER</Table.Column>
                                <Table.Column className="bg-[#111622] text-gray-400 text-xs font-semibold py-4">PRICE</Table.Column>
                                <Table.Column className="bg-[#111622] text-gray-400 text-xs font-semibold py-4">PURCHASE DATE</Table.Column>
                                <Table.Column className="bg-[#111622] text-gray-400 text-xs font-semibold py-4 text-center pr-6">STATUS</Table.Column>
                            </Table.Header>
                            
                            <Table.Body>
                                {paymentData.map((item, index) => {
                                    const currentId = item._id?.$oid || item._id || index;
                                    
                                    // 📅 ডেট ফিক্সিং লজিক: purchaseDate না থাকলে মঙ্গো _id থেকে জেনারেট করবে
                                    let rawDate = item.purchaseDate?.$date || item.purchaseDate;
                                    
                                    if (!rawDate) {
                                        const oid = item._id?.$oid || item._id;
                                        if (typeof oid === 'string' && oid.length === 24) {
                                            // মঙ্গোডিবির অবজেক্ট আইডি'র প্রথম ৮ ক্যারেক্টার হলো টাইমস্ট্যাম্প
                                            const timestamp = parseInt(oid.substring(0, 8), 16) * 1000;
                                            rawDate = new Date(timestamp);
                                        }
                                    }

                                    const formattedDate = rawDate 
                                        ? new Date(rawDate).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
                                        : 'Recently';

                                    return (
                                        /* 🎨 হোভার করার সময় ব্যাকগ্রাউন্ড সাদা হওয়া রুখতে ম্যানুয়াল ডার্ক হোভার কালার সেট */
                                        <Table.Row key={currentId} className="border-b border-gray-800/40 hover:bg-[#161b2c]! bg-transparent transition-colors">
                                            {/* ১. কভার ইমেজ */}
                                            <Table.Cell className="py-4 pl-6">
                                                <div className="relative w-10 h-14 rounded bg-gray-900 border border-gray-800 overflow-hidden shadow-md">
                                                    {item.coverImage ? (
                                                        <Image src={item.coverImage} alt={item.title || "book"} fill className="object-cover" sizes="40px" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-xs">📖</div>
                                                    )}
                                                </div>
                                            </Table.Cell>

                                            {/* ২. ইবুক টাইটেল */}
                                            <Table.Cell className="py-4 font-medium text-gray-100 text-sm">
                                                {item.title}
                                            </Table.Cell>

                                            {/* ৩. রাইটার */}
                                            <Table.Cell className="py-4 text-sm text-gray-300">
                                                {item.writerName}
                                            </Table.Cell>

                                            {/* ৪. প্রাইস */}
                                            <Table.Cell className="py-4 text-sm font-semibold text-gray-200">
                                                ${Number(item.price).toFixed(2)}
                                            </Table.Cell>

                                            {/* ۵. পারচেজ ডেট */}
                                            <Table.Cell className="py-4 text-sm text-gray-400">
                                                {formattedDate}
                                            </Table.Cell>

                                            {/* ৬. স্ট্যাটাস ব্যাজ */}
                                            <Table.Cell className="py-4 text-center pr-6">
                                                <span className="inline-block text-[11px] px-3 py-1 font-medium bg-[#132A1C] text-[#4ADE80] rounded-full border border-[#1F4D32]">
                                                    Completed
                                                </span>
                                            </Table.Cell>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table.Content>
                    </Table.ScrollContainer>
                </Table>
            )}
        </div>
    );
};

export default PurchaseHistoryPage;