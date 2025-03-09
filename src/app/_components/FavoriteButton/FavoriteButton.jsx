"use client";

import { useState, useEffect } from "react";
import { Heart, HeartIcon } from "lucide-react";

export default function FavoriteButton({ room }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav._id === room._id));
  }, [room._id]);

  // Toggle favorite status
  const handleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav._id !== room._id);
    } else {
      favorites.push(room);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={handleFavorite}
      className="p-2 flex items-center justify-center transition-colors duration-300"
    >
      {isFavorite ? (
        <Heart className="w-6 h-6 text-red-500" fill="red" />
      ) : (
        <HeartIcon className="w-6 h-6 text-gray-500" />
      )}
    </button>
  );
}
