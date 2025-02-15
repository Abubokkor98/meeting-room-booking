import Link from "next/link";
import React from "react";

export default function RoomCard({ room }) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-full sm:w-80">
      <img
        src={room.image}
        alt={room.name}
        className="rounded-xl w-full h-40 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold text-teal-600">{room.name}</h2>
      <p className="text-gray-800">Price: ৳{room.pricePerHour} per hour</p>
      
      <Link href={`/rooms/${room._id}`}>
        <button className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
          View Details
        </button>
      </Link>
    </div>
  );
}
