"use client";

import { useState } from "react";
import { createBooking } from "@/app/lib/api";

const BookRoomButton = ({ room, user }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleBooking = async () => {
    setLoading(true);
    setMessage("");

    try {

      const bookingData = {
        userEmail: user.email,
        roomId: room.id,
        roomName: room.name,
        date: new Date().toISOString().split("T")[0], // Current date
        startTime: room.availability.startTime,
        endTime: room.availability.endTime,
        totalPrice: room.pricePerHour,
        status: "Pending",
      };

      await createBooking(bookingData);
      setMessage("Booking successful!");
    } catch (error) {
      setMessage("Failed to book room. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div>
      <button
        onClick={handleBooking}
        className="mt-4 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition duration-300"
        disabled={loading}
      >
        {loading ? "Booking..." : "Book Room"}
      </button>

      {message && <p className="mt-2 text-red-600">{message}</p>}
    </div>
  );
};

export default BookRoomButton;
