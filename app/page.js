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
