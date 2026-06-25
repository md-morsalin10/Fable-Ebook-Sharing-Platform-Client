'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'; // রাউটার ইম্পোর্ট করুন
import { Switch } from "@heroui/react";
import { Check, EyeSlash } from "@gravity-ui/icons";

const EbookActions = ({ bookId, initialPublished, currentStatus }) => {
    const [isPublished, setIsPublished] = useState(initialPublished !== false);
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // রাউটার ইনিশিয়ালাইজ করুন

    const isSold = currentStatus?.toLowerCase() === 'sold';

    const handleTogglePublish = async () => {
        if (loading || isSold) return;
        setLoading(true);
        const nextState = !isPublished;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/toggle-publish/${bookId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isPublished: nextState }),
            });
            const data = await res.json();
            if (res.ok) {
                setIsPublished(nextState);
                toast.success(data.message || `Book ${nextState ? 'Published' : 'Unpublished'}`);
            } else {
                toast.error(data.message || "Something went wrong.");
            }
        } catch (error) {
            toast.error("Failed to update status.");
        } finally {
            setLoading(false);
        }
    };


    const handleEdit = () => {
        if (isSold) return;
        router.push(`/dashboard/writer/edit-book/${bookId}`);
    };

  
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this ebook?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/books/delete/${bookId}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(data.message || "Ebook deleted successfully!");
                window.location.reload(); 
            } else {
                toast.error(data.message || "Failed to delete ebook.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong during deletion.");
        }
    };

    return (
        <>
            <td className="py-4">
                {isSold ? (
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-wider">
                        Sold Out
                    </span>
                ) : (
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                        isPublished ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                        {isPublished ? 'Published' : 'Unpublished'}
                    </span>
                )}
            </td>

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

                    <button 
                        onClick={handleEdit}
                        disabled={isSold}
                        className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
                            isSold 
                                ? 'bg-gray-900/40 text-gray-600 border-gray-800/50 cursor-not-allowed opacity-40' 
                                : 'bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20'
                        }`}
                    >
                        Edit
                    </button>

                    <button onClick={handleDelete} className="text-xs px-2.5 py-1.5 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all">
                        Delete
                    </button>
                </div>
            </td>
        </>
    );
};

export default EbookActions;