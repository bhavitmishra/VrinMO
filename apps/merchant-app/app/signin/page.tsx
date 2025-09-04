"use client"; // Required for Next.js 13+ App Router

import { Card } from "@repo/ui/card";
import { signIn } from "next-auth/react";
import React from "react";

// SVG Icon for Google

const SignInPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen  text-black">
      <Card
        Heading="VrinMO Merchants"
        Sign="Log In"
        i1={false}
        b1="google"
        b2="github"
      />
    </div>
  );
};

export default SignInPage;
