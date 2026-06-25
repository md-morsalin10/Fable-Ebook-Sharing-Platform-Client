"use client";

import { useState, useRef, useEffect } from "react";
import { TrashBin, ChevronDown, Check, Magnifier, Xmark } from "@gravity-ui/icons";
import toast from "react-hot-toast";
import Image from "next/image";


const ROLES = ["user", "writer", "admin"];

const ROLE_STYLES = {
  admin:  { badge: "bg-amber-400/10  text-amber-400  border-amber-400/25",   item: "text-amber-400  hover:bg-amber-400/10"  },
  writer: { badge: "bg-violet-400/10 text-violet-400 border-violet-400/25", item: "text-violet-400 hover:bg-violet-400/10" },
  user:   { badge: "bg-blue-400/10   text-blue-400   border-blue-400/25",   item: "text-blue-400   hover:bg-blue-400/10"   },
};

const TABLE_COLS = ["User", "Email", "Role", "Joined", "Actions"];
const API        = process.env.NEXT_PUBLIC_URL;



const getId      = (user) => user._id?.$oid || user._id?.toString() || user._id;
const formatDate = (raw) => {
  const str = raw?.$date || raw;
  if (!str) return "N/A";
  return new Date(str).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
};

const Spinner = () => (
  <span className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
);

// ── Ultra Responsive Role Dropdown & Bottom Sheet ──────────────────────────────

function RoleDropdown({ currentRole, userId, onRoleChange, isUpdating }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [open]);

  const { badge } = ROLE_STYLES[currentRole] || ROLE_STYLES.user;

  return (
    <div ref={ref} className="relative w-24 sm:w-28">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={isUpdating}
        className={`w-full flex items-center justify-between gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-xl border text-[11px] font-semibold capitalize tracking-wide transition-all focus:outline-none ${badge}`}
      >
        {isUpdating ? (
          <><Spinner /> <span className="hidden sm:inline">Updating…</span></>
        ) : (
          <>
            {currentRole}
            <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </>
        )}
      </button>


      {open && (
        <div className="hidden md:block absolute top-full mt-1.5 left-0 z-40 w-full rounded-xl overflow-hidden shadow-2xl bg-[#0F1424] border border-white/[0.07] p-1">
          {ROLES.map((role) => (
            <button
              key={role}
              disabled={role === currentRole}
              onClick={() => {
                setOpen(false);
                onRoleChange(userId, currentRole, role);
              }}
              className={`w-full text-left px-3 py-2 text-[11px] font-semibold capitalize tracking-wide transition-colors flex items-center justify-between rounded-lg
                ${ROLE_STYLES[role].item} ${role === currentRole ? "opacity-40 cursor-default" : ""}`}
            >
              {role}
              {role === currentRole && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      )}

      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in">
          <div className="w-full bg-[#0F1424] border-t border-white/[0.08] rounded-t-2xl p-5 space-y-4 shadow-2xl transform transition-transform animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-[#F0F4FF]">Change User Role</h3>
                <p className="text-[11px] text-[#8892A4]">Select a new privilege for this user</p>
              </div>
              <button 
                onClick={() => setOpen(false)}
                className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/[0.05] border border-white/10 text-gray-400"
              >
                <Xmark className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-1.5">
              {ROLES.map((role) => (
                <button
                  key={role}
                  disabled={role === currentRole}
                  onClick={() => {
                    setOpen(false);
                    onRoleChange(userId, currentRole, role);
                  }}
                  className={`w-full text-left px-4 py-3 text-xs font-semibold capitalize tracking-wide transition-colors flex items-center justify-between rounded-xl border border-white/[0.03]
                    ${ROLE_STYLES[role].item} ${role === currentRole ? "bg-white/[0.02] opacity-40 cursor-default" : "bg-white/[0.01]"}`}
                >
                  {role}
                  {role === currentRole && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export default function UsersTableClient({ initialUsers }) {
  const [users, setUsers]           = useState(initialUsers || []);
  const [deletingId, setDeletingId] = useState(null);
  const [roleUpdatingId, setRoleUpdatingId] = useState(null);

  const handleRoleChange = async (userId, currentRole, newRole) => {
    setRoleUpdatingId(userId);
    try {
      const res = await fetch(`${API}/api/admin/users/role/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers((prev) => prev.map((u) => getId(u) === userId ? { ...u, role: newRole } : u));
        toast.success(`Role updated to "${newRole}"`);
      } else {
        toast.error("Failed to update role.");
      }
    } catch {
      toast.error("Server error.");
    } finally {
      setRoleUpdatingId(null);
    }
  };

  const handleDelete = async (userId) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    setDeletingId(userId);
    try {
      const res = await fetch(`${API}/api/admin/users/${userId}`, { method: "DELETE" });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => getId(u) !== userId));
        toast.success("User deleted.");
      } else {
        toast.error("Failed to delete user.");
      }
    } catch {
      toast.error("Error connecting to server.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#0B0F19]/70 border border-white/[0.06] backdrop-blur-xl shadow-xl">

      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between border-b border-white/5">
        <div>
          <h2 className="font-['Playfair_Display'] text-base sm:text-lg font-bold text-[#F0F4FF]">Manage Users</h2>
          <p className="text-[11px] sm:text-xs mt-0.5 text-[#8892A4]">{users.length} total members</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs text-[#8892A4] bg-white/[0.04] border border-white/[0.06]">
          <Magnifier className="w-3.5 h-3.5" /> Filter users…
        </div>
      </div>

      {/* Native Tailwind Responsive Table Wrapper */}
      <div className="overflow-x-auto w-full scrollbar-thin scrollbar-thumb-white/10">
        <table className="w-full min-w-[700px] sm:min-w-full border-collapse">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {TABLE_COLS.map((col) => (
                <th key={col} className="px-4 sm:px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-[0.15em] text-[#524534]">
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-16 text-center text-sm text-[#8892A4]">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => {
                const id = getId(user);
                const isDeleting = deletingId === id;
                const isRoleUpdating = roleUpdatingId === id;

                return (
                  <tr key={id} className="border-b border-white/[0.04] last:border-0 transition-colors hover:bg-white/[0.02]">
                    
                    {/* User Profile */}
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

                    {/* Email */}
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-[#8892A4] font-mono">
                      <div className="max-w-[150px] sm:max-w-none truncate">
                        {user.email}
                      </div>
                    </td>

                    {/* Role Dropdown */}
                    <td className="px-4 sm:px-6 py-4">
                      <RoleDropdown 
                        currentRole={user.role || "user"} 
                        userId={id} 
                        onRoleChange={handleRoleChange} 
                        isUpdating={isRoleUpdating}
                      />
                    </td>

                    {/* Joined Date */}
                    <td className="px-4 sm:px-6 py-4 text-xs sm:text-sm text-[#8892A4]">
                      {formatDate(user.createdAt)}
                    </td>

                    {/* Delete Action Button */}
                    <td className="px-4 sm:px-6 py-4">
                      <button
                        onClick={() => handleDelete(id)}
                        disabled={isDeleting}
                        className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-[10px] sm:text-[11px] font-semibold border transition-all duration-200
                          text-red-400 bg-red-400/[0.06] border-red-400/[0.15] hover:bg-red-400/[0.12] hover:border-red-400/30
                          disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {isDeleting ? (
                          <><Spinner /> <span className="hidden sm:inline">Deleting…</span></>
                        ) : (
                          <><TrashBin className="w-3.5 h-3.5" /> <span className="hidden sm:inline">Delete</span></>
                        )}
                      </button>
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
        <span>Showing <span className="text-[#D4C5B0]">{users.length}</span> of <span className="text-[#D4C5B0]">{users.length}</span> users</span>
        <span className="text-[#524534] hidden xs:inline">Fable Admin Panel</span>
      </div>

    </div>
  );
}