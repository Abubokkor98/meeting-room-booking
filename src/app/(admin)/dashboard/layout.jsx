import Sidebar from "../../_components/sidebar/Sidebar";

export const metadata = {
  title: "Meeting Room Booking - Admin",
  description: "Manage meeting room bookings efficiently as an admin.",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex xs:flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row min-h-screen">
      <Sidebar />
      <div className="flex flex-wrap p-2 justify-center w-full">{children}</div>
    </div>
  );
}
