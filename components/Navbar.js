"use client"; // Make sure this is marked as a client component
import { useAuth } from "@clerk/nextjs";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { ClerkProvider } from "@clerk/nextjs";

const Navbar = () => {

  const { isSignedIn } = useAuth(); // Check if the user is signed in

  return (
    <nav className="bg-green-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
            <a href="/" className="text-white text-2xl font-bold">
            HappyNest
            </a>

            {/* Conditionally render navigation links for signed-in users */}
            {isSignedIn ? (
            <ul className="flex space-x-6">
                <li><a href="/" className="text-white hover:underline">Home</a></li>
                <li><a href="/about" className="text-white hover:underline">About</a></li>
                <li><a href="/contact" className="text-white hover:underline">Contact</a></li>
                <li>
                <UserButton />
            </li>
            </ul>
            ) : (
            // Show nothing or an alternative message when the user is signed out
            <SignInButton />
            )}

            {/* Show UserButton only when signed in */}
            {/* {isSignedIn && <UserButton />} */}
        </div>
    </nav>
  );
};

export default Navbar;
