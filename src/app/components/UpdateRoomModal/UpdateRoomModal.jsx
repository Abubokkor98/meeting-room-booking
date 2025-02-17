import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateRoom } from "@/app/lib/api";

const UpdateRoomModal = ({ room, onClose }) => {
  const { _id, name, capacity, location, pricePerHour, description, availability, amenities } = room;
  const { startTime, endTime } = availability;

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [selectedAmenities, setSelectedAmenities] = useState(amenities || []);
  const router = useRouter();

  // Prefill form with room data
  useEffect(() => {
    setValue("name", name);
    setValue("capacity", capacity);
    setValue("location", location);
    setValue("pricePerHour", pricePerHour);
    setValue("description", description);
    setValue("startTime", startTime);
    setValue("endTime", endTime);

    // Set amenities checkboxes
    setSelectedAmenities(amenities);
  }, [room, setValue, amenities]);

  // Handle amenities checkbox change
  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedAmenities((prev) => [...prev, value]);
    } else {
      setSelectedAmenities((prev) => prev.filter((item) => item !== value));
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const updatedRoomData = {
        ...data,
        amenities: selectedAmenities,
        availability: {
          startTime: data.startTime,
          endTime: data.endTime
        }
      };
      await updateRoom(_id, updatedRoomData);
      onClose();
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full sm:w-96">
        <h2 className="text-xl font-semibold text-teal-600 mb-4">Update Room</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Room Name */}
          <div className="mb-4">
            <label className="block text-gray-600">Room Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Enter room name"
              {...register("name", { required: "Room name is required" })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          {/* Capacity */}
          <div className="mb-4">
            <label className="block text-gray-600">Capacity</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              placeholder="Enter room capacity"
              {...register("capacity", { required: "Capacity is required" })}
            />
            {errors.capacity && <p className="text-red-500">{errors.capacity.message}</p>}
          </div>

          {/* Location */}
          <div className="mb-4">
            <label className="block text-gray-600">Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Enter room location"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && <p className="text-red-500">{errors.location.message}</p>}
          </div>

          {/* Price Per Hour */}
          <div className="mb-4">
            <label className="block text-gray-600">Price Per Hour</label>
            <input
              type="number"
              className="w-full p-2 border rounded-md"
              placeholder="Enter price per hour"
              {...register("pricePerHour", { required: "Price is required" })}
            />
            {errors.pricePerHour && <p className="text-red-500">{errors.pricePerHour.message}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-gray-600">Description</label>
            <textarea
              className="w-full p-2 border rounded-md"
              placeholder="Enter room description"
              {...register("description", { required: "Description is required" })}
            />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
          </div>

          {/* Availability */}
          <div className="mb-4 flex gap-4">
            <div className="w-1/2">
              <label className="block text-gray-600">Start Time</label>
              <input
                type="time"
                className="w-full p-2 border rounded-md"
                {...register("startTime", { required: "Start time is required" })}
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-600">End Time</label>
              <input
                type="time"
                className="w-full p-2 border rounded-md"
                {...register("endTime", { required: "End time is required" })}
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-4">
            <label className="block text-gray-600">Amenities</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Wi-Fi"
                  checked={selectedAmenities.includes("Wi-Fi")}
                  onChange={handleAmenityChange}
                  className="mr-2"
                />
                Wi-Fi
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Projector"
                  checked={selectedAmenities.includes("Projector")}
                  onChange={handleAmenityChange}
                  className="mr-2"
                />
                Projector
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Whiteboard"
                  checked={selectedAmenities.includes("Whiteboard")}
                  onChange={handleAmenityChange}
                  className="mr-2"
                />
                Whiteboard
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
            >
              Update Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateRoomModal;
