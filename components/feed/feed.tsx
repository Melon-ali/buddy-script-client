import { Stories } from "@/components/feed/stories"
import { CreatePost } from "@/components/feed/create-post"
import { PostCard } from "@/components/feed/post-card"

const posts = [
  {
    id: 1,
    user: {
      name: "Karim Saif",
      image: "/placeholder.svg?key=post-u1",
    },
    time: "5 minute ago",
    content: "-Healthy Tracking App",
    image: "/placeholder.svg?key=post-img1",
    stats: {
      likes: 9,
      comments: 12,
      shares: 122,
    },
  },
  {
    id: 2,
    user: {
      name: "Design Team",
      image: "/placeholder.svg?key=post-u2",
    },
    time: "2 hours ago",
    content:
      "Check out our new design system update! We've added dark mode support and improved accessibility across all components.",
    stats: {
      likes: 45,
      comments: 8,
      shares: 15,
    },
  },
]

export function Feed() {
  return (
    <div className="flex flex-col gap-6 pb-20 lg:pb-0">
      <Stories />
      <CreatePost />
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
