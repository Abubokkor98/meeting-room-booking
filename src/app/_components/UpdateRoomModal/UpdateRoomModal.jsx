"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateRoom } from "../../../lib/api";

const UpdateRoomModal = ({ room, onClose, refetch }) => {
  const {
    _id,
    name,
    photo,
    capacity,
    location,
    pricePerHour,
    description,
    availability,
    amenities,
  } = room;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  // ✅ Use Mutation for updating the room
  const mutation = useMutation({
    mutationFn: (updatedFields) => updateRoom(_id, updatedFields),
    onSuccess: () => {
      toast.success("Room updated successfully!");
      onClose();
      refetch(); // 🔄 Refresh data after update
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Failed to update the room.");
    },
  });

  // 🔄 Handle Form Submission
  const onSubmit = (data) => {
    const updatedFields = {
      name: data.name || name,
      photo: data.photo || photo,
      capacity: data.capacity || capacity,
      location: data.location || location,
      pricePerHour: data.pricePerHour || pricePerHour,
      description: data.description || description,
      availability: {
        startTime: data.startTime || availability.startTime,
        endTime: data.endTime || availability.endTime,
      },
      amenities: data.amenities || amenities,
    };

    mutation.mutate(updatedFields); // ✅ Use mutation to update room
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-teal-600 mb-4">Update Room</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Room Name */}
          <div className="mb-4">
            <label className="block text-gray-600">Room Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              defaultValue={name}
              {...register("name")}
            />
          </div>

          {/* Image URL */}
          <div className="mb-4">
            <label className="block text-gray-600">Image URL</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              defaultValue={photo}
              {...register("photo")}
            />
          </div>

          {/* Capacity */}
          <div className="mb-4">
            <label className="block text-gray-600">Capacity</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              defaultValue={capacity}
              {...register("capacity")}
            />
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-600">Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              defaultValue={location}
              {...register("location")}
            />
          </div>

          {/* Price Per Hour */}
          <div className="mb-4">
            <label className="block text-gray-600">Price Per Hour</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              defaultValue={pricePerHour}
              {...register("pricePerHour")}
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-600">Description</label>
            <textarea
              className="w-full p-2 border rounded-md"
              defaultValue={description}
              {...register("description")}
            />
          </div>

          {/* Availability */}
          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-600">Start Time</label>
              <input
                type="time"
                className="w-full p-2 border rounded-md"
                defaultValue={availability.startTime}
                {...register("startTime")}
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-600">End Time</label>
              <input
                type="time"
                className="w-full p-2 border rounded-md"
                defaultValue={availability.endTime}
                {...register("endTime")}
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <label className="block text-gray-600">Amenities</label>
            <div className="flex gap-4">
              {amenities.map((amenity) => (
                <label key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    value={amenity}
                    defaultChecked={amenities.includes(amenity)}
                    {...register("amenities")}
                    className="mr-2"
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Updating..." : "Update Room"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoomModal;
