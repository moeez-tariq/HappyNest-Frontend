import { useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner"; // Reuse spinner

export default function NewsList({ lat, lon }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = async () => {
      try {
      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lat, lon }), // Send lat/lon in body
      });

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      console.log(data);
        setNews(data);
      } catch (err) {
        setError('Error fetching happy news.');
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    if (lat && lon) {
      fetchNews();
    }
  }, [lat, lon]);

  if (loading) return <LoadingSpinner />; // Show spinner while loading
  if (error) return <p className="text-red-500">{error}</p>; // Show error message

  return (
    <div className="news-list mt-8">
      <h2 className="text-xl font-semibold mb-4">Happy News Near You</h2>
      
      {news.length === 0 ? (
        <p>No happy news found for your location.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <div key={index} className="border rounded-lg shadow-lg p-4">
              <h3 className="font-semibold text-lg mb-2">
                <a href={item.source} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                  {item.title}
                </a>
              </h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}