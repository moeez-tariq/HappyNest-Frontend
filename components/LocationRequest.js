"use client";
import { useState } from "react";

const LocationRequest = ({ onLocationSuccess }) => {
  const [error, setError] = useState(null);

  const handleLocationRequest = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocationSuccess(latitude, longitude);
        },
        (error) => {
          setError("Unable to retrieve your location.");
          console.error(error);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="location-request text-center">
      <button
        onClick={handleLocationRequest}
        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300"
      >
        Get Local Happy News
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default LocationRequest;