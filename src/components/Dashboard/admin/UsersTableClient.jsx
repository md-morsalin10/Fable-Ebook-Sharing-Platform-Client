"use client";

import { useState, useRef, useEffect } from "react";
import { TrashBin, ChevronDown, Check, Magnifier, Xmark } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import Image from "next/image";
import { getClientToken } from "@/lib/core/tokenClient";

// 💡 ডাটাবেজ ও ব্যাকএন্ডে সরাসরি "reader" থাকবে
const AVAILABLE_ROLES = ["reader", "writer", "admin"];

// UI-তে দেখানোর জন্য ক্যাপিটালাইজ বা কাস্টম নাম (অপশনাল, যেহেতু reader-ই দেখাবে)
const ROLE_DISPLAY_NAMES = {
  admin: "admin",
  writer: "writer",
  reader: "reader", 
};

const ROLE_STYLES = {
  admin:  { badge: "bg-amber-400/10  text-amber-400  border-amber-400/25",  item: "text-amber-400  hover:bg-amber-400/10"  },
  writer: { badge: "bg-violet-400/10 text-violet-400 border-violet-400/25", item: "text-violet-400 hover:bg-violet-400/10" },
  reader: { badge: "bg-blue-400/10   text-blue-400   border-blue-400/25",   item: "text-blue-400   hover:bg-blue-400/10"   },
};

const TABLE_COLUMNS = ["User", "Email", "Role", "Joined", "Actions"];
const BACKEND_URL = process.env.NEXT_PUBLIC_URL;

const extractUserId = (user) => {
  return user._id?.$oid || user._id?.toString() || user._id;
};

const formatJoinedDate = (rawDate) => {
  const dateString = rawDate?.$date || rawDate;
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString("en-US", { 
    month: "short", 
    day: "2-digit", 
    year: "numeric" 
  });
};

const LoadingSpinner = () => (
  <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
);

