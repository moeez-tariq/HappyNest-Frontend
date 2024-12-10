import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { MapPin, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const API_ROUTE = process.env.NEXT_PUBLIC_BACKEND_URL;

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
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { toast } = useToast();

  const checkLocationPermission = async () => {
    if ("geolocation" in navigator) {
      try {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        setHasLocationPermission(permission.state === 'granted');
        
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

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
        toast({
          title: "Playback Error",
          description: "Could not play the audio news summary.",
          variant: "destructive",
        });
      });
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const fetchNews = async (lat, lon) => {
    try {
      setLoading(true);
      const url = useLocalNews 
        ? `${API_ROUTE}/api/news/fetch?lat=${lat}&lon=${lon}`
        : `${API_ROUTE}/api/news`;
      
      const response = await fetch(url, {redirect: 'follow'});

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      setNews(data.news || []);
      if (data.audio) {
        setAudioUrl(data.audio);
      }
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
        <div className="p-4 text-center">{useLocalNews ? 'Getting local news...' : 'Loading news...'}</div>
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
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">News</h2>
          {audioUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="p-2"
              onClick={toggleAudio}
            >
              {isPlaying ? (
                <VolumeX className="h-4 w-4 text-gray-600" />
              ) : (
                <Volume2 className="h-4 w-4 text-gray-600" />
              )}
            </Button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className={`h-4 w-4 ${hasLocationPermission ? 'text-green-500' : 'text-gray-400'}`} />
          <Switch checked={useLocalNews} onCheckedChange={handleLocalNewsToggle} />
        </div>
      </div>
      <ScrollArea className="flex-grow">
        <div className="p-4 space-y-4">
          {news && news.length > 0 ? (
            news.map((item) => (
              <Card key={item.id || Math.random()} className="overflow-hidden hover:bg-gray-50 transition-colors">
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
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          onError={() => {
            setIsPlaying(false);
            toast({
              title: "Audio Error",
              description: "Could not load the audio news summary.",
              variant: "destructive",
            });
          }}
        />
      )}
    </div>
  );
}