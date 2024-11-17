"use client";

import { useState } from "react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import LocationRequest from "@/components/LocationRequest";
import NewsList from "@/components/NewsList";

export default function Home() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLocationSuccess = async (lat, lon) => {
    console.log("Fetching any new news in the area");
    setLoading(true);
    // Fetch the latest news and add to the database
    await fetch(`http://localhost:8000/api/news/fetch`);
    setLocation({ lat, lon });
    setLoading(false);
  };

  return (
    <main className="container mx-auto text-center py-8">
      {/* Show only if signed in */}
      <SignedIn>
        <h1 className="text-4xl font-bold mb-6">Welcome to HappyNest</h1>
        {!location ? (
          <>
            <p className="mb-4 text-lg">
              Click below to find happy news near you! Please wait a few
              seconds after answering the prompt :)
            </p>
            <LocationRequest onLocationSuccess={handleLocationSuccess} />
            {loading && <p>Fetching news in the local area!</p>}
          </>
        ) : (
          <NewsList lat={location.lat} lon={location.lon} />
        )}
      </SignedIn>

      {/* Redirect to sign-in page if not signed in */}
      <SignedOut>
        <p className="text-lg">
          Please <a href="/sign-in" className="text-primary underline">sign in</a> to get started.
        </p>
      </SignedOut>
    </main>
  );
}
