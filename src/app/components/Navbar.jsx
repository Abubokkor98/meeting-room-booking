import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">
          Meeting Room Booking
        </Link>
        <div className="space-x-4">
          <Link href="/rooms">All Rooms</Link>
          <Link href="/dashboard">Dashboard</Link>
        </div>
        <div className="space-x-4">
        <SignedOut>
            <SignInButton mode="modal"/>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
