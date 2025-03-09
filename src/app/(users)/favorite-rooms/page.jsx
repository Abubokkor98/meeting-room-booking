import FavoriteRoomsList from "../../_components/FavoriteRoomsList/FavoriteRoomsList";

export default function FavoriteRooms() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-teal-600 mb-4">Favorite Rooms</h1>
      <FavoriteRoomsList /> 
    </div>
  );
}
