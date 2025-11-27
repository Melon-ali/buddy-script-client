"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Users, MessageCircle, Search, Bell, Settings, HelpCircle } from "lucide-react";

import LogoutButton from "./logout/logoutButton";
import { useGetMeQuery } from "@/redux/features/auth/userApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [notificationCount] = useState(6);
  const [messageCount] = useState(2);

  // Fetch Logged In User Data
  const { data: meData, isLoading: userLoading } = useGetMeQuery(null);
  const user = meData?.data;

  return (
    <nav className="hidden lg:block bg-card border-b fixed top-0 left-0 right-0 z-50 h-[75px] shadow-sm">
      <div className="container max-w-7xl mx-auto px-4 h-full flex items-center justify-between gap-4">

        {/* Logo */}
        <Link href="/">
          <Image src="/images/logo.png" alt="BuddyScript" width={160} height={40} className="h-7 w-auto" />
        </Link>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search Here..."
            className="w-[424px] h-10 pl-12 pr-4 rounded-full bg-secondary"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="flex items-center gap-2">

          <Link href="/feed">
            <Button variant="ghost" size="icon" className="relative">
              <Home className="h-5 w-5 text-blue-600" />
            </Button>
          </Link>

          <Link href="/friend-request">
            <Button variant="ghost" size="icon" className="relative">
              <Users className="h-5 w-5 text-gray-600" />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                {notificationCount > 0 && (
                  <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notificationCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 max-h-96 overflow-y-auto">
              <div className="p-3 font-semibold">Notifications</div>
              <DropdownMenuSeparator />
              {[...Array(notificationCount)].map((_, i) => (
                <DropdownMenuItem key={i} className="p-3">
                  <div className="flex gap-3">
                    <Image
                      src={i % 2 === 0 ? "/images/friend-req.jpg" : "/images/profile-1.jpg"}
                      alt="User"
                      width={40}
                      height={40}
                      className="rounded-full flex-shrink-0 object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-semibold">Steve Jobs</span> posted a link in your timeline.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">42 minutes ago</p>
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/chat">
            <Button variant="ghost" size="icon" className="relative">
              <MessageCircle className="h-5 w-5 text-gray-600" />
              {messageCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {messageCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-4 rounded-full">
                {/* Avatar */}
                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary bg-muted">
                  <Image
                    src={user?.profilePhoto || "/images/default-avatar.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>

                {/* Name + Email */}
                <div className="hidden xl:block text-left">
                  <p className="text-sm font-semibold">{userLoading ? "Loading..." : user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60">
              {/* Header */}
              <div className="flex items-center gap-3 p-2 border-b">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={user?.profilePhoto || "/images/Avater.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              <DropdownMenuItem>
                <Users className="mr-2 h-4 w-4" /> Profile
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" /> Settings
              </DropdownMenuItem>

              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" /> Help & Support
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* Logout */}
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
