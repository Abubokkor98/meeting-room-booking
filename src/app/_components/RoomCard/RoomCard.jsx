import Link from "next/link";
import React from "react";

export default function RoomCard({ room }) {
  const { _id, name, photo, pricePerHour } = room;

  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden p-6 w-full">
      <img
        src={photo}
        alt={name}
        className="rounded-lg w-full h-56 object-cover mb-6"
      />
      <div className="flex flex-col space-y-3">
        <h2 className="text-2xl font-semibold text-teal-600">{name}</h2>
        <p className="text-gray-600 text-base">
          Price: ৳{pricePerHour} per hour
        </p>

        <div className="mt-4">
          <Link href={`/rooms/${_id}`}>
            <button className="bg-teal-600 text-white py-2 px-6 rounded-lg w-full hover:bg-teal-700 transition duration-200">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
