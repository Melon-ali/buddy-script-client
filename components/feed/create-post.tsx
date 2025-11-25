"use client";

import { useState, useRef } from "react";
import { ImageIcon, Video, Calendar, FileText, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { useCreatePostsMutation } from "@/redux/features/posts/postsApi";

export function CreatePost() {
  const [content, setContent] = useState("");
  const [visibility] = useState("PUBLIC");
  const [file, setFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [createPost, { isLoading }] = useCreatePostsMutation();

  const handleFilePick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error("Write something...");
      return;
    }

    const payload = { content, visibility };
    const formData = new FormData();

    formData.append("text", JSON.stringify(payload));
    if (file) formData.append("file", file);

    try {
      const res: any = await createPost(formData).unwrap();
      toast.success("Post created!");

      setContent("");
      setFile(null);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to post");
    }
  };

  return (
    <Card className="rounded-lg border-border">
      <CardContent className="p-6">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        {/* Main content area */}
        <div className="flex gap-4 mb-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="/placeholder.svg?key=me" />
            <AvatarFallback>ME</AvatarFallback>
          </Avatar>
          <div className="flex-1 relative">
            <textarea
              className="form-control w-full bg-muted border-0 rounded-xl px-4 py-3 pr-12 min-h-[60px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Write something ..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        {/* Desktop buttons */}
        <div className="hidden md:flex justify-between items-center pt-4 border-t border-border">
          <div className="flex gap-4">
            <Button
              variant="ghost"
              onClick={handleFilePick}
              className="flex items-center gap-2 h-auto py-2 px-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg"
            >
              <ImageIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Photo</span>
            </Button>

            <Button
              variant="ghost"
              onClick={handleFilePick}
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

          <Button
            disabled={isLoading}
            onClick={handleSubmit}
            className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            <span>{isLoading ? "Posting..." : "Post"}</span>
          </Button>
        </div>

        {/* Mobile buttons */}
        <div className="md:hidden pt-4 border-t border-border">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFilePick}
                className="h-10 w-10 text-muted-foreground hover:text-green-600 hover:bg-green-50 rounded-full"
              >
                <ImageIcon className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleFilePick}
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

            <Button
              disabled={isLoading}
              onClick={handleSubmit}
              className="bg-primary hover:bg-primary/90 text-white rounded-lg px-4 py-2 flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              <span>{isLoading ? "Posting..." : "Post"}</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
