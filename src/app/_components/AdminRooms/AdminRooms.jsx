"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAllRooms } from "@/lib/api";
import AdminRoomCard from "../AdminRoomCard/AdminRoomCard";

export default function AdminRooms({ email }) {
  // Fetch all rooms dynamically using useQuery
  const { data: allRooms = [], refetch } = useQuery({
    queryKey: ["allRooms", email],
    queryFn: () => fetchAllRooms(email),
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {allRooms.map((room) => (
        <AdminRoomCard key={room._id} room={room} email={email} refetch={refetch} />
      ))}
    </div>
  );
}
