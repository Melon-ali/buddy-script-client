"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
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

// API
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "@/redux/features/posts/postsApi";
import { useUserLikesMutation, useAllLikesQuery } from "@/redux/features/likes/likesApi";
import {
  useUserCommentsMutation,
  useDeleteCommentMutation,
} from "@/redux/features/comments/commentsApi";

export function PostCard({ post }: any) {
  const token = Cookies.get("token");
  const currentUser = token ? JSON.parse(Cookies.get("user") || "{}") : null;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const [deletePost] = useDeletePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [createLike] = useUserLikesMutation();
  const [createComment] = useUserCommentsMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const { data: allLikesData } = useAllLikesQuery("");
  const likesArray = allLikesData?.data || allLikesData || [];

  const author = post.author || {};
  const username = author.username || "Unknown User";
  const userImage = author.image || "/placeholder.svg";

  // -------- CHECK IF CURRENT USER LIKED --------
  useEffect(() => {
    if (likesArray?.length && currentUser?.email) {
      const likedAlready = likesArray.find(
        (like: any) =>
          like.postId === post.id && like.user?.email === currentUser.email
      );
      setLiked(!!likedAlready);
      setLikeCount(
        likesArray.filter((like: any) => like.postId === post.id).length
      );
    }
  }, [likesArray, post.id, currentUser]);

  // -------- DELETE POST --------
  const handleDelete = async () => {
    if (!currentUser || currentUser?.email !== author?.email) {
      toast.error("You can delete only your own posts.");
      return;
    }
    try {
      await deletePost(post.id).unwrap();
      toast.success("Post deleted!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete post");
    }
  };

  // -------- EDIT / SAVE --------
  const handleSaveEdit = async () => {
    if (!editedContent.trim()) {
      toast.error("Content cannot be empty!");
      return;
    }
    try {
      await updatePost({ id: post.id, content: editedContent }).unwrap();
      setIsEditing(false);
      toast.success("Post updated!");
    } catch (error) {
      toast.error("Failed to update post");
    }
  };

  // -------- LIKE / UNLIKE --------
  const handleLike = async () => {
    if (!currentUser || !token) {
      toast.error("You must login to like.");
      return;
    }
    try {
      setLiked(!liked);
      setLikeCount((prev: number) => (liked ? prev - 1 : prev + 1));
      const res: any = await createLike({ postId: post.id }).unwrap();
      setLiked(res?.data?.isLiked ?? liked);
    } catch (error) {
      setLiked(liked);
      setLikeCount((prev: number) => (liked ? prev + 1 : prev - 1));
      toast.error("Failed to like post");
    }
  };

  // -------- ADD COMMENT --------
  const handleAddComment = async () => {
    if (!currentUser || !token) {
      toast.error("You must login to comment.");
      return;
    }
    if (!newComment.trim()) return;

    const tempComment = {
      id: `temp-${Date.now()}`,
      content: newComment,
      author: currentUser,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    try {
      setComments([tempComment, ...comments]);
      setNewComment("");

      const res: any = await createComment({
        postId: post.id,
        authorId: currentUser?.id || currentUser?._id,
        content: tempComment.content,
      }).unwrap();

      if (res?.data) {
        setComments((prev: any[]) =>
          prev.map((c: any) => (c.id === tempComment.id ? res.data : c))
        );
      }
    } catch (err) {
      setComments((prev: any[]) => prev.filter((c: any) => c.id !== tempComment.id));
      toast.error("Failed to add comment");
    }
  };

  // -------- ADD REPLY --------
  const handleAddReply = async (parentId: string) => {
    if (!currentUser || !token) {
      toast.error("You must login to reply.");
      return;
    }
    if (!replyContent.trim()) return;

    const tempReply = {
      id: `temp-${Date.now()}`,
      content: replyContent,
      author: currentUser,
      createdAt: new Date().toISOString(),
    };

    try {
      setComments((prev: any) =>
        prev.map((c: any) =>
          c.id === parentId
            ? { ...c, replies: [tempReply, ...(c.replies || [])] }
            : c
        )
      );
      setReplyContent("");
      setReplyingTo(null);

      const res: any = await createComment({
        postId: post.id,
        parentId,
        authorId: currentUser?.id || currentUser?._id,
        content: tempReply.content,
      }).unwrap();

      if (res?.data) {
        setComments((prev: any) =>
          prev.map((c: any) =>
            c.id === parentId
              ? {
                  ...c,
                  replies: c.replies?.map((r: any) =>
                    r.id === tempReply.id ? res.data : r
                  ),
                }
              : c
          )
        );
      }
    } catch (err) {
      setComments((prev: any) =>
        prev.map((c: any) => ({
          ...c,
          replies: c.replies?.filter((r: any) => r.id !== tempReply.id),
        }))
      );
      toast.error("Failed to add reply");
    }
  };

  // -------- DELETE COMMENT / REPLY --------
  const handleDeleteComment = async (commentId: string) => {
    if (!currentUser) {
      toast.error("You must login to delete a comment.");
      return;
    }

    const isOwnComment = comments.some(
      (c: any) =>
        (c.id === commentId && (c.author?.id === currentUser?.id || c.author?._id === currentUser?.id)) ||
        c.replies?.some((r: any) => r.id === commentId && (r.author?.id === currentUser?.id || r.author?._id === currentUser?.id))
    );

    if (!isOwnComment) {
      toast.error("You can delete only your own comment or reply.");
      return;
    }

    try {
      // Remove from state
      setComments((prev: any[]) =>
        prev.map((c: any) => ({
          ...c,
          replies: c.replies?.filter((r: any) => r.id !== commentId),
        })).filter((c: any) => c.id !== commentId)
      );
      await deleteComment(commentId).unwrap();
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error("Failed to delete comment/reply");
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
            {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
        {currentUser?.email === author?.email && (
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" onClick={() => setIsEditing(!isEditing)}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={handleDelete}>
              <Trash2 className="h-4 w-4 text-red-600" />
            </Button>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <textarea
              className="w-full border rounded-xl bg-gray-100 dark:bg-gray-800 text-black dark:text-white px-3 py-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveEdit}>Save</Button>
            </div>
          </div>
        ) : (
          <p className="text-sm">{post.content}</p>
        )}

        {post.imageUrl && (
          <div className="relative w-full aspect-video mt-3">
            <Image
              src={post.imageUrl}
              alt="Post image"
              fill
              className="object-cover rounded-xl"
            />
          </div>
        )}

        <div className="px-0 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1">
            <Heart className={`h-4 w-4 mr-1 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            {likeCount}
          </div>
          <div className="flex gap-3">
            <span>{comments?.length || 0} Comments</span>
            <span>0 Shares</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between p-2">
          <Button variant="ghost" className="flex-1 gap-2" onClick={handleLike}>
            <Heart className={`h-4 w-4 ${liked ? "fill-red-500 text-red-500" : ""}`} />
            Like
          </Button>
          <Button variant="ghost" className="flex-1 gap-2" onClick={() => setReplyingTo(null)}>
            <MessageCircle className="h-4 w-4" /> Comment
          </Button>
          <Button variant="ghost" className="flex-1 gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>

        {/* ===== COMMENTS & REPLIES ===== */}
        <div className="mt-3 space-y-3">
          {comments?.map((comment: any) => (
            <div
              key={comment.id}
              className={`flex flex-col gap-2 p-3 rounded-lg ${
                replyingTo === comment.id ? "bg-blue-50 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-800"
              }`}
            >
              <div className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author?.image || "/placeholder.svg"} />
                  <AvatarFallback>{comment.author?.username?.[0] || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <strong>{comment.author?.username}</strong> {comment.content}
                  </p>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>

                  <div className="flex gap-4 mt-1 text-xs text-gray-400">
                    <button
                      onClick={() => setReplyingTo(comment.id)}
                      className="hover:text-blue-500"
                    >
                      Reply
                    </button>

                    {(comment.author?.id === currentUser?.id || comment.author?._id === currentUser?.id) && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="hover:text-red-500"
                      >
                        Delete
                      </button>
                    )}
                  </div>

                  {/* ADD REPLY INPUT */}
                  {replyingTo === comment.id && (
                    <div className="flex gap-2 mt-2">
                      <Input
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write a reply…"
                        className="bg-gray-200 dark:bg-gray-700"
                      />
                      <Button size="icon" onClick={() => handleAddReply(comment.id)}>
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => setReplyingTo(null)}>
                        Cancel
                      </Button>
                    </div>
                  )}

                  {/* REPLIES */}
                  {comment.replies?.length > 0 && (
                    <div className="ml-10 mt-2 space-y-2 border-l border-gray-300 dark:border-gray-600 pl-3">
                      {comment.replies.map((reply: any) => (
                        <div key={reply.id} className="flex flex-col gap-1">
                          <div className="flex gap-2 items-start">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={reply.author?.image || "/placeholder.svg"} />
                              <AvatarFallback>{reply.author?.username?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-xl px-2 py-1">
                              <p className="text-sm">
                                <strong>{reply.author?.username}</strong>{" "}
                                <span className="text-gray-500 text-xs">
                                  @{comment.author?.username} {/* parent reference */}
                                </span>
                                : {reply.content}
                              </p>
                              <span className="text-xs text-gray-400">
                                {new Date(reply.createdAt).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {(reply.author?.id === currentUser?.id || reply.author?._id === currentUser?.id) && (
                            <button
                              onClick={() => handleDeleteComment(reply.id)}
                              className="text-red-500 text-xs ml-8"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* ADD NEW COMMENT */}
          <div className="flex items-center gap-2 mt-2">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment…"
              className="bg-gray-100 dark:bg-gray-700"
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
