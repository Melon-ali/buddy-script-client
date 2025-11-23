import Link from "next/link"
import Image from "next/image"
import { Search, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"

const friendRequests = [
  {
    id: 1,
    name: "Anthony Daugloi",
    mutualFriends: 12,
    image: "/placeholder.svg?key=req1",
  },
  {
    id: 2,
    name: "Hingu Zku",
    mutualFriends: 12,
    image: "/placeholder.svg?key=req2",
  },
]

const contacts = [
  { name: "Adom Smith", status: "online", image: "/placeholder.svg?key=c1" },
  { name: "Villiam Rober", status: "offline", time: "10 min", image: "/placeholder.svg?key=c2" },
  { name: "Jone Doe", status: "online", image: "/placeholder.svg?key=c3" },
  { name: "Hingu Zku", status: "offline", time: "30 min", image: "/placeholder.svg?key=c4" },
  { name: "David Milar", status: "offline", time: "1 hour", image: "/placeholder.svg?key=c5" },
  { name: "Amik Huj", status: "online", image: "/placeholder.svg?key=c6" },
  { name: "Zim Szu", status: "offline", time: "2 days", image: "/placeholder.svg?key=c7" },
  { name: "Jone Doe", status: "online", image: "/placeholder.svg?key=c8" },
  { name: "Villiam Rober", status: "offline", time: "10 min", image: "/placeholder.svg?key=c9" },
  { name: "Adom Smith", status: "online", image: "/placeholder.svg?key=c10" },
]

export function RightSidebar() {
  return (
    <div className="h-full overflow-y-auto no-scrollbar p-4 pb-20 space-y-6">
      {/* Friend Requests */}
      <div className="bg-card rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Friend Request</h3>
          <Link href="/friend-requests" className="text-xs text-primary hover:underline">
            See All
          </Link>
        </div>
        <div className="space-y-4">
          {friendRequests.map((request) => (
            <div key={request.id} className="bg-secondary/30 p-3 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-full bg-muted overflow-hidden flex-shrink-0">
                  <Image
                    src={request.image || "/placeholder.svg"}
                    alt={request.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{request.name}</p>
                  <p className="text-xs text-muted-foreground">{request.mutualFriends} Mutual Friends</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 h-8 text-xs bg-primary hover:bg-primary/90">Confirm</Button>
                <Button
                  variant="outline"
                  className="flex-1 h-8 text-xs border-border hover:bg-destructive/10 hover:text-destructive hover:border-destructive bg-transparent"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className="bg-card rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Contacts</h3>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          {contacts.map((contact, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 cursor-pointer transition-colors group"
            >
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                  <Image
                    src={contact.image || "/placeholder.svg"}
                    alt={contact.name}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                {contact.status === "online" && (
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 border-2 border-card rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                  {contact.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {contact.status === "online" ? "Online" : contact.time ? `Active ${contact.time} ago` : "Offline"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
