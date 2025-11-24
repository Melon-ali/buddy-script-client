"use client";
import ForgotPassword from "@/app/(auth)/forgotPassword/forgotPassword";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

const ForgetPage = () => {
  const [,setStep] = useState(1);
  const [, setEmail] = useState("");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-5xl font-medium text-gray-900">
            Forgot Password
          </h2>
        </div>

        <ForgotPassword setStep={setStep} setEmail={setEmail} />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgetPage;
