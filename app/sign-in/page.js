"use client";

import { SignInButton } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="container mx-auto text-center py-8">
      <h1 className="text-4xl font-bold mb-6">Welcome to HappyNest</h1>
      <p className="text-lg mb-6">
        Sign in to get happy news in your area!
      </p>
      <SignInButton afterSignInUrl="/">
        <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-lg hover:bg-primary/90">
          Sign In
        </button>
      </SignInButton>
    </main>
  );
}
