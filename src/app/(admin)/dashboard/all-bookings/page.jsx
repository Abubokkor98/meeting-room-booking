import { fetchAllBookings } from "../../../../lib/api";

import Pagination from "../../../_components/AllBookingTable/Pagination";
import BookingTable from "../../../_components/AllBookingTable/BookingTable";

export default async function AllBookings({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const limit = 5;

  const { bookings, totalPages } = await fetchAllBookings(page, limit);

  if (!bookings.length) {
    return <div className="text-center mt-8">No bookings found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-teal-600 mb-6">All Bookings</h1>

      <BookingTable bookings={bookings} />

      {/* React Paginate Component */}
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
