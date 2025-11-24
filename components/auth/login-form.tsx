"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login:", { email, password, rememberMe })
  }

  const handleGoogleLogin = () => {
    console.log("Google login")
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 
      h-[650px] flex flex-col justify-between">

      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="mb-7 flex justify-center">
          {/* Logo */}
            <Link href="/" className="shrink-0">
              <Image src="/logo.png" alt="BuddyScript" width={160} height={40} className="h-8 w-auto" priority />
            </Link>
        </div>

        {/* Header */}
        <div className="mb-10 text-center">
          <p className="text-sm text-muted-foreground mb-2">Welcome back</p>
          <h1 className="text-3xl text-gray-900">Login to your account</h1>
        </div>

        {/* Google Button */}
        <Button
          type="button"
          variant="outline"
          className="w-full mb-8 h-12 text-base bg-transparent"
          onClick={handleGoogleLogin}
        >
          <Image src="/images/google.svg" alt="Google" width={20} height={20} className="inline-block mr-2" />
          Or sign-in with Google
        </Button>

        {/* Divider */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-muted-foreground">Or</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-primary">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-medium">
            Login now
          </Button>
        </form>
      </div>

      {/* Bottom - Sign Up */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/registration" className="text-primary font-medium">
            Create New Account
          </Link>
        </p>
      </div>

    </div>
  )
}
