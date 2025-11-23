import { ImageIcon, Video, Calendar, FileText, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function CreatePost() {
  return (
    <Card className="rounded-lg border-border">
      <CardContent className="p-6">
        {/* Main content area */}
        <div className="flex gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?key=me" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1 relative">
            <div className="form-floating relative">
              <textarea 
                className="form-control w-full bg-muted border-0 rounded-xl px-4 py-3 pr-12 min-h-[60px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Write something ..."
                id="floatingTextarea"
              />
              <label 
                htmlFor="floatingTextarea" 
                className="absolute left-4 top-3 text-muted-foreground transition-all duration-200 pointer-events-none flex items-center gap-2"
              >
                
                
              </label>
            </div>
          </div>
        </div>

        {/* Desktop buttons */}
        <div className="hidden md:flex justify-between items-center pt-4 border-t border-border">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              className="flex items-center gap-2 h-auto py-2 px-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg"
            >
              <ImageIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Photo</span>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2 h-auto py-2 px-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg"
            >
              <Video className="h-5 w-5" />
              <span className="text-sm font-medium">Video</span>
            </Button>
            <Button
              variant="ghost"
              className="flex items-center gap-2 h-auto py-2 px-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg"
            >
              <Calendar className="h-5 w-5" />
              <span className="text-sm font-medium">Event</span>
            </Button>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Post</span>
          </Button>
        </div>

        {/* Mobile buttons */}
        <div className="md:hidden pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-muted-foreground hover:text-green-600 hover:bg-green-50 rounded-full"
              >
                <ImageIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-full"
              >
                <Video className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-muted-foreground hover:text-yellow-600 hover:bg-yellow-50 rounded-full"
              >
                <Calendar className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
              >
                <FileText className="h-5 w-5" />
              </Button>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 flex items-center gap-2">
              <Send className="h-4 w-4" />
              <span>Post</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}