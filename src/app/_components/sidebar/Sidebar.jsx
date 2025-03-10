import React from "react";
import NavLinks from "./NavLinks";

export default function Sidebar() {
  return (
    <div className="sticky top-0 md:h-screen md:w-48 overflow-y-auto z-10 flex flex-col px-3 py-4 md:px-2 bg-white shadow-md">
      <div className="flex flex-wrap gap-2 justify-center md:grow md:flex-col md:justify-between md:space-y-2">
        <NavLinks />
      </div>
    </div>
  );
}
