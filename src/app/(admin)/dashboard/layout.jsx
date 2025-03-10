import Sidebar from "../../_components/sidebar/Sidebar";

export const metadata = {
  title: "Meeting Room Booking - Admin",
  description: "Manage meeting room bookings efficiently as an admin.",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
    <Sidebar />
    <div className="flex flex-wrap p-2 justify-center w-full md:flex-1">
      {children}
    </div>
  </div>
  );
}
