"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDark = resolvedTheme === "dark"

  return (
    <div
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 cursor-pointer"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <div className="bg-primary w-9 h-20 rounded-l-full flex flex-col items-center justify-between py-2 px-1 shadow-lg transition-all relative">
        {/* Icons */}
        <Sun
          className={`h-5 w-5 z-10 transition-colors duration-300 ${!isDark ? "text-primary" : "text-primary-foreground"}`}
        />
        <Moon
          className={`h-5 w-5 z-10 transition-colors duration-300 ${isDark ? "text-primary" : "text-primary-foreground"}`}
        />

        {/* Sliding Handle */}
        <div
          className={`absolute left-1 w-7 h-7 bg-white rounded-full transition-all duration-300 ease-in-out z-0 ${
            isDark ? "top-[calc(100%-2.25rem)]" : "top-1"
          }`}
        />
      </div>
    </div>
  )
}
