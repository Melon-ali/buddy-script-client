"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Bell, Home, MessageCircle, Search, Users, Menu, Settings, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NotificationsDropdown } from "@/components/notifications-dropdown"

export function Navbar() {
  const [showSearch, setShowSearch] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:block bg-card border-b border-border fixed top-0 left-0 right-0 z-50 h-[75px] shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 h-full">
          <div className="flex items-center justify-between gap-4 h-full">

            {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image src="/logo.png" alt="BuddyScript" width={160} height={40} className="h-7 w-auto" priority />
            </Link>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search Here..."
                className="w-[424px] h-10 pl-12 pr-4 rounded-full bg-secondary border-secondary focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            {/* Navigation Icons */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="rounded-full bg-secondary text-primary hover:bg-primary/10 w-10 h-10">
                  <Home className="h-5 w-5" />
                </Button>
              </Link>

              <Link href="/friend-requests">
                <Button variant="ghost" size="icon" className="rounded-full bg-secondary text-primary hover:bg-primary/10 w-10 h-10">
                  <Users className="h-5 w-5" />
                </Button>
              </Link>

              <NotificationsDropdown />

              <Link href="/messages">
                <Button variant="ghost" size="icon" className="relative rounded-full bg-secondary text-primary hover:bg-primary/10 w-10 h-10">
                  <MessageCircle className="h-5 w-5" />
                  <span className="absolute top-2 right-2 bg-destructive text-white text-[10px] rounded-full h-2 w-2 border-2 border-card box-content"></span>
                </Button>
              </Link>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-4 rounded-full hover:bg-accent/50 ml-2">
                    <div className="h-10 w-10 rounded-full bg-muted overflow-hidden border-2 border-primary">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="hidden xl:block text-left">
                      <p className="text-sm font-semibold leading-none">Austin Robertson</p>
                      <p className="text-xs text-muted-foreground mt-1">Marketing Manager</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-60">
                  <div className="flex items-center gap-3 p-2 border-b mb-2">
                    <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">Austin Robertson</p>
                      <p className="text-xs text-muted-foreground">Marketing Manager</p>
                    </div>
                  </div>

                  <DropdownMenuItem className="cursor-pointer">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="cursor-pointer">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    <span>Help & Support</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-card border-b border-border fixed top-0 left-0 right-0 z-50 py-3">
        <div className="container px-4 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="BuddyScript" width={140} height={35} className="h-8 w-auto" priority />
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => setShowSearch(!showSearch)}>
              <Search className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {showSearch && (
          <div className="container mt-3 px-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full bg-secondary border-0 pl-10"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 flex justify-around p-2">
        <Button variant="ghost" size="icon" className="text-primary">
          <Home className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <Users className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <MessageCircle className="h-5 w-5" />
        </Button>
      </div>
    </>
  )
}
