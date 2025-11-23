"use client";

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import ShowToastify from "@/utils/ShowToastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useLoginUserMutation } from "@/redux/features/auth/userApi";
import { AppDispatch } from "@/redux/store";
import { logOut, setUser } from "@/redux/ReduxFunction";

type DecodedToken = {
  name: string;
  role: string;
  iat?: number;
  exp?: number;
};

const LoginForm = () => {
  const [logIn, setLogIn] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [loginFun] = useLoginUserMutation();
  const dispatch = useDispatch<AppDispatch>();
  const route = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLogIn("Loading...");

    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
      ShowToastify({ error: "Email and password are required." });
      setLogIn("Login");
      return;
    }

    const { data, error } = await loginFun({ email, password });

    if (error || !data?.data?.token) {
      ShowToastify({ error: "Check your email or password." });
      setLogIn("Login");
      return;
    }

    let userInfo: DecodedToken;

    try {
      userInfo = jwtDecode<DecodedToken>(data.data.token);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      ShowToastify({ error: "Invalid token received." });
      setLogIn("Login");
      return;
    }

    if (userInfo?.role !== "SUPER_ADMIN") {
      ShowToastify({ error: "You are not authorized." });
      dispatch(logOut());
      setLogIn("Login");
      return;
    }

    dispatch(setUser({ name: userInfo.name, role: userInfo.role }));
    Cookies.set("token", data.data.token);
    route.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleLogin}
      className="mt-8 space-y-6"
      method="POST"
    >
      <div className="space-y-4 rounded-md">
        <div>
          <label htmlFor="email" className="text-sm text-gray-500">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="info@email.com"
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm text-gray-500">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-green-500 focus:outline-none focus:ring-green-500"
            />
            <div className="absolute right-3 top-3">
              <button
                type="button"
                className="text-xl"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <IoEyeSharp />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Link href="/forgetPassword" className="text-xs text-gray-500 hover:text-green-600">
          Forgot password?
        </Link>
      </div>

      <div>
        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          {logIn}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
