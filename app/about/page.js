"use client"; // Make sure this is marked as a client component

import { useUser } from "@clerk/nextjs"; // Import useUser hook from Clerk
import { useRouter } from "next/navigation"; // Import useRouter hook for navigation

export default function About() {
  const { isSignedIn, isLoaded } = useUser(); // Get the user's authentication status and loading state
  const router = useRouter();

  // If Clerk session is still loading, don't redirect yet
  if (!isLoaded) {
    return null; // Return null while Clerk is loading
  }

  // Redirect to sign-in page if the user is not logged in
  if (!isSignedIn) {
    router.push("/sign-in");
    return null; // Return null while the redirect is happening
  }

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">About HappyNest</h1>
      
      <p className="text-lg mb-4">
        Welcome to <span className="font-semibold">HappyNest</span>, your source for uplifting and positive news from around the world!
        Our mission is simple: to bring a little bit of happiness into your day by curating joyful and inspiring stories.
      </p>
      <p className="text-lg mb-4">
        In a world filled with constant news cycles, we believe that it’s important to take a moment to appreciate the good things happening around us. 
        Whether it's a heartwarming local story or an inspiring global event, HappyNest is here to brighten your day.
      </p>
      <p className="text-lg">
        Click "Get Local Happy News" on our homepage to discover feel-good stories happening near you!
      </p>
    </main>
  );
}
