"use client";

import dynamic from 'next/dynamic'

const SignIn = dynamic(() => import("@components/signin"));

export default function Page() {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignIn />
    </div>
  );
}
