import Sidebar from "../_components/sidebar/Sidebar";

export const metadata = {
  title: "User Dashboard - Meeting Room Booking",
  description: "Manage your bookings, view available rooms, and access your favorite rooms.",
};

export default function UserLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-grow p-4">
        {children}
      </div>
    </div>
  );
}
