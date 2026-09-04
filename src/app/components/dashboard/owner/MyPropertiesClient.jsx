"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Trash2, Plus, AlertTriangle } from "lucide-react";
import { deleteProperty, updateProperty } from "@/app/lib/action";
import EditPropertyButton from "./EditProperty";

const MyPropertiesClient = ({ properties: initialProperties }) => {
    const [properties, setProperties] = useState(initialProperties);
    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [deleteId, setDeleteId] = useState(null); // for delete modal
    // console.log(properties)

    const handleDeleteConfirm = async () => {
        if (deleteId) {
            await deleteProperty(deleteId)
            setProperties((prev) => prev.filter((item) => item._id !== deleteId));


            setDeleteId(null);
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
            approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
            rejected: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
        };

        return (
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${styles[status]}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                        My Properties
                    </h1>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                        Manage all your listed properties
                    </p>
                </div>

                <Link
                    href="/dashboard/owner/add-property"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white text-sm font-medium rounded-xl shadow-md transition-all"
                >
                    <Plus size={18} />
                    Add Property
                </Link>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Property</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Type</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Rent</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {properties.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                                        You haven’t added any properties yet.
                                    </td>
                                </tr>
                            ) : (
                                properties.map((property) => (
                                    <tr key={property._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{property.title}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{property.location}</p>
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            {property.propertyType}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                            ৳{property.rent?.toLocaleString()}
                                            <span className="text-gray-400 text-xs ml-1">
                                                /{property.rentType === "Monthly" ? "mo" : property.rentType?.toLowerCase()}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {getStatusBadge(property.status)}

                                                {property.status === "rejected" && (
                                                    <button
                                                        onClick={() => setSelectedFeedback(property.rejectionFeedback)}
                                                        className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
                                                        title="View rejection reason"
                                                    >
                                                        <Eye size={16} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* <Link
                                                    href={`/dashboard/owner/update-property/${property._id}`}
                                                    className="p-2 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition"
                                                    title="Update"
                                                >
                                                    <Pencil size={16} />
                                                </Link> */}
                                                <EditPropertyButton property={property} onUpdate={ async (id , data) => {
                                                    await updateProperty(id, data)
                                                    
                                                }} />

                                                <button
                                                    onClick={() => setDeleteId(property._id)}
                                                    className="p-2 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Rejection Feedback Modal */}
            {selectedFeedback && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 max-w-md w-full shadow-xl">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                            Rejection Feedback
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            {selectedFeedback}
                        </p>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setSelectedFeedback(null)}
                                className="px-5 py-2 text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 max-w-md w-full shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-11 h-11 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                                <AlertTriangle size={22} className="text-rose-600 dark:text-rose-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Delete Property
                            </h3>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                            Are you sure you want to delete this property? This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirm}
                                className="px-5 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition"
                            >
                                Yes, Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPropertiesClient;