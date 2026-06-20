"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
// Icons
import { 
  Book, 
  ArrowRightArrowLeft, 
  Gear, 
  Bars, 
  LayoutSideContent,
  Plus,
  Bookmark
} from "@gravity-ui/icons";
import { Drawer } from "@heroui/react";

export function DashboardSideBar() {
  const pathname = usePathname();
  
  // 👥 Better-Auth সেশন রিড করা
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const currentRole = user?.role || "user"; // Default role "user" (Reader)

  // ✍️ রাইটার (Writer) প্যানেল মেনু
  const writerNavItems = [
    { icon: LayoutSideContent, href: "/dashboard/writer", label: "Dashboard Home" },
    { icon: Book, href: "/dashboard/writer/my-book", label: "Manage Ebooks" },
    { icon: Plus, href: "/dashboard/writer/add-ebook", label: "Add Ebook" },
    { icon: Bookmark, href: "/dashboard/writer/bookmarks", label: "Bookmark Page" },
    { icon: ArrowRightArrowLeft, href: "/dashboard/writer/sales-history", label: "Sales History" },
  ];

  // 📖 রিডার (Reader/User) প্যানেল মেনু
  const readerNavItems = [
    { icon: LayoutSideContent, href: "/dashboard", label: "Dashboard Home" },
    { icon: Book, href: "/dashboard/user", label: "Purchased Ebooks" },
    { icon: ArrowRightArrowLeft, href: "/dashboard/user/purchase-history", label: "Purchase History" },
    { icon: Bookmark, href: "/dashboard/user/bookmarks", label: "Bookmark Page" },
    { icon: Gear, href: "/dashboard/user/profile", label: "Profile Management" },
  ];

  // রোল অনুযায়ী নেভিগেশন আইটেম ফিল্টার করা
  const navItems = currentRole === "writer" ? writerNavItems : readerNavItems;

  const navContent = (
    <div className="flex flex-col h-full bg-[#0B0F17] text-white py-6 px-4">
      {/* 👑 Brand Identity */}
      <div className="px-3 mb-9">
        <Link href="/" className="text-2xl font-serif font-bold text-[#E5BA73] tracking-wider block">
          Fable 
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#E5BA73]/60 font-bold ml-1.5 capitalize">
            {currentRole === "writer" ? "Writer Panel" : "Reader Panel"}
          </span>
        </Link>
      </div>

      {/* 🔗 Navigation Links */}
      <nav className="flex-1 flex flex-col gap-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3.5 rounded-xl px-4 py-3 text-xs uppercase tracking-wider font-semibold transition-all duration-200 group ${
                isActive
                  ? "bg-[#E5BA73]/10 text-[#E5BA73] border border-[#E5BA73]/20"
                  : "text-gray-400 hover:text-white hover:bg-gray-900/40"
              }`}
            >
              <item.icon 
                className={`w-4 h-4 transition-colors ${
                  isActive ? "text-[#E5BA73]" : "text-gray-500 group-hover:text-gray-300"
                }`} 
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* 🖥️ Desktop Fixed Sidebar */}
      <aside className="hidden lg:block w-64 h-full flex-shrink-0 bg-[#0B0F17]">
        {navContent}
      </aside>

      {/* 📱 Mobile Responsive Trigger Button & Drawer */}
      <div className="lg:hidden fixed bottom-6 right-6 z-50">
        <Drawer>
          <Drawer.Trigger>
            <div className="bg-[#E5BA73] text-[#0B0F17] font-bold uppercase tracking-wider rounded-full shadow-2xl p-4 cursor-pointer flex items-center justify-center hover:bg-[#d4a75e] active:scale-95 transition-transform">
              <Bars className="w-5 h-5" />
            </div>
          </Drawer.Trigger>
          
          <Drawer.Backdrop>
            <Drawer.Content placement="left" className="bg-[#0B0F17] p-0 max-w-[260px]">
              <Drawer.Dialog className="bg-[#0B0F17] h-full p-0">
                <Drawer.Body className="p-0 h-full">
                  {navContent}
                </Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}