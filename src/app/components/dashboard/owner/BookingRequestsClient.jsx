"use client";

import { useState } from "react";
import ApproveButton from "./ApproveButton";
import RejectButton from "./RejectButton";
import { updateBookingStatus } from "@/app/lib/action";

const BookingRequestsClient = ({ bookings: initialBookings = [] }) => {
    const [bookings, setBookings] = useState(initialBookings);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [actionType, setActionType] = useState(null); // "approved" | "rejected"
    
  
    const handleConfirm = async () => {
        if (!selectedBooking || !actionType) return;
        
      
            const result = await updateBookingStatus(selectedBooking._id, actionType);
            
            // update status without refresh
            setBookings((prevBookings) =>
                prevBookings.map((b) =>
                    b._id === selectedBooking._id ? { ...b, status: actionType } : b
                )
            );
            
           
            setSelectedBooking(null);
            setActionType(null);
       
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
            approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
            rejected: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
        };

        return (
            <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${styles[status] || styles.pending}`}
            >
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Booking Requests
                </h1>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Manage booking requests for your properties
                </p>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Tenant Information
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Property Information
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {bookings.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        No booking requests found.
                                    </td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr
                                        key={booking._id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                                    >
                                        {/* Tenant Information */}
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {booking.userEmail}
                                            </p>
                                        </td>

                                        {/* Property Information */}
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                {booking.propertyTitle}
                                            </p>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4">
                                            {getStatusBadge(booking.status || "pending")}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <ApproveButton
                                                    onClick={() => {
                                                        setSelectedBooking(booking);
                                                        setActionType("approved");
                                                    }}
                                                />
                                                <RejectButton
                                                    onClick={() => {
                                                        setSelectedBooking(booking);
                                                        setActionType("rejected");
                                                    }}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Confirmation Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 max-w-md w-full shadow-xl">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {actionType === "approved" ? "Approve Booking" : "Reject Booking"}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                            Are you sure you want to{" "}
                            <span className="font-medium">
                                {actionType === "approved" ? "approve" : "reject"}
                            </span>{" "}
                            this booking request?
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setSelectedBooking(null);
                                    setActionType(null);
                                }}
                                className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirm}
                                className={`px-5 py-2 text-sm font-medium text-white rounded-xl transition ${
                                    actionType === "approved"
                                        ? "bg-emerald-600 hover:bg-emerald-700"
                                        : "bg-rose-600 hover:bg-rose-700"
                                }`}
                            >
                                {actionType === "approved" ? "Yes, Approve" : "Yes, Reject"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingRequestsClient;