import BookingCard from "@/app/components/bookingCard/BookingCard";
import { fetchUserBookings } from "@/app/lib/api";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function MyBookings() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const email = user?.email;
  const bookings = email ? await fetchUserBookings(email) : [];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-teal-700 mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">
          You have no bookings yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <BookingCard key={booking._id} booking={booking} email={email}></BookingCard>
          ))}
        </div>
      )}
    </div>
  );
}
