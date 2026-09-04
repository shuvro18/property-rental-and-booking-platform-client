
import { headers } from "next/headers";
// import { getAllBookings } from "@/app/lib/data"; // your function
import { auth } from "@/app/lib/auth";
import { getTenantBookings } from "@/app/lib/data";

const AllBookingsPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const currentRole = session?.user?.type || session?.user?.role;
    if (currentRole !== "admin") {
        return (
            <div className="text-center py-20 text-gray-500 dark:text-gray-400">
                Access Denied. Admins only.
            </div>
        );
    }

    const bookings = await getTenantBookings();
    console.log(bookings)

    const getStatusBadge = (status) => {
        const styles = {
            pending:
                "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
            approved:
                "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
            rejected:
                "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
        };

        return (
            <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${styles[status] || styles.pending
                    }`}
            >
                {status || "pending"}
            </span>
        );
    };

    const getPaymentBadge = (status) => {
        const styles = {
            paid: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
            pending:
                "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
            failed: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
        };

        return (
            <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${styles[status] || styles.pending
                    }`}
            >
                {status || "pending"}
            </span>
        );
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-0">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    All Bookings
                </h1>
                <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                    Monitor all booking activities across the platform
                </p>
            </div>

            {/* ===================== MOBILE (Cards) ===================== */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {bookings?.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        No bookings found.
                    </div>
                ) : (
                    bookings?.map((booking) => {
                        const id = booking._id || booking.id;

                        return (
                            <div
                                key={id}
                                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm space-y-3"
                            >
                                {/* Tenant */}
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                                        Tenant
                                    </p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {booking.userName || booking.user?.name || "Unknown"}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {booking.userEmail || booking.user?.email || "—"}
                                    </p>
                                </div>

                                {/* Property */}
                                <div>
                                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                                        Property
                                    </p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        {booking.propertyTitle || booking.property?.title || "Property"}
                                    </p>
                                    
                                </div>

                                {/* Amount + Date */}
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                                            Amount
                                        </p>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            ৳{booking.price}

                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-400 dark:text-gray-500 mb-0.5">
                                            Move-in
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            {booking.moveInDate
                                                ? new Date(booking.moveInDate).toLocaleDateString()
                                                : "—"}
                                        </p>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Booking</p>
                                        {getStatusBadge(booking.status)}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">Payment</p>
                                        {getPaymentBadge(booking.bill)}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* ===================== DESKTOP (Table) ===================== */}
            <div className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Tenant
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Property
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Amount
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Move-in Date
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Booking Status
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Payment
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {bookings?.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        No bookings found.
                                    </td>
                                </tr>
                            ) : (
                                bookings?.map((booking) => {
                                    const id = booking._id || booking.id;

                                    return (
                                        <tr
                                            key={id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                                        >
                                            {/* Tenant */}
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {booking.userName ||
                                                            booking.user?.name ||
                                                            "Unknown"}
                                                    </p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {booking.userEmail ||
                                                            booking.user?.email ||
                                                            "—"}
                                                    </p>
                                                </div>
                                            </td>

                                            {/* Property */}
                                            <td className="px-6 py-4">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {booking.propertyTitle ||
                                                            booking.property?.title ||
                                                            "Property"}
                                                    </p>
                                                   
                                                </div>
                                            </td>

                                            {/* Amount */}
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                ৳
                                                {Number(
                                                    booking.price || booking.rent || 0
                                                ).toLocaleString()}
                                            </td>

                                            {/* Move-in Date */}
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                                {booking.moveInDate
                                                    ? new Date(booking.moveInDate).toLocaleDateString()
                                                    : "—"}
                                            </td>

                                            {/* Booking Status */}
                                            <td className="px-6 py-4">
                                                {getStatusBadge(booking.status)}
                                            </td>

                                            {/* Payment Status */}
                                            <td className="px-6 py-4">
                                                {getPaymentBadge(booking.bill)}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AllBookingsPage;