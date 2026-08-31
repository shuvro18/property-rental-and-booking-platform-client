import { auth } from "@/app/lib/auth";
import { getTenantBookings } from "@/app/lib/data";
import { headers } from "next/headers";
import Link from "next/link";
import { FiHome, FiCalendar, FiDollarSign, FiClock, FiCheckCircle } from "react-icons/fi";
import { TbCoinTaka } from "react-icons/tb";



export default async function TenantBookingsPage() {

  const session = await auth.api.getSession({
    headers: await headers()
  })

  const loginUserId = session?.user?.id;
  // console.log(loginUserId)


  const bookingData = await getTenantBookings();
  const bookings = bookingData.filter(e => e.bookedUser === loginUserId)
  

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950  md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              My Bookings
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              View and manage all your property reservation history.
            </p>
          </div>
          <Link
            href="/properties"
            className="px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all"
          >
            Browse More Properties
          </Link>
        </div>

        {/* Bookings List / Grid */}
        {bookings.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center border border-gray-100 dark:border-gray-800 shadow-sm">
            <p className="text-gray-500 dark:text-gray-400">You have not booked any properties yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
              >
                {/* Property Info */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-lg">
                    <FiHome />
                    <span>{booking.propertyTitle}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <FiCalendar className="text-gray-400" /> Move-in: <strong className="text-gray-700 dark:text-gray-300">{booking.moveInDate}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FiClock className="text-gray-400" /> Booked on: {booking.createdAt}
                    </span>
                  </div>
                </div>

                {/* Pricing & Status */}
                <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-gray-100 dark:border-gray-800">

                  {/* Amount */}
                  <div className="text-left md:text-right flex flex-col gap-2">
                    <span className="text-xs text-gray-400 block">Amount Paid</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-0.5">
                      <TbCoinTaka className="text-green-500" />{booking.price}
                    </span>
                  </div>

                  {/* Booking Status Badge */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-gray-400 block mb-1">Booking Status</span>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full capitalize inline-block ${booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                      {booking.status}
                    </span>
                  </div>

                  {/* Payment Status Badge */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs text-gray-400 block mb-1">Payment</span>
                    <span className="px-3 py-1 text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 rounded-full capitalize inline-block">
                      {booking.bill}
                    </span>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}