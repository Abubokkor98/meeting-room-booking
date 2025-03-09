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
      // refetch the rooms
      refetch();
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
    <div className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-2xl p-5 w-full sm:w-80">
      {/* image */}
      <div className="relative w-full h-44">
        <img
          src={photo}
          alt={name}
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      {/* details */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold text-teal-600">{name}</h2>
        <p className="text-gray-700 text-sm mt-1">
          Price: <span className="font-medium">৳{pricePerHour} per hour</span>
        </p>
      </div>

      {/* action btns */}
      <div className="mt-5 flex gap-3">
        <button
          onClick={() => setShowModal(true)}
          className="flex-1 bg-teal-600 text-white px-4 py-2.5 rounded-lg font-medium transition hover:bg-teal-700"
        >
          Update
        </button>
        <button
          onClick={() => modernDelete(_id)}
          className="flex-1 bg-red-600 text-white px-4 py-2.5 rounded-lg font-medium transition hover:bg-red-700"
        >
          Delete
        </button>
      </div>

      {/* update modal component */}
      {showModal && (
        <UpdateRoomModal
          room={room}
          onClose={() => setShowModal(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
}
