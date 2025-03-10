"use client";

import { useQuery } from "@tanstack/react-query";
import AdminRoomCard from "../AdminRoomCard/AdminRoomCard";
import { fetchAllRooms } from "../../../lib/api";


export default function AdminRooms({ email }) {
  // fetch all rooms
  const { data: allRooms = [], refetch } = useQuery({
    queryKey: ["allRooms", email],
    queryFn: () => fetchAllRooms(email),
  });

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {allRooms.map((room) => (
        // pass the room and email to the AdminRoomCard component
        <AdminRoomCard key={room._id} room={room} email={email} refetch={refetch} />
      ))}
    </section>
  );
}
