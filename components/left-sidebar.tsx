import Link from "next/link"
import Image from "next/image"
import { BookOpen, LineChart, Users, Bookmark, Users2, Gamepad2, Settings, Save, User } from "lucide-react"
import { Button } from "@/components/ui/button"

const exploreItems = [
  { icon: BookOpen, label: "Learning", href: "/learning", badge: "New" },
  { icon: LineChart, label: "Insights", href: "/insights" },
  { icon: Users, label: "Find friends", href: "/find-friends" },
  { icon: Bookmark, label: "Bookmarks", href: "/bookmarks" },
  { icon: Users2, label: "Group", href: "/groups" },
  { icon: Gamepad2, label: "Gaming", href: "/gaming", badge: "New" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: Save, label: "Save post", href: "/saved" },
]

const suggestedPeople = [
  {
    name: "Steve Jobs",
    role: "CEO of Apple",
    image: "/chat1_img.png",
  },
  {
    name: "Ryan Roslansky",
    role: "CEO of Linkedin",
    image: "/chat_profile.png",
  },
  {
    name: "Dylan Field",
    role: "CEO of Figma",
    image: "/chat_profile1.png",
  },
]

const events = [
  {
    id: 1,
    title: "No more terrorism no more cry",
    date: { day: "10", month: "Jul" },
    attendees: 17,
    image: "/recommend1.png",
  },
  {
    id: 2,
    title: "No more terrorism no more cry",
    date: { day: "10", month: "Jul" },
    attendees: 17,
    image: "/recommend2.png",
  },
]

export function LeftSidebar() {
  return (
    <div className="h-full overflow-y-auto no-scrollbar p-4 pb-20 space-y-6">
      {/* Explore Section */}
      <div className="bg-card rounded-xl shadow-sm p-4">
        <div className="space-y-1">
          {exploreItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group hover:bg-primary/10 hover:text-primary text-muted-foreground"
            >
              <item.icon className="h-5 w-5 group-hover:text-primary transition-colors" />
              <span className="flex-1 font-medium">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-primary text-primary-foreground rounded-full uppercase">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>

      {/* Suggested People */}
      <div className="bg-card rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Suggested People</h3>
          <Link href="/suggestions" className="text-xs text-primary hover:underline">
            See All
          </Link>
        </div>
        <div className="space-y-4">
          {suggestedPeople.map((person) => (
            <div key={person.name} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted overflow-hidden shrink-0">
                <Image
                  src={person.image || "/placeholder.svg"}
                  alt={person.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{person.name}</p>
                <p className="text-xs text-muted-foreground truncate">{person.role}</p>
              </div>
              <Button
                size="icon"
                variant="outline"
                className="h-8 w-8 rounded-full border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <User className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Events */}
      <div className="bg-card rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Explore Events</h3>
          <Link href="/events" className="text-xs text-primary hover:underline">
            See All
          </Link>
        </div>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-lg bg-secondary/30 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="relative h-28">
                <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                <div className="absolute top-2 left-2 bg-card/90 backdrop-blur rounded px-2 py-1 text-center min-w-[45px]">
                  <p className="text-xs font-bold text-primary uppercase">{event.date.month}</p>
                  <p className="text-xl font-bold leading-none">{event.date.day}</p>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-sm line-clamp-2 mb-2">{event.title}</h4>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{event.attendees} Going</span>
                  <Link href="#" className="text-primary font-medium hover:underline">
                    Join
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
