import { currentUser } from "@clerk/nextjs/server";
import { fetchUserBookings } from "../lib/api";

export default async function useMyBookings() {
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

    // Fetch bookings with react-query
    const { data: myBookings = [], refetch} = useQuery({
        queryKey: ["bookings"],
        queryFn: async () => await fetchUserBookings(email),
      });

  return [myBookings, refetch]
}
