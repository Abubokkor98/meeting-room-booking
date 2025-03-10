"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserBookings } from "../../../lib/api";
import BookingCard from "../bookingCard/BookingCard";

export default function BookingsList({ bookings, email }) {
  // Fetch user bookings
  const { data: myBookings = [], refetch } = useQuery({
    queryKey: ["bookings", email],
    queryFn: () => fetchUserBookings(email),
    initialData: bookings, 
  });

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {myBookings.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">You have no bookings yet.</p>
      ) : (
        myBookings.map((booking) => (
          <BookingCard
            key={booking._id}
            booking={booking}
            email={email}
            refetch={refetch}
          />
        ))
      )}
    </section>
  );
}
