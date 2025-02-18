"use client";
import { deleteUserBooking } from "@/app/lib/api";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DeleteBookingButton({id, email}) {
  const [loading, setLoading] = useState(false);


  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await deleteUserBooking(id, email);
      if (res.deletedCount > 0) toast.success("Room deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete the room.");
      console.error(error);
    }
    setLoading(false);
  };

  const modernDelete = (id) => {
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
              handleDelete(id);
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
      onClick={() => modernDelete(id)}
      className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300 w-full"
      disabled={loading}
    >
      {loading ? "Deleting..." : "Delete Booking"}
    </button>
  );
}
