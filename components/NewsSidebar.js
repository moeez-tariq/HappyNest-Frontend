'use client';
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NewsSidebar({ initialLat = 40.7128, initialLon = -74.0060 }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async (lat, lon) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8000/api/news/fetch?lat=${lat}&lon=${lon}`);

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      // Log the raw response for debugging
      const rawData = await response.json();
      console.log('Raw API response:', rawData);

      // If the response is wrapped in a data property, extract it
      const newsData = Array.isArray(rawData) ? rawData : rawData.data || [];
      console.log('Processed news data:', newsData);
      
      setNews(newsData);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get user's location or use initial coordinates
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchNews(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.warn("Error getting location:", error);
          fetchNews(initialLat, initialLon);
        }
      );
    } else {
      fetchNews(initialLat, initialLon);
    }
  }, [initialLat, initialLon]);

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-lg overflow-hidden w-full flex flex-col">
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold">News</h2>
        </div>
        <div className="p-4 text-center">Loading news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-sm rounded-lg overflow-hidden w-full flex flex-col">
        <div className="border-b p-4">
          <h2 className="text-xl font-semibold">News</h2>
        </div>
        <div className="p-4 text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden w-full flex flex-col">
      <div className="border-b p-4">
        <h2 className="text-xl font-semibold">News</h2>
      </div>
      <ScrollArea className="flex-grow" style={{ height: 'calc(3 * 9rem)' }}>
        <div className="p-4 space-y-4">
          {news && news.length > 0 ? (
            news.map((item) => (
              <Card key={item.id || Math.random()} className="overflow-hidden">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm font-medium line-clamp-2">
                    {item.title}
                  </CardTitle>
                  <p className="text-xs text-gray-500">
                    {item.published_at ? new Date(item.published_at).toLocaleDateString() : 'No date'}
                  </p>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <p className="text-xs text-gray-700 line-clamp-3">
                    {item.content}
                  </p>
                  {item.location?.city && (
                    <div className="mt-2 text-xs text-gray-500">
                      📍 {item.location.city}
                    </div>
                  )}
                  {item.source && (
                    <div className="mt-1 text-xs text-gray-500">
                      Source: {item.source}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center text-gray-500">No news available</div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}