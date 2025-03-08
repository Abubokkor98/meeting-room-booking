import BookingsList from "@/app/components/BookingsList/BookingsList";
import { fetchUserBookings } from "@/app/lib/api";
import { currentUser } from "@clerk/nextjs/server";

export default async function MyBookings() {
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  // Fetch bookings on the server
  const bookings = email ? await fetchUserBookings(email) : [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">You have no bookings yet.</p>
      ) : (
        // Pass fetched bookings to a client component
        <BookingsList bookings={bookings} email={email} />
      )}
    </div>
  );
}