function RoleDropdown({ currentRole, userId, onRoleChange, isUpdating }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // ফালব্যাক হিসেবে reader স্টাইল ব্যবহার করা হয়েছে
  const activeStyle = ROLE_STYLES[currentRole] || ROLE_STYLES.reader;

  return (
    <div ref={dropdownRef} className="relative w-24 sm:w-28">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isUpdating}
        className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl border text-[11px] font-semibold capitalize tracking-wide transition-all focus:outline-none ${activeStyle.badge}`}
      >
        {isUpdating ? (
          <>
            <LoadingSpinner /> 
            <span className="hidden sm:inline">Updating…</span>
          </>
        ) : (
          <>
            {ROLE_DISPLAY_NAMES[currentRole] || currentRole} 
            <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </>
        )}
      </button>

      {isOpen && (
        <div className="hidden md:block absolute top-full mt-1.5 left-0 z-40 w-full rounded-xl overflow-hidden shadow-2xl bg-[#0F1424] border border-white/[0.07] p-1">
          {AVAILABLE_ROLES.map((role) => (
            <button
              key={role}
              disabled={role === currentRole}
              onClick={() => { setIsOpen(false); onRoleChange(userId, currentRole, role); }}
              className={`w-full text-left px-3 py-2 text-[11px] font-semibold capitalize transition-colors flex items-center justify-between rounded-lg ${ROLE_STYLES[role].item} ${role === currentRole ? "opacity-40 cursor-default" : ""}`}
            >
              {ROLE_DISPLAY_NAMES[role]} {role === currentRole && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      )}

      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full bg-[#0F1424] border-t border-white/[0.08] rounded-t-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#F0F4FF]">Change User Role</h3>
                <p className="text-[11px] text-[#8892A4]">Select a new privilege for this user</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/[0.05] border border-white/10 text-gray-400">
                <Xmark className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1.5">
              {AVAILABLE_ROLES.map((role) => (
                <button
                  key={role}
                  disabled={role === currentRole}
                  onClick={() => { setIsOpen(false); onRoleChange(userId, currentRole, role); }}
                  className={`w-full text-left px-4 py-3 text-xs font-semibold capitalize flex items-center justify-between rounded-xl border border-white/[0.03] ${ROLE_STYLES[role].item} ${role === currentRole ? "bg-white/[0.02] opacity-40 cursor-default" : "bg-white/[0.01]"}`}
                >
                  {ROLE_DISPLAY_NAMES[role]} {role === currentRole && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function UsersTableClient({ initialUsers }) {
  const [users, setUsers] = useState(initialUsers || []);
  const [deletingId, setDeletingId] = useState(null);
  const [roleUpdatingId, setRoleUpdatingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const handleRoleChange = async (userId, currentRole, newRole) => {
    setRoleUpdatingId(userId);
    const token = await getClientToken();

    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/users/role/${userId}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json", 
          "authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ role: newRole }), // সরাসরি "reader", "writer", অথবা "admin" যাবে
      });

      if (response.ok) {
        setUsers((prevUsers) => 
          prevUsers.map((user) => extractUserId(user) === userId ? { ...user, role: newRole } : user)
        );
        toast.success(`Role updated to "${ROLE_DISPLAY_NAMES[newRole]}"`);
      } else {
        toast.error("Failed to update role.");
      }
    } catch (error) {
      toast.error("Server error.");
    } finally {
      setRoleUpdatingId(null);
    }
  };

  const executeDeleteUser = async (userId) => {
    setDeletingId(userId);
    const token = await getClientToken();

    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/users/${userId}`, { 
        method: "DELETE",
        headers: { "authorization": `Bearer ${token}` },
      });

      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => extractUserId(user) !== userId));
        toast.success("User deleted successfully.");
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (error) {
      toast.error("Error connecting to server.");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#0B0F19]/70 border border-white/[0.06] backdrop-blur-xl shadow-xl">
      <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-white/5">
        <div>
          <h2 className="font-['Playfair_Display'] text-base sm:text-lg font-bold text-[#F0F4FF]">Manage Users</h2>
          <p className="text-[11px] sm:text-xs mt-0.5 text-[#8892A4]">{users.length} total members</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-[#8892A4] bg-white/[0.04] border border-white/[0.06]">
          <Magnifier className="w-3.5 h-3.5" /> Filter users…
        </div>
      </div>

      <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-white/10">
        <table className="w-full min-w-[700px] sm:min-w-full border-collapse">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {TABLE_COLUMNS.map((columnName) => (
                <th key={columnName} className="px-4 sm:px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-[#524534]">
                  {columnName}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center text-sm text-[#8892A4]">No users found.</td>
              </tr>
            ) : (
              users.map((user) => {
                const userId = extractUserId(user);
                const isUserDeleting = deletingId === userId;
                const isRoleUpdating = roleUpdatingId === userId;
                const isShowingConfirm = confirmDeleteId === userId;

                return (
                  <tr key={userId} className="border-b border-white/[0.04] last:border-0 transition-colors hover:bg-white/[0.02]">
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <Image
                            src={user.image || "https://i.ibb.co.com/HLX9ZRdG/new2.png"}
                            alt={user.name}
                            width={48}
                            height={48}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover border border-white/[0.08]"
                          />
                          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#0B0F19]" />
                        </div>
                        <div className="max-w-[120px] sm:max-w-none truncate">
                          <p className="text-xs sm:text-sm font-medium text-[#D4C5B0] truncate">{user.name}</p>
                          <p className="text-[10px] sm:text-[11px] capitalize text-[#8892A4] mt-0.5">{user.plan || "free"} plan</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-[#8892A4] font-mono">
                      <div className="max-w-[150px] sm:max-w-none truncate">{user.email}</div>
                    </td>

                    <td className="px-4 sm:px-6 py-4">
                      <RoleDropdown 
                        currentRole={user.role || "reader"} // ডাটাবেজের "reader" অথবা ফালব্যাক ভ্যালু
                        userId={userId} 
                        onRoleChange={handleRoleChange} 
                        isUpdating={isRoleUpdating}
                      />
                    </td>

                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-[#8892A4]">
                      {formatJoinedDate(user.createdAt)}
                    </td>

                    <td className="px-4 sm:px-6 py-4">
                      {isShowingConfirm ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => executeDeleteUser(userId)}
                            disabled={isUserDeleting}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg"
                          >
                            {isUserDeleting ? <LoadingSpinner /> : "Sure?"}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            disabled={isUserDeleting}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white/5 text-gray-400 hover:bg-white/10 transition-colors border border-white/5"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setConfirmDeleteId(userId)}
                          className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-semibold border transition-all duration-200 text-red-400 bg-red-400/[0.06] border-red-400/[0.15] hover:bg-red-400/[0.12] hover:border-red-400/30"
                        >
                          <TrashBin className="w-3.5 h-3.5" /> 
                          <span className="hidden sm:inline">Delete</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 sm:px-6 py-4 flex items-center justify-between text-[11px] text-[#8892A4] border-t border-white/[0.05]">
        <span>Showing <span className="text-[#D4C5B0]">{users.length}</span> of <span className="text-[#D4C5B0]">{users.length}</span> members</span>
        <span className="text-[#524534] hidden xs:inline">Fable Admin Panel</span>
      </div>
    </div>
  );
}