"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createBooking } from "../../../lib/api";

const BookRoomButton = ({ room, userEmail }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Total price calculating
  const calcTotalPrice = (room) => {
    const [startHour, startMinute] = room.availability.startTime
      .split(":")
      .map(Number);
    const [endHour, endMinute] = room.availability.endTime
      .split(":")
      .map(Number);

    const durationInHours =
      (endHour * 60 + endMinute - (startHour * 60 + startMinute)) / 60;

    return (durationInHours * room.pricePerHour).toFixed(2);
  };

  // Mutation for creating booking
  const { mutate } = useMutation({
    mutationFn: async () => {
      const bookingData = {
        userEmail,
        roomId: room.id,
        roomName: room.name,
        roomImage: room.photo,
        facility: room.amenities,
        date: new Date().toISOString().split("T")[0],
        startTime: room.availability.startTime,
        endTime: room.availability.endTime,
        totalPrice: calcTotalPrice(room),
        status: "pending",
      };

      return await createBooking(bookingData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["userBookings", userEmail]);

      if (data.insertedId) {
        toast.success("Booking successful!");
        router.push("/my-bookings");
      }
    },
    onError: () => {
      toast.error("Failed to book room. Please try again.");
    },
  });

  return (
    <button
      onClick={() => mutate()}
      className="mt-4 bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition duration-300"
    >
      Book Room
    </button>
  );
};

export default BookRoomButton;
