import { fetchAllBookings } from "@/lib/api";

export default async function AllBookings() {

  const bookings = await fetchAllBookings()

  if (bookings.length === 0) {
    return <div className="text-center mt-8">No bookings found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-teal-600 mb-6">All Bookings</h1>
      <div className="overflow-x-auto">
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
                      booking.status === "Confirmed"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
