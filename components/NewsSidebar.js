'use client';
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Globe, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const truncateWords = (text, limit = 20) => {
    const words = text.split(' ');
    if (words.length <= limit) return text;
    return words.slice(0, limit).join(' ') + '...';
};

export default function NewsSidebar({ initialLat = 40.7128, initialLon = -74.0060 }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useLocalNews, setUseLocalNews] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const { toast } = useToast();

  const checkLocationPermission = async () => {
    if ("geolocation" in navigator) {
      try {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        setHasLocationPermission(permission.state === 'granted');
        
        // Listen for permission changes
        permission.addEventListener('change', (e) => {
          setHasLocationPermission(e.target.state === 'granted');
          if (e.target.state !== 'granted' && useLocalNews) {
            setUseLocalNews(false);
            toast({
              title: "Location Access Required",
              description: "Local news requires location access. Please enable location services to use this feature.",
              variant: "destructive",
            });
          }
        });
      } catch (error) {
        console.warn("Error checking location permission:", error);
        setHasLocationPermission(false);
      }
    } else {
      setHasLocationPermission(false);
    }
  };

  const handleLocalNewsToggle = async (checked) => {
    if (checked && !hasLocationPermission) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setHasLocationPermission(true);
          setUseLocalNews(true);
        },
        (error) => {
          console.warn("Error getting location:", error);
          toast({
            title: "Location Access Required",
            description: "Please enable location services to see local news.",
            variant: "destructive",
          });
          setUseLocalNews(false);
        }
      );
    } else {
      setUseLocalNews(checked);
    }
  };

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const fetchNews = async (lat, lon) => {
    try {
      setLoading(true);
      const url = useLocalNews 
        ? `http://localhost:8000/api/news/fetch?lat=${lat}&lon=${lon}`
        : 'http://localhost:8000/api/news';
      
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const rawData = await response.json();
      const newsData = Array.isArray(rawData) ? rawData : rawData.data || [];
      setNews(newsData);
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (useLocalNews) {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchNews(position.coords.latitude, position.coords.longitude),
        (error) => {
          console.warn("Error getting location:", error);
          // No need to fallback to initialLat/initialLon since we prevent 
          // useLocalNews from being true without permission
          setUseLocalNews(false);
          toast({
            title: "Location Error",
            description: "Could not get your location. Showing general news instead.",
            variant: "destructive",
          });
          fetchNews(initialLat, initialLon);
        }
      );
    } else {
      fetchNews(initialLat, initialLon);
    }
  }, [initialLat, initialLon, useLocalNews]);

  if (loading) {
    return (
      <div className="bg-white shadow-sm rounded-lg overflow-hidden w-full flex flex-col">
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">News</h2>
          <div className="flex items-center gap-2">
            <MapPin className={`h-4 w-4 ${hasLocationPermission ? 'text-green-500' : 'text-gray-400'}`} />
            <Switch checked={useLocalNews} onCheckedChange={handleLocalNewsToggle} />
          </div>
        </div>
        <div className="p-4 text-center">Loading news...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-sm rounded-lg overflow-hidden w-full flex flex-col">
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">News</h2>
          <div className="flex items-center gap-2">
            <MapPin className={`h-4 w-4 ${hasLocationPermission ? 'text-green-500' : 'text-gray-400'}`} />
            <Switch checked={useLocalNews} onCheckedChange={handleLocalNewsToggle} />
          </div>
        </div>
        <div className="p-4 text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden w-full flex flex-col h-[30.5rem]">
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">News</h2>
        <div className="flex items-center gap-2">
          <MapPin className={`h-4 w-4 ${hasLocationPermission ? 'text-green-500' : 'text-gray-400'}`} />
          <Switch checked={useLocalNews} onCheckedChange={handleLocalNewsToggle} />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-4">
          {news && news.length > 0 ? (
            news.map((item) => (
                <Card key={item.id || Math.random()} className="overflow-hidden hover:bg-gray-50 transition-colors max-w-[22rem]">
                <div className="p-3">
                  <a 
                    href={item.source} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm font-medium mb-1 line-clamp-2 break-words hover:text-blue-600 transition-colors"
                  >
                    {item.title}
                  </a>
                  <p className="text-xs text-gray-700 mb-2 break-words whitespace-normal mt-1">
                    {truncateWords(item.content)}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500 flex-wrap gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.location?.city && <span>📍 {item.location.city}</span>}
                    </div>
                    <span>{item.published_at ? new Date(item.published_at).toLocaleDateString() : 'No date'}</span>
                  </div>
                </div>
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