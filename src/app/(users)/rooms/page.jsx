import { fetchAllRooms } from "../../../lib/api";
import RoomCard from "../../_components/RoomCard/RoomCard";

export const metadata = {
  title: "Available Rooms - Meeting Room Booking",
  description: "Browse and book from a list of available meeting rooms tailored to your needs.",
};

export default async function Rooms() {
  const rooms = await fetchAllRooms();

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {rooms.map((room) => (
        <RoomCard key={room._id} room={room} />
      ))}
    </div>
  );
}
