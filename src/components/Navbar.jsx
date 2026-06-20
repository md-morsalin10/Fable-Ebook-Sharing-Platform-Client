"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars, Xmark } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import NavbarProfileDropdown from "./NavbarProfileDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user

  // if(pathname.includes("dashboard")){
  //   return null;
  // }

  // console.log(user, "from navbar");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse", href: "/browse" },
    { name: "Writers", href: "/writers" },
    { name: "Dashboard", href: `/dashboard/${user?.role}` },

  ];

  // const dashboardLinks = {
  //   seeker: "/dashboard/reader",
  //   recruiter: "/dashboard/writer"
  // }

  // if (user?.email) {
  //   navLinks.push({
  //     label: "Dashboard",
  //     href: dashboardLinks[user?.role || "seeker"]
  //   })
  // }

  return (
    <nav className="bg-[#0B0F17] text-white border-b border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left Side: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-3xl font-serif font-bold text-[#E5BA73] tracking-wide">
              Fable
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-semibold tracking-medium pb-2 transition-colors duration-200 hover:text-[#E5BA73] ${isActive ? "text-[#E5BA73]" : "text-gray-300"
                    }`}
                >
                  {link.name}
                  {/* Active Route Underline indicator from image_d337a6.png */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#E5BA73] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Side: Auth Buttons */}


          <div className="hidden md:flex items-center space-x-6">

            {user ? <>

              <h2 className="text-white text-sm font-medium">
                Hi, {user?.name}
              </h2>
              <NavbarProfileDropdown />
            </> : <>

              <Link
                href="/login"
                className="text-sm font-semibold text-gray-300 hover:text-[#E5BA73] transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="bg-[#E5BA73] text-[#0B0F17] px-6 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-amber-900/20 hover:bg-[#d4a75e] transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Get Started
              </Link>
            </>}
          </div>

          {/* Mobile Menu Button (Gravity UI Icons) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <Xmark className="block" style={{ width: '24px', height: '24px' }} />
              ) : (
                <Bars className="block" style={{ width: '24px', height: '24px' }} />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100 visible" : "max-h-0 opacity-0 invisible overflow-hidden"
          }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-4 space-y-2 bg-[#0E1420] border-t border-gray-800 shadow-xl">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-base font-medium transition-colors duration-150 ${isActive
                  ? "bg-gray-800 text-[#E5BA73] font-semibold"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          {/* Mobile Auth Links Splitter */}
          <div className="pt-4 mt-4 border-t border-gray-800 px-4 space-y-3">
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center text-base font-medium text-gray-300 hover:text-white py-2"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-[#E5BA73] text-[#0B0F17] px-4 py-2.5 rounded-full text-base font-bold shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;