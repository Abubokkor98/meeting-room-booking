import { 
  Home, 
  BedDouble, 
  PlusSquare, 
  CalendarCheck, 
  LogOut,
} from "lucide-react";

import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

const links = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Manage Rooms", href: "/dashboard/rooms", icon: BedDouble },
  { name: "Add Room", href: "/dashboard/add-room", icon: PlusSquare },
  { name: "All Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
];

const NavLinks = () => {
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
};

export default NavLinks;
