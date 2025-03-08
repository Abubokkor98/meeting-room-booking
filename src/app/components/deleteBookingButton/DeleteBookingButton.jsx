import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserBooking } from "@/app/lib/api";
import toast from "react-hot-toast";

export default function DeleteBookingButton({ id, email }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => deleteUserBooking(id, email),
    onSuccess: (data) => {
      if (data.deletedCount > 0) {
        toast.success("Booking deleted successfully!");

        // Invalidate bookings query to refetch data
        queryClient.invalidateQueries(["bookings", email]);
      }
    },
    onError: () => {
      toast.error("Failed to delete the booking.");
    },
  });

  return (
    <button 
      onClick={() => mutation.mutate()} 
      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition w-full"
      disabled={mutation.isLoading}
    >
      {mutation.isLoading ? "Deleting..." : "Delete Booking"}
    </button>
  );
}
