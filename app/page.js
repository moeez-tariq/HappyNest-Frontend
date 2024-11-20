'use client';
import { useState } from 'react';
import NewsSidebar from "@/components/NewsSidebar"
import GoodDeedsFeed from "@/components/GoodDeedsFeed"

export default function Home() {
    const [newsItems] = useState([
      {
        id: '1',
        title: 'Missing cat reunited with family after 10 years',
        date: '30 January 2024',
        image: '/placeholder.svg?height=400&width=600',
        excerpt: "Linda Ellerton never thought she'd see her cat Whiskas again. However...",
      },
      {
        id: '2',
        title: 'Missing cat reunited with family after 10 years',
        date: '30 January 2024',
        image: '/placeholder.svg?height=400&width=600',
        excerpt: "Linda Ellerton never thought she'd see her cat Whiskas again. However...",
      },
      {
        id: '3',
        title: 'Missing cat reunited with family after 10 years',
        date: '30 January 2024',
        image: '/placeholder.svg?height=400&width=600',
        excerpt: "Linda Ellerton never thought she'd see her cat Whiskas again. However...",
      },
      {
        id: '3',
        title: 'Missing cat reunited with family after 10 years',
        date: '30 January 2024',
        image: '/placeholder.svg?height=400&width=600',
        excerpt: "Linda Ellerton never thought she'd see her cat Whiskas again. However...",
      },

      // Add more news items as needed
    ])
  
    const [goodDeeds] = useState([
      {
        id: '1',
        user: '@ChristianGrewell',
        content: 'Today I fed a homeless person some chili! Felt so good to give back!',
        image: '/placeholder.svg?height=200&width=300',
        timestamp: '1h ago',
        replies: [
          {
            id: 'r1',
            user: '@JohnDoe',
            content: 'That\'s amazing! You\'re an inspiration!',
            timestamp: '30m ago'
          },
          {
            id: 'r2',
            user: '@JaneSmith',
            content: 'We need more people like you in this world.',
            timestamp: '15m ago'
          }
        ]
      },
      {
        id: '2',
        user: '@ChristianGrewell',
        content: "I saved a cat from a burning building! Too bad I'm allergic to cats...",
        timestamp: '1h ago',
        replies: []
      },
      {
        id: '3',
        user: '@ChristianGrewell',
        content: 'Today I fed a homeless person some chili! Felt so good to give back!',
        image: '/placeholder.svg?height=200&width=300',
        timestamp: '1h ago',
        replies: []
      },
    ])
  
    return (
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <GoodDeedsFeed goodDeeds={goodDeeds} />
        </div>
        <div className="lg:w-1/3">
          <NewsSidebar news={newsItems} />
        </div>
      </div>
    )
  }

// export default function Home() {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleLocationSuccess = async (lat, lon) => {
//     console.log("Fetching any new news in the area");
//     setLoading(true);
//     // Fetch the latest news and add to the database
//     await fetch(`http://localhost:8000/api/news/fetch`);
//     setLocation({ lat, lon });
//     setLoading(false);
//   };

//   return (
//     <main className="container mx-auto text-center py-8">
//       {/* Show only if signed in */}
//       <SignedIn>
//         <h1 className="text-4xl font-bold mb-6">Welcome to HappyNest</h1>
//         {!location ? (
//           <>
//             <p className="mb-4 text-lg">
//               Click below to find happy news near you! Please wait a few
//               seconds after answering the prompt :)
//             </p>
//             <LocationRequest onLocationSuccess={handleLocationSuccess} />
//             {loading && <p>Fetching news in the local area!</p>}
//           </>
//         ) : (
//           <NewsList lat={location.lat} lon={location.lon} />
//         )}
//       </SignedIn>

//       {/* Show sign-in button if signed out */}
//       <SignedOut>
//         <h1 className="text-4xl font-bold mb-6">Welcome to HappyNest</h1>
//         <p className="text-lg mb-6">
//           Sign in to get happy news in your area!
//         </p>
//         <SignInButton afterSignInUrl="/">
//           <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg text-lg hover:bg-primary/90">
//             Sign In
//           </button>
//         </SignInButton>
//       </SignedOut>
//     </main>
//   );
// }
