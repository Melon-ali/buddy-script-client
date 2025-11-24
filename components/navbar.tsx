"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Home, Users, MessageCircle, Search, Bell, Menu, Settings, HelpCircle } from "lucide-react";

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
  const [showSearch, setShowSearch] = useState(false);

  // Fetch Logged In User Data
  const { data: meData, isLoading: userLoading } = useGetMeQuery(null);
  const user = meData?.data;

  return (
    <>
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

          {/* Icons */}
          <div className="flex items-center gap-4">

            <Link href="/">
              <Button variant="ghost" size="icon" className="rounded-full bg-secondary w-10 h-10">
                <Home className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/friend-requests">
              <Button variant="ghost" size="icon" className="rounded-full bg-secondary w-10 h-10">
                <Users className="h-5 w-5" />
              </Button>
            </Link>

            <Link href="/messages">
              <Button variant="ghost" size="icon" className="rounded-full bg-secondary w-10 h-10 relative">
                <MessageCircle className="h-5 w-5" />
                <span className="absolute top-2 right-2 bg-destructive h-2 w-2 rounded-full"></span>
              </Button>
            </Link>

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-4 rounded-full">

                  {/* Avatar */}
                  <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary bg-muted">
                    <Image
                      src={
                        user?.profilePhoto
                          ? user.profilePhoto
                          : "/images/default-avatar.png"
                      }
                      alt="Profile"
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>

                  {/* Name + Email */}
                  <div className="hidden xl:block text-left">
                    <p className="text-sm font-semibold">
                      {userLoading ? "Loading..." : user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>

                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-60">

                {/* Header */}
                <div className="flex items-center gap-3 p-2 border-b">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={
                        user?.profilePhoto
                          ? user.profilePhoto
                          : "/images/default-avatar.png"
                      }
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
                  <Users className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help & Support
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Logout */}
                <LogoutButton />

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </>
  );
}
