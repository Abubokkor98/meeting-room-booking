"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function FavoriteRoomsList() {
  const [favorites, setFavorites] = useState([]);

  // Load favorite rooms from localStorage
  useEffect(() => {
    const favoritesFromStorage = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favoritesFromStorage);
  }, []);

  // Remove a room from favorites
  const removeFavorite = (roomId) => {
    const updatedFavorites = favorites.filter((room) => room._id !== roomId);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      {favorites.length === 0 ? (
        <p className="text-red-500">No favorite rooms yet.</p>
      ) : (
        <div className="grid gap-4">
          {favorites.map((room) => (
            <div
              key={room._id}
              className="flex items-center justify-between p-4 border rounded-lg shadow-sm bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={room.photo}
                  alt={room.name}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{room.name}</h2>
                  <p className="text-gray-500">{room.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Link href={`/rooms/${room._id}`}
                  className="text-teal-600 hover:underline"
                >
                  View Room
                </Link>
                <button onClick={() => removeFavorite(room._id)} className="text-red-500">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
