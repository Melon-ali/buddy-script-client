"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Heart,
  MessageCircle,
  Share2,
  Send,
  Trash2,
  Edit2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "@/redux/features/posts/postsApi";
import {
  useUserLikesMutation,
  useAllLikesQuery,
} from "@/redux/features/likes/likesApi";
import {
  useGetCommentsByPostIdQuery,
  useUserCommentsMutation,
} from "@/redux/features/comments/commentsApi";

export function PostCard({ post }: any) {
  const [liked, setLiked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [newComment, setNewComment] = useState("");

  const [deletePost, { isLoading: deleting }] = useDeletePostMutation();
  const [updatePost, { isLoading: updating }] = useUpdatePostMutation();
  const [createLike] = useUserLikesMutation();
  const { data: allLikesData } = useAllLikesQuery("");
  const likesArray = allLikesData?.data || allLikesData || [];

  const { data: commentsData, refetch: refetchComments } =
    useGetCommentsByPostIdQuery(post.id);
  const [createComment] = useUserCommentsMutation();

  const author = post.author || {};
  const username = author.username || "Unknown User";
  const userImage = author.image || "/placeholder.svg";

  // -------- DELETE POST --------
  const handleDelete = async () => {
    try {
      await deletePost(post.id).unwrap();
      toast.success("Post deleted successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete post");
    }
  };

  // -------- SAVE EDIT --------
  const handleSaveEdit = async () => {
    if (!editedContent.trim()) {
      toast.error("Content cannot be empty");
      return;
    }
    try {
      await updatePost({ id: post.id, content: editedContent }).unwrap();
      setIsEditing(false);
      toast.success("Post updated successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update post");
    }
  };

  // -------- LIKE POST --------
  const handleLike = async () => {
    try {
      await createLike({ postId: post.id }).unwrap();
      setLiked(!liked);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to like post");
    }
  };

  // -------- CHECK IF ALREADY LIKED --------
  useEffect(() => {
    if (likesArray.length) {
      const likedAlready = likesArray.find(
        (like: any) => like.postId === post.id
      );
      setLiked(!!likedAlready);
    }
  }, [likesArray, post.id]);

  // -------- ADD COMMENT --------
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      await createComment({ postId: post.id, content: newComment }).unwrap();
      setNewComment("");
      refetchComments();
      toast.success("Comment added!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add comment");
    }
  };

  return (
    <Card className="bg-white dark:bg-[#112032] text-black dark:text-white border border-border">
      <CardHeader className="flex flex-row items-center gap-3 p-4 pb-2">
        <Avatar>
          <AvatarImage src={userImage} />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1">
          <h3 className="font-semibold text-sm">{username}</h3>
          <p className="text-xs text-muted-foreground dark:text-gray-400">
            {new Date(post.createdAt).toLocaleString()} • Public
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={handleDelete}
            disabled={deleting}
          >
            <Trash2 className="h-4 w-4 text-red-600" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              className="form-control w-full border border-border rounded-xl px-3 py-2 resize-none
                         bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setEditedContent(post.content);
                }}
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveEdit} disabled={updating}>
                {updating ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm">{post.content}</p>
        )}

        {post.imageUrl && (
          <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-800 mt-3 rounded-xl">
            <Image
              src={post.imageUrl}
              alt="Post image"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        )}

        <div className="px-0 py-3 flex items-center justify-between text-xs text-muted-foreground dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 mr-1" />{" "}
            {post.likeCount + (liked ? 1 : 0)}
          </div>
          <div className="flex gap-3">
            <span className="hover:underline cursor-pointer">
              {commentsData?.length || 0} Comments
            </span>
            <span className="hover:underline cursor-pointer">0 Shares</span>
          </div>
        </div>

        <Separator className="border-gray-300 dark:border-gray-700" />

        <div className="flex items-center justify-between p-2">
          <Button
            variant="ghost"
            className={`flex-1 gap-2 ${
              liked ? "text-red-500 hover:text-red-600" : "text-muted-foreground dark:text-gray-300"
            }`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
            <span className="text-xs font-medium">Like</span>
          </Button>
          <Button variant="ghost" className="flex-1 gap-2 text-muted-foreground dark:text-gray-300">
            <MessageCircle className="h-4 w-4" />
            <span className="text-xs font-medium">Comment</span>
          </Button>
          <Button variant="ghost" className="flex-1 gap-2 text-muted-foreground dark:text-gray-300">
            <Share2 className="h-4 w-4" />
            <span className="text-xs font-medium">Share</span>
          </Button>
        </div>

        {/* -------- COMMENTS LIST -------- */}
        <div className="mt-3 space-y-2">
          {commentsData?.map((comment: any) => (
            <div
              key={comment.id}
              className="flex items-start gap-2 text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src={comment.author?.image || "/placeholder.svg"} />
                <AvatarFallback>
                  {comment.author?.username?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p>
                  <strong>{comment.author?.username || "Unknown"}:</strong> {comment.content}
                </p>
                <span className="text-xs text-muted-foreground dark:text-gray-400">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}

          {/* -------- ADD COMMENT -------- */}
          <div className="flex items-center gap-2 mt-2">
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 bg-gray-100 dark:bg-gray-700 text-black dark:text-white border border-border dark:border-gray-600"
            />
            <Button size="icon" onClick={handleAddComment}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
