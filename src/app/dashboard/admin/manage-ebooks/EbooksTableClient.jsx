"use client";

import { useState } from "react";
import { TrashBin, Magnifier, CloudArrowUpIn, EyesLookLeft } from "@gravity-ui/icons";
import { BsCloudArrowDown } from "react-icons/bs";
import Image from "next/image";
import toast from "react-hot-toast";

const TABLE_COLS = ["Book Info", "Writer", "Price", "Status", "Actions"];
const API = process.env.NEXT_PUBLIC_URL;

export default function EbooksTableClient({ initialBooks = [] }) {
  const [books, setBooks] = useState(initialBooks);
  const [loadingId, setLoadingId] = useState("");

  // ── ১. পাবলিশ / আনপাবলিশ হ্যান্ডলার ──────────────────────────────────────────
  const handleToggleStatus = async (bookId, currentStatus) => {
    // 🛡️ যদি অলরেডি sold হয় তবে কোনো অ্যাকশন হবে না
    if (currentStatus?.toLowerCase() === "sold") return;

    setLoadingId(bookId);
    const newStatus = currentStatus === "published" ? "unpublished" : "published";

    try {
      const res = await fetch(`${API}/api/admin/books/status/${bookId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedBooks = books.map((book) => {
          const id = book._id?.$oid || book._id;
          return id === bookId ? { ...book, status: newStatus } : book;
        });
        setBooks(updatedBooks);
        toast.success(`Book status updated to ${newStatus}`);
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      toast.error("Server error occurred");
    } finally {
      setLoadingId("");
    }
  };

  // ── ২. ডিলিট হ্যান্ডলার ──────────────────────────────────────────────────────
  const handleDelete = async (bookId, currentStatus) => {
    // 🛡️ ট্রানজেকশন ডেটার নিরাপত্তার জন্য sold বই ডিলিট করা ব্লক করা ভালো
    if (currentStatus?.toLowerCase() === "sold") {
      toast.error("Sold out books cannot be deleted for record safety.");
      return;
    }

    if (!confirm("Are you sure you want to delete this book?")) return;
    setLoadingId(bookId);

    try {
      const res = await fetch(`${API}/api/admin/books/${bookId}`, { method: "DELETE" });

      if (res.ok) {
        const remainingBooks = books.filter((book) => {
          const id = book._id?.$oid || book._id;
          return id !== bookId;
        });
        setBooks(remainingBooks);
        toast.success("Book deleted successfully");
      } else {
        toast.error("Failed to delete book");
      }
    } catch (err) {
      toast.error("Error connecting to server");
    } finally {
      setLoadingId("");
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#0B0F19]/70 border border-white/[0.06] backdrop-blur-xl shadow-xl mt-4">
      
      {/* ── Header ── */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-white/5">
        <div>
          <h2 className="font-['Playfair_Display'] text-base sm:text-lg font-bold text-[#F0F4FF]">Ebooks Inventory</h2>
          <p className="text-[11px] sm:text-xs mt-0.5 text-[#8892A4]">{books.length} books available</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-[#8892A4] bg-white/[0.04] border border-white/[0.06]">
          <Magnifier className="w-3.5 h-3.5" /> Search books…
        </div>
      </div>

      {/* ── মোবাইল ভিউ ── */}
      <div className="block md:hidden divide-y divide-white/[0.04]">
        {books.length === 0 ? (
          <div className="py-12 text-center text-sm text-[#8892A4]">No books found.</div>
        ) : (
          books.map((book, idx) => {
            const id = book._id?.$oid || book._id;
            const isSold = book.status?.toLowerCase() === "sold";
            const isPublished = book.status === "published";

            return (
              <div key={idx} className="p-4 space-y-4">
                <div className="flex gap-3">
                  <div className="relative w-12 h-16 flex-shrink-0">
                    <Image
                      src={book.coverImage || "https://i.ibb.co/0yXMLXBy/jim-cow.jpg"}
                      alt={book.title}
                      fill
                      className="rounded-lg object-cover bg-white/[0.05] border border-white/[0.08]"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold text-[#D4C5B0] truncate line-clamp-2">{book.title}</h3>
                    <p className="text-[10px] text-[#8892A4] mt-0.5 capitalize">Genre: {book.genre || "N/A"}</p>
                    <p className="text-xs font-bold text-amber-400 mt-1">${book.price}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.03]">
                  <div>
                    <span className="text-[#524534] block font-bold uppercase text-[9px]">Writer</span>
                    <span className="text-[#8892A4] block truncate">{book.writerName}</span>
                  </div>
                  <div>
                    <span className="text-[#524534] block font-bold uppercase text-[9px]">Status</span>
                    <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-md text-[10px] font-medium border capitalize ${
                      isSold 
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20" 
                        : isPublished 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    }`}>
                      {book.status || "unpublished"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={() => handleToggleStatus(id, book.status)}
                    disabled={loadingId === id || isSold}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-semibold border transition-all ${
                      isSold
                        ? "text-gray-600 bg-gray-900/20 border-gray-800/40 opacity-40 cursor-not-allowed"
                        : isPublished 
                        ? "text-zinc-400 bg-zinc-400/[0.06] border-zinc-400/[0.15]" 
                        : "text-amber-400 bg-amber-400/[0.06] border-amber-400/[0.15]"
                    }`}
                  >
                    {loadingId === id ? "..." : isPublished ? <EyesLookLeft className="w-3 h-3" /> : <BsCloudArrowDown className="w-3 h-3" />}
                    <span>{isSold ? "Archived" : isPublished ? "Unpublish" : "Publish"}</span>
                  </button>

                  <button
                    onClick={() => handleDelete(id, book.status)}
                    disabled={loadingId === id || isSold}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-semibold border text-red-400 bg-red-400/[0.06] border-red-400/[0.15] transition-all ${
                      isSold ? "opacity-30 cursor-not-allowed text-gray-600 border-gray-800 bg-transparent" : ""
                    }`}
                  >
                    {loadingId === id ? "..." : <TrashBin className="w-3 h-3" />}
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── ডেস্কটপ ভিউ ── */}
      <div className="hidden md:block overflow-x-auto w-full">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {TABLE_COLS.map((col) => (
                <th key={col} className="px-6 py-4 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-[#524534]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {books.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center text-sm text-[#8892A4]">No books found.</td>
              </tr>
            ) : (
              books.map((book, idx) => {
                const id = book._id?.$oid || book._id;
                const isSold = book.status?.toLowerCase() === "sold";
                const isPublished = book.status === "published";

                return (
                  <tr key={idx} className="border-b border-white/[0.04] last:border-0 transition-colors hover:bg-white/[0.02]">
                    
                    {/* Book Info */}
                    <td className="px-6 py-4 max-w-sm">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-14 flex-shrink-0">
                          <Image
                            src={book.coverImage || "https://i.ibb.co/0yXMLXBy/jim-cow.jpg"}
                            alt={book.title}
                            fill
                            className="rounded-lg object-cover bg-white/[0.05] border border-white/[0.08]"
                          />
                        </div>
                        <div className="truncate">
                          <p className="text-sm font-medium text-[#D4C5B0] truncate">{book.title}</p>
                          <p className="text-[11px] capitalize text-[#8892A4] mt-0.5">{book.genre || "fantasy"}</p>
                        </div>
                      </div>
                    </td>

                    {/* Writer */}
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-medium text-[#8892A4]">{book.writerName}</p>
                        <p className="text-[10px] text-[#524534] truncate max-w-[150px]">{book.writerEmail}</p>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 text-sm font-bold text-amber-400">${book.price}</td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-xl text-[10px] font-semibold border capitalize tracking-wide ${
                        isSold
                          ? "bg-rose-500/10 text-rose-400 border-rose-500/25"
                          : isPublished
                          ? "bg-emerald-400/10 text-emerald-400 border-emerald-400/25" 
                          : "bg-amber-500/10 text-amber-400 border-amber-500/25"
                      }`}>
                        {book.status || "unpublished"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(id, book.status)}
                          disabled={loadingId === id || isSold}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition-all duration-200 ${
                            isSold
                              ? "text-gray-600 bg-gray-900/20 border-gray-800/40 opacity-40 cursor-not-allowed"
                              : isPublished
                              ? "text-zinc-400 bg-zinc-400/[0.06] border-zinc-400/[0.15] hover:bg-zinc-400/[0.12]"
                              : "text-amber-400 bg-amber-400/[0.06] border-amber-400/[0.15] hover:bg-amber-400/[0.12]"
                          }`}
                        >
                          {loadingId === id ? "..." : isPublished ? <EyesLookLeft className="w-3.5 h-3.5" /> : <CloudArrowUpIn className="w-3.5 h-3.5" />}
                          <span>{isSold ? "Archived" : isPublished ? "Unpublish" : "Publish"}</span>
                        </button>

                        <button
                          onClick={() => handleDelete(id, book.status)}
                          disabled={loadingId === id || isSold}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold border text-red-400 bg-red-400/[0.06] border-red-400/[0.15] hover:bg-red-400/[0.12] transition-all ${
                            isSold ? "opacity-30 cursor-not-allowed text-gray-600 border-gray-800 bg-transparent hover:bg-transparent" : ""
                          }`}
                        >
                          {loadingId === id ? "..." : <TrashBin className="w-3.5 h-3.5" />}
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-4 flex items-center justify-between text-[11px] text-[#8892A4] border-t border-white/[0.05]">
        <span>Showing <span className="text-[#D4C5B0]">{books.length}</span> books</span>
        <span className="text-[#524534] hidden xs:inline">Fable Admin Panel</span>
      </div>

    </div>
  );
}