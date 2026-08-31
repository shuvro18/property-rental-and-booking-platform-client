"use client";

import { useState } from "react";
import { FiUser, FiX } from "react-icons/fi";

import { toast } from "react-toastify";
import { authClient } from "../lib/auth-client";
import { MdEmail } from "react-icons/md";
import { addBooking } from "../lib/action";

const BookingModal = ({ property }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = authClient.useSession();
    const user = session?.user;



    const [loading, setLoading] = useState(false);

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const bookingData = {
            userId: property?.userId,
            bookedUser: user?.id,
            propertyId: property?._id,
            propertyTitle: property?.title,
            userName: user?.name || "Anonymous",
            userEmail: user?.email,
            moveInDate: formData.get("moveInDate"),
            contactNumber: formData.get("contactNumber"),
            additionalNotes: formData.get("additionalNotes"),
            createdAt: new Date().toISOString(),
            status: "pending",
            price: property?.rent,
        };
        // console.log(bookingData)

        setLoading(true);

        try {
            const response = await fetch("/api/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingData),
            });

            const data = await response.json();

            if (data.url) {

                window.location.href = data.url;
            } else {
                toast.error(data.error || "Failed to redirect to stripe");
            }

        } catch (error) {
            console.error("Error booking property:", error);
            toast.error("Something went wrong!");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/*Book Now */}
            <button
                onClick={() => setIsOpen(true)}
                className="w-full py-3.5 text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
                Book Now
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg p-6 md:p-8 shadow-2xl border border-gray-100 dark:border-gray-800 relative animate-in fade-in zoom-in duration-200">

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                        >
                            <FiX size={22} />
                        </button>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                            Book This Property
                        </h3>

                        {/* Booking Form */}
                        <form onSubmit={handleBookingSubmit} className="space-y-4">

                            {/* User Name */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    User Name
                                </label>
                                <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm">
                                    <FiUser size={16} className="text-gray-400" />
                                    <span>{user?.name || "Guest User"} </span>
                                </div>
                            </div>

                            {/* user email */}
                            <div>
                                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                                    User Email
                                </label>
                                <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm">
                                    <MdEmail size={16} className="text-gray-400" />
                                    <span> {user?.email || "No email"}</span>
                                </div>
                            </div>

                            {/* Move-in Date */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Move-in Date *
                                </label>
                                <input
                                    type="date"
                                    name="moveInDate"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Contact Number */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Contact Number *
                                </label>
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    placeholder="Enter your phone number"
                                    maxLength={11}
                                    minLength={11}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>

                            {/* Additional Notes */}
                            <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Additional Notes
                                </label>
                                <textarea
                                    name="additionalNotes"
                                    rows="3"
                                    placeholder="Any specific requirements or questions..."
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-5 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-2.5 text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md transition disabled:opacity-50"
                                >
                                    {loading ? "Submitting..." : "Confirm Booking"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingModal;