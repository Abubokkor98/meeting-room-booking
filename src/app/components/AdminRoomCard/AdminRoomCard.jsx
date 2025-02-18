"use client";

import React, { useState } from "react";
import { deleteRoom } from "@/app/lib/api";
import UpdateRoomModal from "../UpdateRoomModal/UpdateRoomModal";

export default function AdminRoomCard({ room }) {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this room?");
    if (confirmed) {
      try {
        await deleteRoom(room._id);
        alert("Room deleted successfully!");
      } catch (error) {
        alert("Failed to delete the room.");
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 w-full sm:w-80">
      <img
        src={room.photo}
        alt={room.name}
        className="rounded-xl w-full h-40 object-cover mb-4"
      />
      <h2 className="text-xl font-semibold text-teal-600">{room.name}</h2>
      <p className="text-gray-800">Price: ৳{room.pricePerHour} per hour</p>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>

      {showModal && (
        <UpdateRoomModal room={room} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}
