import RoomCard from "../components/RoomCard";

const fakeRooms = [
    {
      _id: "room1",
      name: "Conference Room A",
      capacity: 10,
      location: "Floor 2, Building A",
      amenities: ["Projector", "Whiteboard", "WiFi"],
      pricePerHour: 500,
      availability: {
        startTime: "09:00",
        endTime: "18:00",
      },
      description: "A modern meeting room with all essential amenities.",
      image: "https://via.placeholder.com/300x200?text=Conference+Room+A",
    },
    {
      _id: "room2",
      name: "Conference Room B",
      capacity: 15,
      location: "Floor 3, Building B",
      amenities: ["Projector", "Whiteboard", "WiFi", "Teleconferencing"],
      pricePerHour: 700,
      availability: {
        startTime: "08:00",
        endTime: "20:00",
      },
      description: "Spacious room with advanced teleconferencing facilities.",
      image: "https://via.placeholder.com/300x200?text=Conference+Room+B",
    },
  ];
  
export default function Rooms() {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {fakeRooms.map((room) => (
      <RoomCard key={room._id} room={room} />
    ))}
  </div>
  )
}
