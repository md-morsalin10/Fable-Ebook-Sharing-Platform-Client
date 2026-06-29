'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Switch } from "@heroui/react";
import { Check, EyeSlash } from "@gravity-ui/icons";
import { getClientToken } from '@/lib/core/tokenClient';
import DeleteModal from './DeleteModal';

const EbookActions = ({ bookId, currentStatus }) => {
    // 🎯 ডাটাবেজের স্ট্যাটাস সরাসরি লোকাল স্টেটে ট্র্যাক করা হচ্ছে
    const [status, setStatus] = useState(currentStatus?.toLowerCase() || 'unpublished');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const isSold = status === 'sold';
    const isPublished = status === 'published';

    const handleTogglePublish = async () => {
        if (loading || isSold) return;
        setLoading(true);
        const token = await getClientToken();

        const nextStatus = isPublished ? 'unpublished' : 'published';

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/status/${bookId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: nextStatus }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus(nextStatus);
                toast.success(data.message || `Book ${nextStatus === 'published' ? 'Published' : 'Unpublished'} successfully!`);
            } else {
                toast.error(data.message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Status update error:", error);
            toast.error("Failed to update status.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        if (!isPublished) return;
        router.push(`/dashboard/writer/edit-book/${bookId}`);
    };

    return (
        <>
            {/* 📊 ১. ডাইনামিক স্ট্যাটাস ব্যাজ */}
            <td className="py-4">
                {isSold ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-wider">
                        Sold Out
                    </span>
                ) : isPublished ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                        Published
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
                        Unpublished
                    </span>
                )}
            </td>

            {/* ⚙️ ২. অ্যাকশন বাটনসমূহ এবং সুইচ কন্ট্রোল */}
            <td className="py-4 text-right pr-2">
                <div className="flex items-center justify-end gap-3">
                    <Switch
                        isSelected={isPublished}
                        onChange={handleTogglePublish}
                        disabled={loading || isSold}
                        aria-label="Toggle Publish Status"
                        size="md"
                        className={(loading || isSold) ? "opacity-40 cursor-not-allowed pointer-events-none" : ""}
                    >
                        {({ isSelected }) => (
                            <Switch.Content>
                                <Switch.Control className={isSold ? "bg-gray-800/80" : isSelected ? "bg-emerald-600" : "bg-gray-800"}>
                                    <Switch.Thumb className={isSold ? "bg-gray-600" : "bg-white"}>
                                        <Switch.Icon>
                                            {isSold ? <EyeSlash className="size-2.5 text-gray-400" /> : isSelected ? <Check className="size-2.5 text-emerald-600" /> : <EyeSlash className="size-2.5 text-gray-500" />}
                                        </Switch.Icon>
                                    </Switch.Thumb>
                                </Switch.Control>
                            </Switch.Content>
                        )}
                    </Switch>

                    {/* 📝 ৩. এডিট বাটন (শুধুমাত্র published না হলে ডিজেবল ও ওপেসিটি কম থাকবে) */}
                    <button
                        onClick={handleEdit}
                        disabled={!isPublished}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all ${!isPublished
                                ? 'bg-gray-900/40 text-gray-600 border-gray-800/50 cursor-not-allowed opacity-40'
                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20'
                            }`}
                    >
                        Edit
                    </button>

                    <DeleteModal bookId={bookId} />
                </div>
            </td>
        </>
    );
};

export default EbookActions;