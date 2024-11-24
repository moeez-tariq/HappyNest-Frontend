'use client';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Trophy, Flame } from 'lucide-react';
import { useSyncUser } from '@/hooks/useSyncUser';


export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Use the sync hook to ensure user exists in database
  useSyncUser();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/leaderboard/');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await response.json();
        setLeaders(data);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Trophy className="mr-2 h-5 w-5" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Trophy className="mr-2 h-5 w-5" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center text-red-500">{error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Trophy className="mr-2 h-5 w-5" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaders.map((leader, index) => (
            <div
              key={leader.user_id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 text-center font-medium">
                  {index + 1}
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="text-sm font-medium flex items-center gap-2">
                    {leader.name}
                    {leader.streak > 0 && (
                      <span className="flex items-center text-orange-500" title={`${leader.streak} day streak`}>
                        <Flame className="h-4 w-4" />
                        {leader.streak}
                      </span>
                    )}
                  </p>
                  {leader.mood && (
                    <p className="text-xs text-gray-500">
                      Feeling: {leader.mood}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-sm font-medium">
                {leader.deed_count} {leader.deed_count === 1 ? 'deed' : 'deeds'}
              </div>
            </div>
          ))}
          {leaders.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              No leaderboard data available
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}