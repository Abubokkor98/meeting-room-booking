import RoomCard from "../../_components/RoomCard/RoomCard";
import { fetchAllRooms } from "../../../lib/api";

  
export default async function Rooms() {
  const rooms = await fetchAllRooms()
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {rooms.map((room) => (
      <RoomCard key={room._id} room={room} />
    ))}
  </div>
  )
}
