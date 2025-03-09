import Link from "next/link";
import React from "react";

export default function RoomCard({ room }) {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden p-6 w-full">
      <img
        src={room.photo}
        alt={room.name}
        className="rounded-lg w-full h-56 object-cover mb-6"
      />
      <div className="flex flex-col space-y-3">
        <h2 className="text-2xl font-semibold text-teal-600">{room.name}</h2>
        <p className="text-gray-600 text-base">Price: ৳{room.pricePerHour} per hour</p>
        <p className="text-gray-500 text-sm">{room.description.slice(0, 100)}...</p>
        
        <div className="mt-4">
          <Link href={`/rooms/${room._id}`}>
            <button className="bg-teal-600 text-white py-2 px-6 rounded-lg w-full hover:bg-teal-700 transition duration-200">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
