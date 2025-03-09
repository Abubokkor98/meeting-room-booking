"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createBooking } from "../../../lib/api";

const BookRoomButton = ({ room, userEmail }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  // Total price calculating
  const calcTotalPrice = (room) => {
    const [startHour, startMinute] = room.availability.startTime.split(":").map(Number);
    const [endHour, endMinute] = room.availability.endTime.split(":").map(Number);

    const durationInHours = (endHour * 60 + endMinute - (startHour * 60 + startMinute)) / 60;

    return (durationInHours * room.pricePerHour).toFixed(2);
  };

  // Mutation for creating booking
  const { mutate } = useMutation({
    mutationFn: async () => {
      const bookingData = {
        userEmail: userEmail,
        roomId: room.id,
        roomName: room.name,
        facility: room.amenities,
        date: new Date().toISOString().split("T")[0],
        startTime: room.availability.startTime,
        endTime: room.availability.endTime,
        totalPrice: calcTotalPrice(room),
      };

      const res = await createBooking(bookingData);
      return res;
    },
    onSuccess: (data) => {
      // Invalidate queries to refetch bookings (or any related data)
      queryClient.invalidateQueries(["userBookings", userEmail]);

      if (data.insertedId) {
        toast.success("Booking successful!");
        router.push("/my-bookings");
      }
    },
    onError: (error) => {
      toast.error("Failed to book room. Please try again.");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const handleBooking = () => {
    setLoading(true);
    mutate(); // Trigger the mutation
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
    </div>
  );
};

export default BookRoomButton;
