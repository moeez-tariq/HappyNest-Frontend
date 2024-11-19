import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react'

export default function GoodDeedsSidebar({ goodDeeds }) {
  const [expandedDeed, setExpandedDeed] = useState(null);

  const toggleReplies = (deedId) => {
    setExpandedDeed(expandedDeed === deedId ? null : deedId);
  };

  return (
    <div className="bg-white">
      <div className="bg-gray-50/50 p-4 border-b">
        <h2 className="text-xl font-semibold">Good Deeds</h2>
      </div>
      <div className="space-y-6 p-4">
        {goodDeeds.map((deed) => (
          <div key={deed.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">{deed.user}</span>
              <span className="text-gray-500">· {deed.timestamp}</span>
            </div>
            <p className="text-lg">{deed.content}</p>
            {deed.image && (
              <img 
                src={deed.image} 
                alt="Good deed" 
                className="w-full rounded-2xl"
              />
            )}
            <div className="flex items-center gap-2 text-gray-500">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => toggleReplies(deed.id)}
                className="p-0 h-auto"
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                {deed.replies.length} Replies
                {expandedDeed === deed.id ? (
                  <ChevronUp className="w-4 h-4 ml-1" />
                ) : (
                  <ChevronDown className="w-4 h-4 ml-1" />
                )}
              </Button>
            </div>
            {expandedDeed === deed.id && (
              <div className="pl-4 border-l border-gray-200 mt-2 space-y-2">
                {deed.replies.map((reply) => (
                  <div key={reply.id} className="text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{reply.user}</span>
                      <span className="text-gray-500">· {reply.timestamp}</span>
                    </div>
                    <p>{reply.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 sticky bottom-0 bg-white border-t">
        <Button 
          className="w-full bg-amber-400 hover:bg-amber-500 text-black font-semibold h-12" 
          size="lg"
        >
          Add a Good Deed
        </Button>
      </div>
    </div>
  )
}