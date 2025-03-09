import { fetchAllBookings } from "../../../../lib/api";
import BookingsManager from "../../../_components/AllBookingTable/BookingsManager";

export const metadata = {
  title: "All Bookings - Admin Dashboard",
  description: "Manage all bookings from users in the admin dashboard.",
};


export default async function AllBookings({ searchParams }) {
  const page = Number(searchParams?.page) || 1;
  const limit = 5;

  // Server-side data fetching
  const { bookings, totalPages } = await fetchAllBookings(page, limit);

  return <BookingsManager initialData={{ bookings, totalPages }} page={page} limit={limit} />;
}
