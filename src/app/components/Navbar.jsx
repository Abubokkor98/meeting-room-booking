import Link from "next/link";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();

  const isUserAuthenticated = await isAuthenticated();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="text-xl font-bold">
          Meeting Room Booking
        </Link>
        <div className="space-x-4">
          <Link href="/rooms">All Rooms</Link>
          <Link href="/dashboard">Dashboard</Link>
          {isUserAuthenticated ? (
            <LogoutLink className="block px-4 py-2 hover:text-blue-600 hover:bg-gray-100 rounded-lg">
              Log out
            </LogoutLink>
          ) : (
            <>
              <LoginLink className="block px-4 py-2 hover:text-blue-600 hover:bg-gray-100 rounded-lg">
                Login
              </LoginLink>
              <RegisterLink className="block px-4 py-2 hover:text-blue-600 hover:bg-gray-100 rounded-lg">
                Register
              </RegisterLink>
            </>
          )}
        </div>
        <div className="space-x-4"></div>
      </div>
    </nav>
  );
}
