import { SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
  Home,
  BedDouble,
  PlusSquare,
  CalendarCheck,
  LogOut,
  BookOpen,
  User,
} from "lucide-react";
import Link from "next/link";
import { SignOutButton } from "./SignOutButton";

const adminLinks = [
  { name: "Go Home", href: "/", icon: Home },
  { name: "Manage Rooms", href: "/dashboard", icon: BedDouble },
  { name: "Add Room", href: "/dashboard/add-room", icon: PlusSquare },
  { name: "All Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
];

const userLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Book Rooms", href: "/rooms", icon: BedDouble },
  { name: "My Bookings", href: "/my-bookings", icon: BookOpen },
];

export default async function NavLinks() {
  const user = await currentUser();
  // console.log(user.publicMetadata.role);

  const isAdmin = user.publicMetadata?.role === "admin";
  const links = isAdmin ? adminLinks : userLinks;

  return (
    <>
      {links.map((link) => {
        const IconComponent = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-purple-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <IconComponent className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
      <div className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-purple-600 md:flex-none md:justify-start md:p-2 md:px-3">
        <UserButton/>
        <LogOut className="w-6" />
        <p className="hidden md:block"><SignOutButton/></p>
      </div>
    </>
  );
}
