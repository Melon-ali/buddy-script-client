"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useUserRegisterMutation } from "@/redux/features/auth/userApi";

export function RegistrationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [userRegister, { isLoading }] = useUserRegisterMutation();

  // ============================================================
  //  GOOGLE CALLBACK HANDLER (token + user info save)
  // ============================================================
  useEffect(() => {
    const token = searchParams.get("accessToken");
    const email = searchParams.get("email");
    const username = searchParams.get("username");
    const id = searchParams.get("id");

    if (token) {
      // Save token in cookie & storage
      document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
      localStorage.setItem("token", token);

      if (email) localStorage.setItem("userEmail", email);
      if (username) localStorage.setItem("username", username);
      if (id) localStorage.setItem("userId", id);

      toast.success("Google Registration Successful!");

      router.replace("/feed");
    }
  }, [searchParams, router]);

  // ============================================================
  // NORMAL REGISTRATION (email + password)
  // ============================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!agreeToTerms) {
      toast.error("Please agree to the terms & conditions");
      return;
    }

    try {
      const payload = { email, password };
      const res: any = await userRegister(payload).unwrap();

      if (res?.success) {
        toast.success("Registration successful!");
        router.push("/login");
      } else {
        toast.error(res?.message || "Registration failed!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Registration failed!");
    }
  };

  // ============================================================
  //  GOOGLE REGISTRATION
  // ============================================================
  const handleGoogleRegistration = () => {
    window.location.href =
      "https://buddy-script-backend-ebon.vercel.app/api/v1/auth/google";
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
      {/* Logo */}
      <div className="mb-7 flex justify-center">
        <Link href="/" className="shrink-0">
          <Image
            src="/images/logo.png"
            alt="BuddyScript"
            width={160}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Header */}
      <div className="mb-12 text-center">
        <p className="text-sm text-muted-foreground mb-2">Get Started Now</p>
        <h1 className="text-3xl text-gray-900">Registration</h1>
      </div>

      {/* Google Registration */}
      <Button
        type="button"
        variant="outline"
        className="w-full mb-10 h-12 text-base bg-transparent"
        onClick={handleGoogleRegistration}
      >
        <Image
          src="/images/google.svg"
          alt="Google"
          width={20}
          height={20}
          className="inline-block mr-2"
        />
        Register with Google
      </Button>

      {/* Divider */}
      <div className="relative mb-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-muted-foreground">Or</span>
        </div>
      </div>

      {/* Registration Form */}
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

        <div className="space-y-2">
          <Label>Repeat Password</Label>
          <Input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="h-11"
            required
          />
        </div>

        {/* Terms */}
        <div className="flex items-start space-x-2 pt-2">
          <Checkbox
            id="terms"
            checked={agreeToTerms}
            onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
            I agree to the terms & conditions
          </label>
        </div>

        {/* Submit */}
        <div className="pt-6">
          <Button
            type="submit"
            className="w-full h-12 text-base font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register now"}
          </Button>
        </div>
      </form>

      {/* Login Link */}
      <div className="mt-10 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-primary font-medium">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
