import { fetchRoomById } from "@/app/lib/api";
import React from "react";

export default async function DynamicRoom({ params }) {
  const { id } = params;
  const room = await fetchRoomById(id);
  return (
    <div className="container mx-auto p-4">
      <img
        src={room.image}
        alt={room.name}
        className="rounded-xl w-full h-64 object-cover mb-4"
      />
      <h1 className="text-2xl font-bold text-teal-600">{room.name}</h1>
      <p className="text-gray-600">{room.location}</p>
      <p className="text-gray-800">Capacity: {room.capacity} people</p>
      <p className="text-gray-800">Price: ৳{room.pricePerHour} per hour</p>

      <div className="my-4">
        <strong>Amenities:</strong>
        <ul className="list-disc list-inside text-gray-600">
          {room.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </div>

      <p className="text-gray-600">
        <strong>Availability:</strong> {room.availability.startTime} -{" "}
        {room.availability.endTime}
      </p>

      <p className="text-gray-500 my-4">{room.description}</p>

      {/* Book Room Button */}
      <button className="mt-4 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition duration-300">
        Book Room
      </button>
    </div>
  );
}
