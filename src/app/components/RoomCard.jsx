import React from 'react'

export default function RoomCard({room}) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-full sm:w-80">
      <img
        src={room.image}
        alt={room.name}
        className="rounded-xl w-full h-40 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold text-teal-600">{room.name}</h2>
      <p className="text-gray-600">{room.location}</p>
      <p className="text-gray-800">Capacity: {room.capacity} people</p>
      <p className="text-gray-800">Price: ৳{room.pricePerHour} per hour</p>
      <ul className="text-gray-600 my-2">
        <strong>Amenities:</strong>
        {room.amenities.map((amenity, index) => (
          <li key={index}>- {amenity}</li>
        ))}
      </ul>
      <p className="text-gray-600">
        <strong>Availability:</strong> {room.availability.startTime} - {room.availability.endTime}
      </p>
      <p className="text-gray-500 my-2">{room.description}</p>
      <button className="mt-4 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
        Book Now
      </button>
    </div>
  )
}
