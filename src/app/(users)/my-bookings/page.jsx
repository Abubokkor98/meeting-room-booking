import { fetchUserBookings } from "@/app/lib/api";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function MyBookings() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const email = user.email;
  const bookings = email ? await fetchUserBookings(email) : [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-teal-600 mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-gray-700 text-lg">You have no bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-lg rounded-xl p-4 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                {booking.roomName}
              </h2>
              <p className="text-gray-800">
                Booking Date: <span className="font-medium">{booking.date}</span>
              </p>
              <p className="text-gray-800">
                Time:{" "}
                <span className="font-medium">
                  {booking.startTime} - {booking.endTime}
                </span>
              </p>
              <p className="text-gray-800">
                Price: <span className="font-medium">৳{booking.totalPrice}</span>
              </p>
              <p className="text-gray-800">
                Status:{" "}
                <span
                  className={`font-medium ${
                    booking.status === "Confirmed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {booking.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
