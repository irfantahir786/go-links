"use client";

import { redirect, usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LayoutDashboardIcon, Link2, Menu, Settings } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';



const pageTitles: Record<string, string> = {
    "/admin/dashboard": "Dashboard",
    "/admin/links": "Links",
    "/admin/settings": "Settings",
};




export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    const avatarUrl = "../avatar.svg"
    const pathname = usePathname();
    const title = pageTitles[pathname] || "ShortLinks";

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar - Desktop */}
            <aside className="hidden md:block w-64 bg-white shadow-lg">
                <div className="p-6 font-bold text-xl text-indigo-600">ShortLinks</div>
                <nav className="px-3 space-y-2">

                    <Link href="/admin/dashboard" className="block p-3 rounded-lg hover:bg-indigo-50">
                        <div className="flex">
                            <LayoutDashboardIcon className="mr-2" />
                            <h1> Dashboard</h1>
                        </div>
                    </Link>

                    <Link href="/admin/links" className="block p-3 rounded-lg hover:bg-indigo-50">
                        <div className="flex">
                            <Link2 className="mr-2" />
                            <h1> Links</h1>
                        </div>
                    </Link>
                    <Link href="/admin/settings" className="block p-3 rounded-lg hover:bg-indigo-50">
                        <div className="flex">
                            <Settings className="mr-2" />
                            <h1> Settings</h1>
                        </div>
                    </Link>
                </nav>
            </aside>

            {/* Mobile Top Bar */}
            <div className="md:hidden fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
                <Sheet>
                    <SheetTrigger>
                        <Menu className="h-6 w-6" />
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64 p-6">
                        <div className="font-bold text-xl mb-4 text-indigo-600">ShortLinks</div>
                        <nav className="space-y-3">
                            <Link href="/dashboard" className="block p-3 rounded-lg hover:bg-indigo-50">
                                Dashboard
                            </Link>
                            <Link href="/dashboard/links" className="block p-3 rounded-lg hover:bg-indigo-50">
                                Links
                            </Link>
                            <Link href="/dashboard/settings" className="block p-3 rounded-lg hover:bg-indigo-50">
                                Settings
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Main Content */}
            <main className="w-full">
                <div className="bg-white shadow-[15px] h-15 w-full flex justify-between px-4 items-center">

                    <h1 className="text-2xl font-semibold">{title}</h1>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer">
                                {avatarUrl ? (
                                    <AvatarImage src={avatarUrl} alt={"Admin"} />
                                ) : (
                                    <AvatarFallback>

                                    </AvatarFallback>
                                )}
                            </Avatar>
                        </PopoverTrigger>

                        <PopoverContent className="w-48 p-2">
                            <Link
                                href="/dashboard/profile"
                                className="block px-2 py-2 rounded hover:bg-gray-100"
                            >
                                Profile
                            </Link>

                            <a
                                onClick={() => {
                                    redirect("http://localhost:3000/login")
                                }}
                                className="block px-2 py-2 rounded hover:bg-gray-100 text-red-600"
                            >
                                Logout
                            </a>
                        </PopoverContent>
                    </Popover>

                </div>
                <div className="flex-1 p-6 md:ml-0 mt-16 md:mt-0">
                    <ToastContainer />
                    {children}
                </div>

            </main>
        </div>
    );
}
