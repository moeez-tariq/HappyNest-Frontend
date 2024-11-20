import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ChevronDown, ChevronUp, MessageSquare, Send, Edit } from 'lucide-react'


export default function GoodDeedsFeed({ goodDeeds = [], currentUser = { handle: '@user', avatar: '/placeholder.svg' } }) {
  const [expandedDeed, setExpandedDeed] = useState(null)
  const [replyInputs, setReplyInputs] = useState({})
  const [newDeed, setNewDeed] = useState({ title: '', content: '' })

  const toggleReplies = (deedId) => {
    setExpandedDeed(expandedDeed === deedId ? null : deedId)
  }

  const handleReplyChange = (deedId, value) => {
    setReplyInputs(prev => ({ ...prev, [deedId]: value }))
  }

  const handleSendReply = (deedId) => {
    console.log(`Sending reply for deed ${deedId}: ${replyInputs[deedId]}`)
    setReplyInputs(prev => ({ ...prev, [deedId]: '' }))
  }

  const handleNewDeedChange = (field, value) => {
    setNewDeed(prev => ({ ...prev, [field]: value }))
  }

  const handleNewDeedSubmit = () => {
    console.log('Submitting new deed:', newDeed)
    setNewDeed({ title: '', content: '' })
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="border-b p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Good Deeds</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Edit className="h-5 w-5" />
              <span className="sr-only">New Good Deed</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Create a New Good Deed</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-4 mb-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={currentUser.avatar} alt={currentUser.handle} />
                <AvatarFallback>{currentUser.handle[1]}</AvatarFallback>
              </Avatar>
              <p className="text-lg font-semibold text-gray-900">{currentUser.handle}</p>
            </div>
            <Input
              placeholder="Title of your good deed"
              value={newDeed.title}
              onChange={(e) => handleNewDeedChange('title', e.target.value)}
              className="mb-4"
            />
            <Textarea
              placeholder="Describe your good deed..."
              value={newDeed.content}
              onChange={(e) => handleNewDeedChange('content', e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleNewDeedSubmit} className="w-full">
              Post Good Deed
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <ScrollArea className="h-[calc(100vh-5.5rem)]">
        <div className="divide-y divide-gray-200">
          {goodDeeds.map((deed) => (
            <div key={deed.id} className="p-4 space-y-4">
              <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={deed.userAvatar} alt={deed.user} />
                  <AvatarFallback>{deed.user.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">{deed.user}</p>
                    <p className="text-xs text-gray-500">{deed.timestamp}</p>
                  </div>
                  <h3 className="text-lg font-semibold mt-1">{deed.title}</h3>
                  <p className="text-gray-700 mt-2">{deed.content}</p>
                  {deed.image && (
                    <img 
                      src={deed.image} 
                      alt="Good deed" 
                      className="w-full h-48 object-cover rounded-lg mt-3" 
                    />
                  )}
                </div>
              </div>
              <div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleReplies(deed.id)}
                  className="p-0 h-auto text-gray-500 hover:text-gray-700"
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
                <div className="pl-4 border-l border-gray-200 mt-4 space-y-4">
                  {deed.replies.map((reply) => (
                    <div key={reply.id} className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={reply.userAvatar} alt={reply.user} />
                        <AvatarFallback>{reply.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900 truncate">{reply.user}</span>
                          <span className="text-xs text-gray-500 ml-2">{reply.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700 mt-1">{reply.content}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      placeholder="Write a reply..."
                      value={replyInputs[deed.id] || ''}
                      onChange={(e) => handleReplyChange(deed.id, e.target.value)}
                      className="flex-grow"
                    />
                    <Button 
                      size="icon"
                      onClick={() => handleSendReply(deed.id)}
                      disabled={!replyInputs[deed.id]}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}