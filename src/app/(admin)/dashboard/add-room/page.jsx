"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRoom, uploadImage } from "@/lib/api";
import toast from "react-hot-toast";

export default function AddRoomForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      setIsLoading(true);

      try {
        // Upload image to ImgBB and get URL
        const image = { image: data.image[0] };
        const res = await uploadImage(image);
        
        if (res.data.id) {
          const newRoom = {
            name: data.name,
            photo: res.data.display_url, 
            capacity: data.capacity,
            location: data.location,
            amenities: data.amenities,
            pricePerHour: data.pricePerHour,
            availability: data.availability,
            description: data.description,
          };

          const response = await addRoom(newRoom);
          if (response.insertedId) {
            toast.success("Room added successfully");
            
            // invalidate query refetch
            queryClient.invalidateQueries(["allRooms"]);
            
            router.push("/dashboard");
          }
        }
      } catch (error) {
        console.error("Error adding room:", error);
        toast.error("Error adding room");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-6">Add New Room</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-lg shadow-lg"
      >
        {/* Form Fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Room Name</label>
          <input
            type="text"
            placeholder="Enter room name"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            {...register("name", { required: "Room name is required" })}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Capacity</label>
          <input
            type="number"
            placeholder="Enter room capacity"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            {...register("capacity", {
              required: "Capacity is required",
              min: { value: 1, message: "Capacity should be at least 1" },
            })}
          />
          {errors.capacity && <p className="text-red-500 text-xs">{errors.capacity.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            placeholder="Enter room location"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            {...register("location", { required: "Location is required" })}
          />
          {errors.location && <p className="text-red-500 text-xs">{errors.location.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Price per Hour</label>
          <input
            type="number"
            placeholder="Enter price per hour"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            {...register("pricePerHour", {
              required: "Price per hour is required",
              min: {
                value: 0,
                message: "Price must be greater than or equal to 0",
              },
            })}
          />
          {errors.pricePerHour && <p className="text-red-500 text-xs">{errors.pricePerHour.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            {...register("availability.startTime", { required: "Start time is required" })}
          />
          {errors.availability?.startTime && <p className="text-red-500 text-xs">{errors.availability.startTime.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="time"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            {...register("availability.endTime", { required: "End time is required" })}
          />
          {errors.availability?.endTime && <p className="text-red-500 text-xs">{errors.availability.endTime.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            placeholder="Enter room description"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Amenities</label>
          <div className="flex gap-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                value="Wi-Fi"
                {...register("amenities", { validate: (value) => value.length > 0 || "Please select at least one amenity" })}
              />
              <span className="ml-2">Wi-Fi</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                value="Projector"
                {...register("amenities", { validate: (value) => value.length > 0 || "Please select at least one amenity" })}
              />
              <span className="ml-2">Projector</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                value="Whiteboard"
                {...register("amenities", { validate: (value) => value.length > 0 || "Please select at least one amenity" })}
              />
              <span className="ml-2">Whiteboard</span>
            </label>
          </div>
          {errors.amenities && <p className="text-red-500 text-xs">{errors.amenities.message}</p>}
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Room Image</label>
          <input
            type="file"
            className="mt-2 p-2 border border-gray-300 rounded-md w-full"
            {...register("image", {
              required: "Image is required",
              validate: {
                isImage: (files) => (files && files[0]?.type.startsWith("image/")) || "Only image files are allowed",
              },
            })}
          />
          {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="mb-4 flex justify-center">
          <button
            type="submit"
            className={`px-4 py-2 rounded-lg text-white ${isLoading ? "bg-gray-400" : "bg-teal-600 hover:bg-teal-700"}`}
            disabled={isLoading}
          >
            {isLoading ? "Adding Room..." : "Add Room"}
          </button>
        </div>
      </form>
    </div>
  );
}
