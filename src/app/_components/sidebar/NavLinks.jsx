import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
  Home,
  BedDouble,
  PlusSquare,
  CalendarCheck,
  LogOut,
  BookOpen,HeartIcon,
} from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "./SignOutButton";

// links for admin
const adminLinks = [
  { name: "Go Home", href: "/", icon: Home },
  { name: "Manage Rooms", href: "/dashboard", icon: BedDouble },
  { name: "Add Room", href: "/dashboard/add-room", icon: PlusSquare },
  { name: "All Bookings", href: "/dashboard/all-bookings", icon: CalendarCheck },
];

// links for user
const userLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Book Rooms", href: "/rooms", icon: BedDouble },
  { name: "My Favorites", href: "/favorite-rooms", icon: HeartIcon },
  { name: "My Bookings", href: "/my-bookings", icon: BookOpen },
];

export default async function NavLinks() {
  const user = await currentUser();
  const isAdmin = user.publicMetadata?.role === "meetingroom_admin";

  // get links based on user role
  const links = isAdmin ? adminLinks : userLinks;

  return (
    <>
      {links.map((link) => {
        const IconComponent = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <IconComponent className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
      <div className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-teal-600 md:flex-none md:justify-start md:p-2 md:px-3">
        <UserButton/>
        <LogOut className="w-6" />
        <p className="hidden md:block"><SignOutButton/></p>
      </div>
    </>
  );
}
