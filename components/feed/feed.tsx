"use client";

import { Stories } from "@/components/feed/stories";
import { CreatePost } from "@/components/feed/create-post";
import { useAllPostsQuery } from "@/redux/features/posts/postsApi";
import { PostCard } from "./post-card";

export function Feed() {
  const { data, isLoading } = useAllPostsQuery(undefined);

  if (isLoading) return <div>Loading posts...</div>;

  const posts = data?.data || [];

  console.log(posts)

  return (
    <div className="flex flex-col gap-6 pb-20 lg:pb-0">
      <Stories />
      <CreatePost />

      <div className="flex flex-col gap-4">
        {posts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
