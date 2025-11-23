import Image from "next/image"
import { Plus } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"

const stories = [
  {
    id: "create",
    type: "create",
    user: "Your Story",
    image: "/placeholder.svg?key=story-me",
  },
  {
    id: 1,
    user: "Ryan Roslansky",
    image: "/placeholder.svg?key=story1",
    avatar: "/placeholder.svg?key=av1",
  },
  {
    id: 2,
    user: "Jone Doe",
    image: "/placeholder.svg?key=story2",
    avatar: "/placeholder.svg?key=av2",
  },
  {
    id: 3,
    user: "Emily Smith",
    image: "/placeholder.svg?key=story3",
    avatar: "/placeholder.svg?key=av3",
  },
]

export function Stories() {
  return (
    <div className="relative">
      <ScrollArea>
        <div className="flex gap-4 pb-4">
          {stories.map((story) => (
            <Card
              key={story.id}
              className="shrink-0 w-[140px] h-[200px] relative overflow-hidden cursor-pointer group hover:opacity-90 transition-opacity border-0"
            >
              <Image
                src={story.image || "/placeholder.svg"}
                alt={story.user}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-500"
              />
              {story.type === "create" ? (
                <>
                  <div className="absolute inset-0 bg-black/20" />

                  <div className="absolute bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm py-3 px-2 flex flex-col items-center">
                    <div className="absolute -top-4 bg-primary text-primary-foreground rounded-full p-1 border-4 border-background">
                      <Plus className="h-4 w-4" />
                    </div>
                    <span className="text-foreground text-xs font-semibold mt-2">Your Story</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black/60" />
                  <div className="absolute top-2 left-2 h-8 w-8 rounded-full border-2 border-primary overflow-hidden">
                    <Image src={story.avatar || "/placeholder.svg"} alt={story.user} fill className="object-cover" />
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <span className="text-white text-xs font-medium truncate block">{story.user}</span>
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}
