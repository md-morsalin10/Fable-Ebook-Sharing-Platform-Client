"use client";
import React from "react";
import { authClient } from "@/lib/auth-client";
import { ArrowRightFromSquare, Person, Gear, LayoutSideContent } from "@gravity-ui/icons";
import { Avatar, Dropdown, Label } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const NavbarProfileDropdown = () => {
    const router = useRouter();
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async () => {
        await authClient.signOut();
        router.push("/");
    };

    return (
        <div className="flex items-center">
            <Dropdown>
                {/* Trigger Avatar */}
                <Dropdown.Trigger className="rounded-full cursor-pointer ring-2 ring-gray-800 hover:ring-[#E5BA73]/60 transition-all duration-200 p-[2px]">
                    <Avatar className="w-9 h-9 bg-gray-900">
                        <Avatar.Image
                            referrerPolicy="no-referrer"
                            alt={user?.name || "User Avatar"}
                            src={user?.image || ""}
                            className="object-cover rounded-full"
                        />
                        <Avatar.Fallback className="bg-[#1A202C] text-[#E5BA73] font-serif text-sm font-bold flex items-center justify-center w-full h-full rounded-full" delayMs={600}>
                            {user?.name ? user.name[0].toUpperCase() : "F"}
                        </Avatar.Fallback>
                    </Avatar>
                </Dropdown.Trigger>

                {/* Popover Container (Added overflow-visible & height adjustment) */}
                <Dropdown.Popover className="bg-[#111622] border border-gray-800/80 rounded-2xl shadow-2xl p-1.5 min-w-[240px] text-white backdrop-blur-xl overflow-visible">

                    {/* User Profile Header Summary */}
                    <div className="px-4 py-3 border-b border-gray-800/60 mb-1">
                        <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8 bg-gray-900 ring-1 ring-gray-800">
                                <Avatar.Image
                                    alt={user?.name || "User Profile"}
                                    src={user?.image || ""}
                                />
                                <Avatar.Fallback className="bg-[#1A202C] text-[#E5BA73] text-xs font-bold" delayMs={600}>
                                    {user?.name ? user.name[0].toUpperCase() : "F"}
                                </Avatar.Fallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0">
                                <p className="text-sm font-medium text-white truncate leading-tight">{user?.name}</p>
                                <p className="text-[11px] text-gray-400 truncate mt-0.5 font-light">{user?.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <Dropdown.Menu className="flex flex-col gap-0.5 p-0 overflow-visible">
                        <Dropdown.Item id="dashboard" textValue="Dashboard" className="hover:bg-gray-800/50 p-2 rounded-xl transition-colors">
                            <Link href={`/dashboard/${user?.role}`} className="flex items-center gap-3 w-full group">
                                <LayoutSideContent className="w-4 h-4 text-gray-400 group-hover:text-[#E5BA73] transition-colors" />
                                <Label className="text-xs font-medium text-gray-300 group-hover:text-white cursor-pointer transition-colors">Dashboard</Label>
                            </Link>
                        </Dropdown.Item>

                        <Dropdown.Item id="profile" textValue="Profile" className="hover:bg-gray-800/50 p-2 rounded-xl transition-colors">
                            <Link href={'/profile'} className="flex items-center gap-3 w-full group">
                                <Person className="w-4 h-4 text-gray-400 group-hover:text-[#E5BA73] transition-colors" />
                                <Label className="text-xs font-medium text-gray-300 group-hover:text-white cursor-pointer transition-colors">Author Profile</Label>
                            </Link>
                        </Dropdown.Item>

                        <Dropdown.Item id="settings" textValue="Settings" className="hover:bg-gray-800/50 p-2 rounded-xl transition-colors">
                            <Link href={'/settings'} className="flex items-center gap-3 w-full group">
                                <Gear className="w-4 h-4 text-gray-400 group-hover:text-[#E5BA73] transition-colors" />
                                <Label className="text-xs font-medium text-gray-300 group-hover:text-white cursor-pointer transition-colors">Account Settings</Label>
                            </Link>
                        </Dropdown.Item>

                        <Dropdown.Item
                            onClick={handleSignOut}
                            id="logout"
                            textValue="Logout"
                            className="p-2 rounded-xl hover:bg-red-950/30 group transition-colors"
                        >
                            <div className="flex w-full items-center justify-between gap-2 cursor-pointer">
                                <span className="text-xs font-semibold text-red-400 group-hover:text-red-300">Log Out</span>
                                <ArrowRightFromSquare className="w-4 h-4 text-red-400 group-hover:text-red-300 group-hover:translate-x-0.5 transition-all" />
                            </div>
                        </Dropdown.Item>

                        {/* Logout Separator & Action */}
                        <div className="border-t border-gray-800/60 my-1.5" />


                    </Dropdown.Menu>
                </Dropdown.Popover>
            </Dropdown>
        </div>
    );
};

export default NavbarProfileDropdown;