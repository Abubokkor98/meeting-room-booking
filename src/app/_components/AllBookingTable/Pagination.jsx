"use client"; // Needed for interactivity

import { useRouter, useSearchParams } from "next/navigation";
import ReactPaginate from "react-paginate";

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = ({ selected }) => {
    const newPage = selected + 1;

    const params = new URLSearchParams(searchParams);
    params.set("page", newPage);

    router.push(`?${params.toString()}`);
  };

  return (
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
        forcePage={currentPage - 1} // Keep sync with current page
      />
    </div>
  );
}
