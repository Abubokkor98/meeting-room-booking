import AdminRoomCard from "@/app/components/AdminRoomCard/AdminRoomCard"
import { fetchRooms } from "@/app/lib/api"

export default async function AdminDashboard() {
 const rooms = await fetchRooms()
   return (
     <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
     {rooms.map((room) => (
       <AdminRoomCard key={room._id} room={room} />
     ))}
   </div>
   )
}
