"use client"

import { useState } from "react"
import Image from "next/image"
import { MoreHorizontal, Heart, MessageCircle, Share2, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PostProps {
  user: {
    name: string
    image: string
  }
  time: string
  content: string
  image?: string
  stats: {
    likes: number
    comments: number
    shares: number
  }
}

export function PostCard({ post }: { post: PostProps }) {
  const [liked, setLiked] = useState(false)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 p-4 pb-2">
        <Avatar>
          <AvatarImage src={post.user.image || "/placeholder.svg"} />
          <AvatarFallback>{post.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-sm">{post.user.name}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span>{post.time}</span>
            <span>•</span>
            <span>Public</span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Save Post</DropdownMenuItem>
            <DropdownMenuItem>Turn On Notification</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Hide Post</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <CardContent className="p-0">
        <div className="px-4 pb-3">
          <p className="text-sm">{post.content}</p>
        </div>

        {post.image && (
          <div className="relative w-full aspect-video bg-muted">
            <Image src={post.image || "/placeholder.svg"} alt="Post content" fill className="object-cover" />
          </div>
        )}

        <div className="px-4 py-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <div className="h-4 w-4 rounded-full bg-blue-500 flex items-center justify-center border border-background">
                <Heart className="h-2.5 w-2.5 text-white fill-white" />
              </div>
              <div className="h-4 w-4 rounded-full bg-red-500 flex items-center justify-center border border-background">
                <Heart className="h-2.5 w-2.5 text-white fill-white" />
              </div>
            </div>
            <span>{post.stats.likes + (liked ? 1 : 0)}</span>
          </div>
          <div className="flex gap-3">
            <span className="hover:underline cursor-pointer">{post.stats.comments} Comments</span>
            <span className="hover:underline cursor-pointer">{post.stats.shares} Shares</span>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between p-2">
          <Button
            variant="ghost"
            className={`flex-1 gap-2 ${liked ? "text-red-500 hover:text-red-600" : "text-muted-foreground"}`}
            onClick={() => setLiked(!liked)}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            <span className="text-xs font-medium">Like</span>
          </Button>
          <Button variant="ghost" className="flex-1 gap-2 text-muted-foreground">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs font-medium">Comment</span>
          </Button>
          <Button variant="ghost" className="flex-1 gap-2 text-muted-foreground">
            <Share2 className="h-4 w-4" />
            <span className="text-xs font-medium">Share</span>
          </Button>
        </div>

        <Separator />

        <div className="p-3 flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?key=me" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1 relative">
            <Input placeholder="Write a comment..." className="bg-muted border-0 h-9 rounded-full px-4 pr-10 text-sm" />
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-0.5 top-0.5 h-8 w-8 text-muted-foreground hover:text-primary rounded-full"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
