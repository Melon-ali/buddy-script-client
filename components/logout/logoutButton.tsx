"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useLogoutUserMutation } from "@/redux/features/auth/userApi";
import { toast } from "sonner";
import Cookies from "js-cookie"; // 🔥 import added

const LogoutButton = () => {
  const router = useRouter();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();

  const handleLogout = async () => {
    try {
      const res: any = await logoutUser(null).unwrap();

      if (res) {
        // 🔥 Remove client-side stored user/session data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");

        // 🔥 Remove cookie token
        Cookies.remove("token");

        toast.success("Logout Successful!");

        router.push("/login");
      } else {
        toast.error("Logout failed!");
      }
    } catch (err) {
      toast.error("An error occurred during logout.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className="
        flex items-center mx-auto px-4 py-2 text-red-500 font-semibold 
        rounded-lg transition-all duration-300 hover:bg-red-50 
        hover:shadow-md hover:scale-105 hover:text-red-600 active:scale-95
        border hover:border-red-200 group w-48
      "
    >
      <LogOut className="mr-3 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      {isLoading ? "Logging out..." : "Log Out"}
    </button>
  );
};

export default LogoutButton;
