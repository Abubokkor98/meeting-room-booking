"use client";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { updateBookingStatus } from "../../../lib/api";

export default function BookingTable({ bookings, refetch }) {
  const mutation = useMutation({
    mutationFn: ({ bookingId, status }) =>
      updateBookingStatus(bookingId, { status }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleConfirm = (bookingId) => {
    mutation.mutate({ bookingId, status: "confirmed" });
  };

  return (
    <section className="overflow-x-auto mb-6">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">Room Name</th>
            <th className="py-2 px-4 border-b">User Email</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Time</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={booking._id} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{booking.roomName}</td>
              <td className="py-2 px-4">{booking.userEmail}</td>
              <td className="py-2 px-4">{booking.date}</td>
              <td className="py-2 px-4">
                {booking.startTime} - {booking.endTime}
              </td>
              <td className="py-2 px-4">৳{booking.totalPrice}</td>
              <td className="py-2 px-4">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    booking.status === "confirmed"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="py-2 px-4">
                {booking.status === "pending" ? (
                  <button
                    onClick={() => handleConfirm(booking._id)}
                    className="flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-lg text-white 
                             transition-all duration-300 ease-in-out
                             disabled:opacity-50 disabled:cursor-not-allowed
                             bg-blue-500 hover:bg-blue-600"
                  >
                    <CheckCircle size={16} /> Confirm
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex items-center gap-1 px-3 py-1 text-sm font-semibold rounded-lg 
                             bg-gray-300 text-gray-600 cursor-not-allowed"
                  >
                    <CheckCircle size={16} /> Confirmed
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
