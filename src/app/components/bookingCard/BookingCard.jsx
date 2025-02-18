import React from "react";
import DeleteBookingButton from "../deleteBookingButton/DeleteBookingButton";

export default function BookingCard({ booking, email }) {
  return (
    <div
      key={booking._id}
      className="flex flex-col bg-white shadow-md rounded-xl p-5 border border-gray-200 transition-transform transform"
    >
      <h2 className="text-xl font-semibold text-teal-700 mb-2">
        {booking.roomName}
      </h2>
      <p className="text-gray-800">
        <span className="font-medium">Date:</span> {booking.date}
      </p>
      <p className="text-gray-800">
        <span className="font-medium">Time:</span> {booking.startTime} -{" "}
        {booking.endTime}
      </p>
      <p className="text-gray-800">
        <span className="font-medium">Price:</span> ৳{booking.totalPrice}
      </p>
      <p className="text-gray-800 font-medium flex-grow">Facilities:</p>
      <ul className="list-disc list-inside text-gray-700">
        {Array.isArray(booking.facility) && booking.facility.length > 0 ? (
          booking.facility.map((faci, index) => <li key={index}>{faci}</li>)
        ) : (
          <li>No facilities available</li>
        )}
      </ul>
      {/* delete btn */}
      <DeleteBookingButton id={booking._id} email={email}></DeleteBookingButton>
    </div>
  );
}
