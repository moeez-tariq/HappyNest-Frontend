'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Home, Info, Mail } from 'lucide-react'
import { useAuth, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import { useEffect } from 'react'

const API_ROUTE = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Sidebar() {
    const { isSignedIn } = useAuth()
    const { user } = useUser()

    const handleUserButtonClick = () => {
        const userButtonContainer = document.getElementById('clerk-user-button');
        if (userButtonContainer) {
            const button = userButtonContainer.querySelector('button');
            if (button) button.click();
        }
    };

    useEffect(() => {
        if (!isSignedIn || !user) return;

        const syncUser = async () => {
            try {
            const response = await fetch(`${API_ROUTE}/api/users/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                _id: user.id,
                name: user.fullName,
                email: user.emailAddresses[0].emailAddress,
                password: 'clerk-auth',
                streak: 0,
                mood: "Hopeful",
                location: {
                    city: "New York", // Could be made dynamic later
                    state: "New York",
                    country: "United States", 
                    coordinates: {
                    latitude: 40.7128,
                    longitude: -74.0060
                    }
                }
                })
            });
            } catch (err) {
            console.error('Error syncing user:', err);
            }
        };

        syncUser();
    }, [isSignedIn, user]);

  return (
    <aside className="w-64 bg-white border-r p-4 flex-shrink-0 h-screen overflow-y-auto flex flex-col">
      <div className="mb-8">
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/logo.png" alt="HappyNest Logo" width={40} height={40} />
          <span className="text-xl font-bold text-gray-800">HappyNest</span>
        </Link>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-4">
          <li>
            <Link href="/" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
              <Home size={20} />
              <span>Feed</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        {isSignedIn && user ? (
          <div className="flex items-center space-x-3 p-2 border rounded-lg cursor-pointer hover:bg-gray-50" onClick={handleUserButtonClick}>
            <div id="clerk-user-button">
                <UserButton afterSignOutUrl="/" />
            </div>
            <div>
              <p className="font-semibold text-sm">{user.fullName}</p>
              <p className="text-xs text-gray-500">@{user.username}</p>
            </div>
          </div>
        ) : (
          <SignInButton mode="modal">
            <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
              Sign In
            </button>
          </SignInButton>
        )}
      </div>
    </aside>
  )
}