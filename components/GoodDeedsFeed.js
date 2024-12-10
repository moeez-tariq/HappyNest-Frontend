'use client';
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronDown, ChevronUp, MessageSquare, Send, Edit, User } from 'lucide-react'
import { useAuth, useUser, SignInButton } from "@clerk/nextjs"

const API_ROUTE = process.env.NEXT_PUBLIC_BACKEND_URL;

const sortDeedsByDate = (deeds) => {
  return [...deeds].sort((a, b) => {
    const dateA = new Date(a.completed_at || a.created_at);
    const dateB = new Date(b.completed_at || b.created_at);
    return dateB - dateA;
  });
};

export default function GoodDeedsFeed() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [users, setUsers] = useState();
  const [goodDeeds, setGoodDeeds] = useState([]);
  const [expandedDeed, setExpandedDeed] = useState(null);
  const [replyInputs, setReplyInputs] = useState({});
  const [newDeed, setNewDeed] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchGoodDeeds = async () => {
    try {
      const response = await fetch(`${API_ROUTE}/api/good-deeds/`);
      if (!response.ok) {
        throw new Error('Failed to fetch good deeds');
      }
      const data = await response.json();
      setGoodDeeds(sortDeedsByDate(data));
    } catch (err) {
      console.error('Error fetching good deeds:', err);
      setError('Failed to load good deeds');
    } finally {
      setLoading(false);
    }
  };
  
  const fetchUsers = async (userIds) => {
    try {
      const response = await fetch(`${API_ROUTE}/api/users/`);
      const data = await response.json();
      const userMap = {};
      data.forEach(user => {
        userMap[user.id] = user;
      });
      setUsers(userMap);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchGoodDeeds();
  }, []);

  useEffect(() => {
    if (goodDeeds.length > 0) {
      const userIds = [...new Set(goodDeeds.map(deed => deed.user_id))];
      fetchUsers(userIds);
    }
  }, [goodDeeds]);

  const getUserInfo = (userId) => {
    if (users) {
        const dbUser = users[userId];
        if (dbUser) {
        return {
            name: dbUser.name,
            image: null, // Add image URL if you have it in your user data
            mood: dbUser.mood
        };
        }
    }
    return null;
  };

  const handleNewDeedSubmit = async () => {
    if (!isSignedIn || !newDeed.title || !newDeed.content) return;

    setIsSubmitting(true);
    try {
      const goodDeedData = {
        user_id: user.id, // Clerk user ID
        title: newDeed.title,
        description: newDeed.content, // Changed from content to description
        location: null, // Can be updated if you want to add location
        streak_continued: false, // Default value
        replies: [] // Empty array for new deed
      };

      const response = await fetch(`${API_ROUTE}/api/good-deeds/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goodDeedData),
      });

      if (!response.ok) {
        throw new Error('Failed to create good deed');
      }

      await fetchGoodDeeds();
      setNewDeed({ title: '', content: '' });
      
    } catch (err) {
      console.error('Error creating good deed:', err);
    } finally {
      setIsSubmitting(false);
      setDialogOpen(false);
    }
  };

  const handleSendReply = async (deedId) => {
    if (!isSignedIn || !replyInputs[deedId]) return;
  
    try {
      const replyData = {
        deed_id: deedId,
        user_id: user.id,
        content: replyInputs[deedId]
      };
  
      const response = await fetch(`${API_ROUTE}/api/good-deeds/${deedId}/replies/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(replyData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send reply');
      }
  
      // Clear the input immediately
      setReplyInputs(prev => ({ ...prev, [deedId]: '' }));
      
      // Wait a brief moment before refreshing to ensure the DB has updated
      setTimeout(fetchGoodDeeds, 500);
  
    } catch (err) {
      console.error('Error sending reply:', err);
    }
  };


  if (loading) {
    return <div className="text-center p-4">Loading good deeds...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Good Deeds</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <Button variant="ghost" size="icon">
                <Edit className="h-5 w-5" />
                <span className="sr-only">Sign in to post</span>
              </Button>
            </SignInButton>
          ) : (
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Edit className="h-5 w-5" />
                <span className="sr-only">New Good Deed</span>
              </Button>
            </DialogTrigger>
          )}
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Create a New Good Deed</DialogTitle>
            </DialogHeader>
            {isSignedIn && user && (
              <>
                <div className="flex flex-col items-center space-y-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={user.imageUrl} />
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-lg font-semibold text-gray-900">@{user.username}</p>
                </div>
                <Input
                  placeholder="Title of your good deed"
                  value={newDeed.title}
                  onChange={(e) => setNewDeed(prev => ({ ...prev, title: e.target.value }))}
                  className="mb-4"
                />
                <Textarea
                  placeholder="Describe your good deed..."
                  value={newDeed.content}
                  onChange={(e) => setNewDeed(prev => ({ ...prev, content: e.target.value }))}
                  className="mb-4"
                />
                <Button 
                  onClick={handleNewDeedSubmit} 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Posting...' : 'Post Good Deed'}
                </Button>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[calc(100vh-5.5rem)]">
        <div className="divide-y divide-gray-200">
          {goodDeeds.map((deed) => (
            <div key={deed.id} className="p-4 space-y-4">
              {/* Updated user section */}
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage 
                    src={user && deed.user_id === user.id ? user.imageUrl : undefined} 
                  />
                  <AvatarFallback>
                    <User className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                      {getUserInfo(deed.user_id)?.name || "Anonymous User"}
                      </p>
                      <p className="text-xs text-gray-500">
                      {new Date(deed.completed_at).toLocaleDateString()}
                      </p>
                  </div>
                  <h3 className="text-lg font-semibold mt-1">{deed.title}</h3>
                  {/* Changed from content to description */}
                  <p className="text-gray-700 mt-2">{deed.description}</p>
                  {/* Added location display if available */}
                  {deed.location && (
                    <p className="text-xs text-gray-500 mt-2">
                      📍 {deed.location.city}, {deed.location.state}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setExpandedDeed(expandedDeed === deed.id ? null : deed.id)}
                  className="p-0 h-auto text-gray-500 hover:text-gray-700"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {deed.replies?.length || 0} Replies
                  {expandedDeed === deed.id ? (
                    <ChevronUp className="w-4 h-4 ml-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 ml-1" />
                  )}
                </Button>
              </div>

              {expandedDeed === deed.id && (
                <div className="pl-4 border-l border-gray-200 mt-4 space-y-4">
                  {deed.replies?.map((reply) => (
                    <div key={reply.id} className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage 
                          src={user && reply.user_id === user.id ? user.imageUrl : undefined}
                        />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 truncate">
                              {getUserInfo(reply.user_id)?.name || "Anonymous User"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{reply.content}</p>
                      </div>
                    </div>
                  ))}

                  {/* Updated reply input section */}
                  <div className="flex items-center gap-2 mt-2">
                    {isSignedIn ? (
                      <>
                        <Input
                          placeholder="Write a reply..."
                          value={replyInputs[deed.id] || ''}
                          onChange={(e) => setReplyInputs(prev => ({ ...prev, [deed.id]: e.target.value }))}
                          className="flex-grow"
                        />
                        <Button 
                          size="icon"
                          onClick={() => handleSendReply(deed.id)}
                          disabled={!replyInputs[deed.id]}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <SignInButton mode="modal">
                        <Button variant="ghost" className="w-full">
                          Sign in to reply
                        </Button>
                      </SignInButton>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}