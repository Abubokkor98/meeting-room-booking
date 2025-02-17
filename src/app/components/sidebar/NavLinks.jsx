import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Home, BedDouble, PlusSquare, CalendarCheck, LogOut, BookOpen, User } from "lucide-react";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

const adminLinks = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Manage Rooms", href: "/dashboard/rooms", icon: BedDouble },
  { name: "Add Room", href: "/dashboard/add-room", icon: PlusSquare },
  { name: "All Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
];

const userLinks = [
  { name: "Home", href: "/", icon: Home },
  { name: "Book Rooms", href: "/rooms", icon: BedDouble },
  { name: "My Bookings", href: "/my-bookings", icon: BookOpen },
  { name: "Profile", href: "/profile", icon: User },
];

export default async function NavLinks() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return null; // Hide navigation if the user is not logged in
  }

  const isAdmin = user.email === "mail.abubokkor@gmail.com";
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
      <LogoutLink className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-purple-600 md:flex-none md:justify-start md:p-2 md:px-3">
        <LogOut className="w-6" />
        <p className="hidden md:block">Logout</p>
      </LogoutLink>
    </>
  );
}
