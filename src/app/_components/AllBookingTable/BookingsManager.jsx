"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";
import { fetchAllBookings } from "../../../lib/api";
import BookingTable from "./BookingTable";

export default function BookingsManager({ initialData, page, limit }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fetch bookings using TanStack Query
  const { data, refetch } = useQuery({
    queryKey: ["bookings", page],
    queryFn: () => fetchAllBookings(page, limit),
    initialData,
  });


  const { bookings, totalPages } = data;

  if (!bookings.length) return <div className="text-center text-red-400 mt-8">No bookings found.</div>;

  // Handle page change
  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-teal-600 mb-6">All Bookings</h1>

      {/* Booking Table with refetch */}
      <BookingTable bookings={bookings} refetch={refetch} />

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          breakLabel={"..."}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"flex space-x-2"}
          activeClassName={"text-white bg-teal-600 px-3 py-1 rounded"}
          pageClassName={"px-3 py-1 rounded border"}
          previousClassName={"px-3 py-1 rounded border"}
          nextClassName={"px-3 py-1 rounded border"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
          forcePage={page - 1}
        />
      </div>
    </div>
  );
}
