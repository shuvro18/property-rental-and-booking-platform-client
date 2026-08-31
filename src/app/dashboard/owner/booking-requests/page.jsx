

import { getUserHouse } from "@/app/lib/data"; // your data function


import { headers } from "next/headers";
import BookingRequestsClient from "@/app/components/dashboard/owner/BookingRequestsClient";
import { auth } from "@/app/lib/auth";

const BookingRequestsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const ownerId = user?.id;

  // Fetch bookings for this owner
  const bookings = await getUserHouse(ownerId);
  // console.log(bookings)

  return <BookingRequestsClient bookings={bookings || []} />;
};

export default BookingRequestsPage;