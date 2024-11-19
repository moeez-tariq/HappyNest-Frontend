import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/nextjs";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "HappyNest",
  description: "Get happy news in your area!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider dynamic={true} appearance={{ userButton: false }}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </Navbar>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
