"use client";

import { useMutation } from "@tanstack/react-query";
import { deleteUserBooking } from "@/lib/api";
import toast from "react-hot-toast";

export default function DeleteBookingButton({ id, email, refetch }) {
  const mutation = useMutation({
    mutationFn: () => deleteUserBooking(id, email),
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        toast.success("Booking deleted successfully!");
        refetch();
      }
    },
    onError: (error) => {
      toast.error("Failed to delete the booking.");
      // console.error("Delete error:", error);
    },
  });

  const modernDelete = () => {
    toast((t) => (
      <div className="flex gap-3 items-center">
        <div>
          <p>
            Are you sure you want to <b>delete?</b>
          </p>
        </div>
        <div className="gap-2 flex">
          <button
            className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
            onClick={() => {
              toast.dismiss(t.id);
              mutation.mutate();
            }}
          >
            Yes
          </button>
          <button
            className="bg-teal-600 text-white px-3 py-1 rounded-md hover:bg-teal-700"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <button
      onClick={modernDelete}
      className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 w-full"
      disabled={mutation.isLoading}
    >
      {mutation.isLoading ? "Deleting..." : "Delete Booking"}
    </button>
  );
}
