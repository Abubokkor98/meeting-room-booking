import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "../provider/QueryProvider";


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
  title: "Meeting Room Booking",
  description: "Book your meeting rooms easily and efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ClerkLoading>
            <div className="flex items-center justify-center h-screen text-2xl">
              LOADING...
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <QueryProvider>
              <Toaster position="top-center" />
              <main>{children}</main>
            </QueryProvider>
          </ClerkLoaded>
        </body>
      </html>
    </ClerkProvider>
  );
}
