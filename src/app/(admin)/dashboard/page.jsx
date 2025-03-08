import AdminRooms from "@/app/_components/AdminRooms/AdminRooms";
import { currentUser } from "@clerk/nextjs/server";

export default async function AdminDashboard() {
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">All Rooms</h1>
      {/* Pass only email; AdminRooms will fetch data using useQuery */}
      <AdminRooms email={email} />
    </div>
  );
}
