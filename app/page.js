'use client';
import NewsSidebar from "@/components/NewsSidebar"
import GoodDeedsFeed from "@/components/GoodDeedsFeed"
import Leaderboard from "@/components/Leaderboard"

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-2/3">
        <GoodDeedsFeed />
      </div>
      <div className="lg:w-1/3 space-y-6 max-h-full">
        <NewsSidebar />
        <Leaderboard />
      </div>
    </div>
  )
}