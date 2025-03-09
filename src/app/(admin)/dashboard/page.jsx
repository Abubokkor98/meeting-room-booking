import { currentUser } from "@clerk/nextjs/server";
import AdminRooms from "../../_components/AdminRooms/AdminRooms";

export const metadata = {
  title: "Admin Dashboard - Meeting Room Booking",
  description: "Manage and view all rooms as an admin.",
};

export default async function AdminDashboard() {
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">All Rooms</h1>
      <AdminRooms email={email} />
    </div>
  );
}
