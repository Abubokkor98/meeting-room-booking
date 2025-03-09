import FavoriteRoomsList from "../../_components/FavoriteRoomsList/FavoriteRoomsList";

export const metadata = {
  title: "Favorite Rooms - Meeting Room Booking",
  description: "View and manage your favorite meeting rooms for quick access.",
};

export default function FavoriteRooms() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-teal-600 mb-4">Favorite Rooms</h1>
      <FavoriteRoomsList /> 
    </div>
  );
}
