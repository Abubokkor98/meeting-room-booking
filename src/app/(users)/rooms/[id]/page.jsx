import { currentUser } from "@clerk/nextjs/server";
import { fetchRoomById } from "../../../../lib/api";
import BookRoomButton from "../../../_components/BookRoomButton/BookRoomButton";
import FavoriteButton from "../../../_components/FavoriteButton/FavoriteButton";

export const metadata = {
  title: "Room Details - Meeting Room Booking",
  description: "View details, amenities, and book your preferred meeting room.",
};

export default async function DynamicRoom({ params }) {
  const { id } = params;
  const room = await fetchRoomById(id);
  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  const { name, location, capacity, pricePerHour, availability, amenities, description, photo } = room;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white rounded-xl shadow-lg border max-w-4xl mx-auto">
      {/* Image Section */}
      <div className="md:flex-1">
        <img
          src={photo}
          alt={name}
          className="rounded-lg w-full h-64 object-cover md:h-full"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between md:flex-1">
        {/* Title and Location */}
        <div>
          <h1 className="text-2xl font-bold text-teal-600">{name}</h1>
          <p className="text-gray-600">{location}</p>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-gray-800">
          <p>
            <strong>Capacity:</strong> {capacity} people
          </p>
          <p>
            <strong>Price:</strong> ৳{pricePerHour} per hour
          </p>
          <p className="sm:col-span-2">
            <strong>Availability:</strong> {availability.startTime} -{" "}
            {availability.endTime}
          </p>
        </div>

        {/* Amenities */}
        <div className="mt-4">
          <h2 className="text-sm font-medium text-gray-700 mb-1">Amenities:</h2>
          <ul className="list-disc list-inside text-gray-600 grid grid-cols-1 sm:grid-cols-2 gap-1">
            {amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        </div>

        {/* Description */}
        <p className="text-gray-600 mt-4">{description}</p>

        {/* Buttons Section */}
        <div className="mt-6 flex gap-4 justify-center">
          <BookRoomButton room={room} userEmail={userEmail} />
          <FavoriteButton room={room} /> 
        </div>
      </div>
    </div>
  );
}
