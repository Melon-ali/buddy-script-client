"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import Image from "next/image"

const notifications = [
  {
    id: 1,
    user: "Steve Jobs",
    action: "posted a link in your timeline.",
    time: "42 minutes ago",
    avatar: "/abstract-geometric-shapes.png",
  },
  {
    id: 2,
    user: "Admin",
    action: "changed the name of the group Freelancer usa to Freelancer usa",
    time: "42 minutes ago",
    avatar: "/abstract-geometric-shapes.png",
  },
  {
    id: 3,
    user: "Steve Jobs",
    action: "posted a link in your timeline.",
    time: "42 minutes ago",
    avatar: "/abstract-geometric-shapes.png",
  },
]

export function NotificationsDropdown() {
  const [showAll, setShowAll] = useState(true)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            6
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h4 className="font-semibold text-lg">Notifications</h4>
          <Button variant="ghost" size="icon">
            <svg className="h-4 w-4" viewBox="0 0 4 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="2" cy="2" r="2" fill="currentColor" />
              <circle cx="2" cy="8" r="2" fill="currentColor" />
              <circle cx="2" cy="15" r="2" fill="currentColor" />
            </svg>
          </Button>
        </div>
        <div className="flex gap-2 p-2 border-b border-border">
          <Button variant={showAll ? "default" : "ghost"} size="sm" onClick={() => setShowAll(true)} className="flex-1">
            All
          </Button>
          <Button
            variant={!showAll ? "default" : "ghost"}
            size="sm"
            onClick={() => setShowAll(false)}
            className="flex-1"
          >
            Unread
          </Button>
        </div>
        <ScrollArea className="h-[400px]">
          <div className="p-2">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer">
                <div className="shrink-0">
                  <Image
                    src={notification.avatar || "/placeholder.svg"}
                    alt={notification.user}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold">{notification.user}</span> {notification.action}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
