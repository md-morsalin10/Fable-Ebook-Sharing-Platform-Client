"use client";

import React from 'react';
import { Pencil, Eye, EyeSlash, TrashBin } from '@gravity-ui/icons';

export default function EbookActions({ bookId, currentStatus }) {
    
    const handleEdit = (id) => {
        console.log("Edit book click for ID:", id);
        // এখানে আপনার রাউটার পুশ বা এডিট মডাল ওপেন করার লজিক লিখবেন
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this ebook?")) {
            console.log("Delete book API call for ID:", id);
            // এখানে আপনার এক্সপ্রেস ব্যাকএন্ডের ডিলিট API ফেচ করবেন
        }
    };

    const handleTogglePublish = (id, status) => {
        const nextStatus = status === 'Available' || status === 'Published' ? 'Unpublished' : 'Published';
        console.log(`Toggle status for ${id} to ${nextStatus}`);
        // এখানে আপনার এক্সপ্রেস ব্যাকএন্ডে স্ট্যাটাস আপডেট করার PATCH/PUT API কল করবেন
    };

    const isPublished = currentStatus === 'Available' || currentStatus === 'Published';

    return (
        <div className="flex items-center justify-end gap-2">
            {/* 👁️ Publish/Unpublish Toggle Button */}
            <button 
                onClick={() => handleTogglePublish(bookId, currentStatus)}
                title={isPublished ? "Unpublish Book" : "Publish Book"}
                className={`p-2 rounded-lg border transition-colors ${
                    isPublished 
                        ? 'bg-amber-500/5 text-amber-400 border-amber-500/20 hover:bg-amber-500/20' 
                        : 'bg-emerald-500/5 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'
                }`}
            >
                {isPublished ? <EyeSlash className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>

            {/* ✏️ Edit Button */}
            <button 
                onClick={() => handleEdit(bookId)}
                title="Edit Book"
                className="p-2 bg-blue-500/5 text-blue-400 border border-blue-500/20 rounded-lg hover:bg-blue-500/20 transition-colors"
            >
                <Pencil className="w-4 h-4" />
            </button>

            {/* 🗑️ Delete Button */}
            <button 
                onClick={() => handleDelete(bookId)}
                title="Delete Book"
                className="p-2 bg-rose-500/5 text-rose-400 border border-rose-500/20 rounded-lg hover:bg-rose-500/20 transition-colors"
            >
                <TrashBin className="w-4 h-4" />
            </button>
        </div>
    );
}