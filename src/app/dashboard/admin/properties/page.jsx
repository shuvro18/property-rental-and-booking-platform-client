import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getHouses } from "@/app/lib/data";
import { approveProperty, deleteProperty, updateProperty } from "@/app/lib/action";

import EditPropertyAdmin from "@/app/components/dashboard/admin/EditPropertyAdmin";

// import { getAllProperties, approveProperty, rejectProperty, deleteProperty, } from "@/app/lib/action"; // or from your data/action files

// ===================== SERVER ACTIONS =====================
async function approveAction(formData) {
    "use server";
    const id = formData.get("propertyId");
    if (!id) return;
    await approveProperty(id);
    redirect("/dashboard/admin/properties");
}

async function handleUpdate(id, data) {
    "use server"

    await updateProperty(id, data)


}

async function rejectAction(formData) {
    "use server";
    const id = formData.get("propertyId");
    const feedback = formData.get("rejectionFeedback");
    if (!id || !feedback?.trim()) return;
    await rejectProperty(id, feedback.trim());
    redirect("/dashboard/admin/properties");
}

async function deleteAction(formData) {
    "use server";
    const id = formData.get("propertyId");
    if (!id) return;
    await deleteProperty(id);
    redirect("/dashboard/admin/properties");
}

// ===================== PAGE =====================
const AllPropertiesPage = async () => {
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

    const properties = await getHouses() || [];

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

    return (
        <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-0">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    All Properties
                </h1>
                <p className="mt-1 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                    Approve, reject, update or delete property listings
                </p>
            </div>

            {/* ===================== MOBILE (Cards) ===================== */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {properties?.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        No properties found.
                    </div>
                ) : (
                    properties?.map((property) => {
                        const id = property._id || property.id;
                        const status = property.status || "pending";

                        return (
                            <div
                                key={id}
                                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm space-y-4"
                            >
                                {/* Image + Title */}
                                <div className="flex gap-3">
                                    {property.images ? (
                                        <Image
                                            src={property.images}
                                            alt={property.title || "Property"}
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 rounded-xl object-cover shrink-0"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 rounded-xl bg-gray-100 dark:bg-gray-800 shrink-0" />
                                    )}
                                    <div className="min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white line-clamp-2">
                                            {property.title || "Untitled"}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                                            {property.location || "—"}
                                        </p>
                                        <div className="mt-2">{getStatusBadge(status)}</div>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-600 dark:text-gray-300">
                                    <p>
                                        <span className="text-gray-400">Type:</span>{" "}
                                        {property.propertyType || "—"}
                                    </p>
                                    <p>
                                        <span className="text-gray-400">Rent:</span> ৳
                                        {Number(property.rent || 0).toLocaleString()} /{" "}
                                        {property.rentType || "mo"}
                                    </p>
                                    {status === "rejected" && property.rejectionFeedback && (
                                        <p className="mt-2 text-rose-600 dark:text-rose-400 text-xs">
                                            Feedback: {property.rejectionFeedback}
                                        </p>
                                    )}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
                                    {status === "pending" && (
                                        <>
                                            <form action={approveAction}>
                                                <input type="hidden" name="propertyId" value={id} />
                                                <button
                                                    type="submit"
                                                    className="w-full py-2 text-sm font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-xl transition"
                                                >
                                                    Approve
                                                </button>
                                            </form>

                                            {/* Reject with feedback */}
                                            <form action={rejectAction} className="space-y-2">
                                                <input type="hidden" name="propertyId" value={id} />
                                                <textarea
                                                    name="rejectionFeedback"
                                                    required
                                                    rows={2}
                                                    placeholder="Rejection feedback (required)..."
                                                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                                                />
                                                <button
                                                    type="submit"
                                                    className="w-full py-2 text-sm font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400 rounded-xl transition"
                                                >
                                                    Reject
                                                </button>
                                            </form>
                                        </>
                                    )}

                                    <div className="flex gap-2">
                                        <EditPropertyAdmin property={property} onUpdate={handleUpdate} />
                                        <form action={deleteAction} className="flex-1 cursor-pointer">
                                            <input type="hidden" name="propertyId" value={id} />
                                            <button
                                                type="submit"
                                                className="px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400 rounded-lg transition"
                                            >
                                                Delete
                                            </button>
                                        </form>
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
                                    Property
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Type
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Rent
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {properties?.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        No properties found.
                                    </td>
                                </tr>
                            ) : (
                                properties?.map((property) => {
                                    const id = property._id || property.id;
                                    const status = property.status || "pending";

                                    return (
                                        <tr
                                            key={id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                                        >
                                            {/* Property */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {property.images ? (
                                                        <Image
                                                            src={property.images}
                                                            alt={property.title || "Property"}
                                                            width={48}
                                                            height={48}
                                                            className="w-12 h-12 rounded-lg object-cover shrink-0"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 shrink-0" />
                                                    )}
                                                    <div className="min-w-0">
                                                        <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                                            {property.title || "Untitled"}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {property.location || "—"}
                                                        </p>
                                                        {status === "rejected" &&
                                                            property.rejectionFeedback && (
                                                                <p className="text-xs text-rose-500 mt-1 line-clamp-1">
                                                                    Feedback: {property.rejectionFeedback}
                                                                </p>
                                                            )}
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Type */}
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                                {property.propertyType || "—"}
                                            </td>

                                            {/* Rent */}
                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                                ৳{Number(property.rent || 0).toLocaleString()}
                                                <span className="text-gray-400 text-xs ml-1">
                                                    /{property.rentType === "Monthly" ? "mo" : property.rentType?.toLowerCase()}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">{getStatusBadge(status)}</td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col items-end gap-2 min-w-50">
                                                    {status === "pending" && (
                                                        <div className="flex gap-2">
                                                            <form action={approveAction}>
                                                                <input type="hidden" name="propertyId" value={id} />
                                                                <button
                                                                    type="submit"
                                                                    className="px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg transition"
                                                                >
                                                                    Approve
                                                                </button>
                                                            </form>
                                                        </div>
                                                    )}

                                                    {status === "pending" && (
                                                        <form action={rejectAction} className="w-full max-w-xs space-y-1.5">
                                                            <input type="hidden" name="propertyId" value={id} />
                                                            <textarea
                                                                name="rejectionFeedback"
                                                                required
                                                                rows={2}
                                                                placeholder="Rejection feedback..."
                                                                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
                                                            />
                                                            <button
                                                                type="submit"
                                                                className="w-full px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400 rounded-lg transition"
                                                            >
                                                                Reject
                                                            </button>
                                                        </form>
                                                    )}

                                                    <div className="flex gap-2">
                                                         <EditPropertyAdmin property={property} onUpdate={handleUpdate} />
                                                        <form action={deleteAction}>
                                                            <input type="hidden" name="propertyId" value={id} />
                                                            <button
                                                                type="submit"
                                                                className="px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-900/30 dark:text-rose-400 rounded-lg transition"
                                                            >
                                                                Delete
                                                            </button>
                                                        </form>
                                                    </div>
                                                </div>
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

export default AllPropertiesPage;