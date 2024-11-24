'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Home, Info, Mail } from 'lucide-react'
import { useAuth, SignInButton, UserButton, useUser } from "@clerk/nextjs"
import { useSyncUser } from '@/hooks/useSyncUser' // Add this import

export default function Sidebar() {
  const { isSignedIn } = useAuth()
  const { user } = useUser()
  
  // Add this hook to sync the user with your database
  useSyncUser()

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
              <span>News</span>
            </Link>
          </li>
          <li>
            <Link href="/about" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
              <Info size={20} />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link href="/contact" className="flex items-center space-x-2 text-gray-700 hover:text-blue-500">
              <Mail size={20} />
              <span>Contact</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="mt-auto">
        {isSignedIn && user ? (
          <div className="flex items-center space-x-3 p-2 border rounded-lg">
            <UserButton afterSignOutUrl="/" />
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