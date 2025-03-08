import BookRoomButton from "@/app/components/BookRoomButton/BookRoomButton";
import { fetchRoomById } from "@/app/lib/api";
import { currentUser } from "@clerk/nextjs/server";

export default async function DynamicRoom({ params }) {
  const { id } = params;
  const room = await fetchRoomById(id);

  const user = await currentUser();
  const userEmail= (user.emailAddresses?.[0]?.emailAddress);

  return (
    <div className="flex flex-col justify-center p-4">
      <img
        src={room.photo}
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

      {/* Book btn */}
      <BookRoomButton room={room} userEmail={userEmail} />
    </div>
  );
}
