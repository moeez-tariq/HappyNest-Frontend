import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";

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
  description: "Spread positivity and share good deeds!",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider dynamic={true} appearance={{ userButton: false }}>
      <html lang="en" className="h-full">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex h-full overflow-hidden bg-gray-100`}
        >
          <Sidebar />
          <main className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto p-2">
              {children}
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}