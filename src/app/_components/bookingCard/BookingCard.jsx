import React from "react";
import DeleteBookingButton from "../deleteBookingButton/DeleteBookingButton";

export default function BookingCard({ booking, email, refetch }) {

  const {_id,status,roomName,roomImage,date,startTime,endTime,totalPrice,facility}=booking;

  return (
    <div className="relative flex flex-col bg-white shadow-lg rounded-xl p-4 md:p-6 border border-gray-200 transition-transform transform">
      {/* status badge */}
      <div className={`absolute top-0 right-0 px-4 py-1 rounded-tr-xl rounded-bl-lg text-sm font-semibold ${
        status === 'pending' 
          ? 'bg-yellow-100 text-yellow-800' 
          : 'bg-green-100 text-green-800'
      }`}>
        {status}
      </div>

      {/* room image */}
      <div className="aspect-video w-full mb-4 overflow-hidden rounded-lg">
        <img 
          src={roomImage} 
          alt={roomName} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* details */}
      <div className="flex flex-col flex-grow">
        <h2 className="text-xl font-bold text-gray-800 mb-2">
          {roomName}
        </h2>
        
        <div className="space-y-2 mb-4">
          <p className="text-gray-600">
            <span className="font-medium">Date:</span> {date}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Time:</span> {startTime} - {endTime}
          </p>
          <p className="text-gray-600">
            <span className="font-medium"> Price:</span> ৳{totalPrice}
          </p>
        </div>

        <div className="mt-auto">
          <p className="text-gray-700 font-medium mb-2">Facilities:</p>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {Array.isArray(facility) && facility.length > 0 ? (
              facility.map((faci, index) => (
                <li key={index} className="truncate">{faci}</li>
              ))
            ) : (
              <li>No facilities available</li>
            )}
          </ul>
        </div>

        {/* Delete Button Component */}
        <div className="mt-4">
          <DeleteBookingButton
            id={_id}
            email={email}
            refetch={refetch}
          />
        </div>
      </div>
    </div>
  );
}