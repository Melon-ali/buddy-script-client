import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900">Buddy Script</h1>
        <p className="text-lg text-gray-600">Social Media Platform</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/login">
            <Button size="lg" className="px-8">
              Login
            </Button>
          </Link>
          <Link href="/registration">
            <Button size="lg" variant="outline" className="px-8 bg-transparent">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
