"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";

const WelcomeMessage = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-4 mb-4">
      <h2 className="text-2xl lg:text-4xl text-white font-medium">
        Welcome back{isLoaded && ","} {user?.firstName} 🫡
      </h2>
      <p className="text-sm lg:text-base text-primary-foreground/60">
        This is your Financial Overview Report.
      </p>
    </div>
  );
};

export default WelcomeMessage;
