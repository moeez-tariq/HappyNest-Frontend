"use client";

import { useState } from "react";
import LocationRequest from "@/components/LocationRequest";
import NewsList from "@/components/NewsList";

export default function Home() {
  const [location, setLocation] = useState(null);

  const handleLocationSuccess = async (lat, lon) => {
    // fetch first gets new news and adds to database based on location
    const res = await fetch(`http://localhost:8000/api/news/fetch`);
    const {message} = await res.json();
    console.log(message);
    setLocation({ lat, lon });
  };

  return (
    <>
      <main className="container mx-auto text-center py-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to HappyNest</h1>

        {!location ? (
          <>
            <p className="mb-4 text-lg">Click below to find happy news near you! Please wait a few seconds after answering the prompt :)</p>
            <LocationRequest onLocationSuccess={handleLocationSuccess} />
          </>
        ) : (
          <>
            <NewsList lat={location.lat} lon={location.lon} />
          </>
        )}
      </main>
    </>
  );
}