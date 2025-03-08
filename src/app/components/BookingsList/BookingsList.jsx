"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserBookings } from "@/app/lib/api";
import BookingCard from "@/app/components/bookingCard/BookingCard";

export default function BookingsList({ bookings, email }) {
  const queryClient = useQueryClient();

  // Fetch bookings with react-query
  const { data: myBookings = [] } = useQuery({
    queryKey: ["bookings", email],
    queryFn: () => fetchUserBookings(email),
    initialData: bookings, // Use server-fetched data as initial state
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {myBookings.map((booking) => (
        <BookingCard key={booking._id} booking={booking} email={email} />
      ))}
    </div>
  );
}
