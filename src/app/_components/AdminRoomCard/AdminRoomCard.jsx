"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import UpdateRoomModal from "../UpdateRoomModal/UpdateRoomModal";
import toast from "react-hot-toast";
import { deleteRoom } from "../../../lib/api";

export default function AdminRoomCard({ room, refetch }) {
  const [showModal, setShowModal] = useState(false);
  const { name, photo, pricePerHour, _id } = room;

  const mutation = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      toast.success("Room deleted successfully!");
      refetch(); // 🔄 Refetch data after deleting
    },
    onError: () => {
      toast.error("Failed to delete the room.");
    },
  });

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
              mutation.mutate(id);
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
    <div className="bg-white shadow-lg rounded-2xl p-4 w-full sm:w-80">
      <img
        src={photo}
        alt={name}
        className="rounded-xl w-full h-40 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold text-teal-600">{name}</h2>
      <p className="text-gray-800">Price: ৳{pricePerHour} per hour</p>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
        >
          Update
        </button>
        <button
          onClick={() => modernDelete(_id)}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>

      {showModal && (
        <UpdateRoomModal room={room} onClose={() => setShowModal(false)} refetch={refetch}/>
      )}
    </div>
  );
}
