"use client";
import React, { useState } from 'react';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditProfileModal({ user, isOpen, onClose }) {
  const router = useRouter();
  const [name, setName] = useState(user?.name || '');
  const [image, setImage] = useState(user?.image || '');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.updateUser({
        name,
        image
      });

      if (error) {
        toast.error(error.message || "Failed to update profile");
      } else {
        toast.success("Profile updated successfully!");
        router.refresh();
        onClose();
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#111622] border border-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
        <div className="flex items-center justify-between p-5 border-b border-gray-800/80">
          <h2 className="text-xl font-serif font-bold text-white">Edit Profile</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="text-xs font-bold tracking-wider text-gray-400 uppercase block mb-2">
              Full Name
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E5BA73]/50 transition-colors"
              placeholder="Enter your name"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold tracking-wider text-gray-400 uppercase block mb-2">
              Avatar Image URL
            </label>
            <input 
              type="url" 
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-[#0B0F17] border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E5BA73]/50 transition-colors"
              placeholder="https://example.com/avatar.png"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-gray-300 hover:bg-gray-800 transition-colors border border-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold bg-[#E5BA73] text-[#0B0F17] hover:bg-[#d4a75e] transition-colors disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
