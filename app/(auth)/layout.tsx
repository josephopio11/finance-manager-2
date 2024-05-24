import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16 transition-all duration-300">
          <h1 className="font-bold text-3xl text-gray-800">Welcome!</h1>
          <p className="text-base text-gray-600">
            Log in or create an account to access the system.
          </p>
        </div>
        <div className="flex items-center justify-center mt-8 transition duration-300">
          <ClerkLoaded>{children}</ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="h-24 w24 animate-spin" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-blue-500 hidden lg:flex items-center justify-center">
        <Image src="/logo.svg" alt="Logo" width={200} height={200} />
      </div>
    </div>
  );
};

export default AuthLayout;
