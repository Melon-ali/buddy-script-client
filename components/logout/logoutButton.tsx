"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLogoutUserMutation } from "@/redux/features/auth/userApi";
import { toast } from "sonner";

const LogoutButton = () => {
  const router = useRouter();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      const res: any = await logoutUser(null);

      if (res?.data) {
        // Successful logout
        router.push("/login");
        toast.success("Logout Successful!")
      } else {
        // console.error("Logout failed");
        toast.error("Logout failed!")
      }
    } catch (err) {
      // console.error("Logout Error: ", err);
      toast.error("An error occurred during logout.")
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
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
      <LogOut
        className="
          mr-3 
          h-4 
          w-4 
          transition-transform 
          duration-300 
          group-hover:translate-x-1
        "
      />
      {isLoading ? "Logging out..." : "Log Out"}
    </button>
  );
};

export default LogoutButton;
