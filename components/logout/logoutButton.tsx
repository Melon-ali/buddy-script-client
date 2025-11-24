"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="
        flex 
        justify-center 
        items-center
        mx-auto
        px-4
        py-2 
        text-red-500 
        font-semibold 
        rounded-lg 
        transition-all 
        duration-300 
        ease-in-out
        hover:bg-red-50 
        hover:shadow-md 
        hover:scale-105 
        hover:text-red-600
        active:scale-95
        border 
        border-transparent 
        hover:border-red-200
        cursor-pointer
        group
        w-48
        min-w-fit
      "
    >
      <LogOut className="mr-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      <span className="whitespace-nowrap">Log Out</span>
    </button>
  );
};

export default LogoutButton;
