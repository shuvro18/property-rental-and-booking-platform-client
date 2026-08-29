import { deleteFavorite } from '@/app/lib/action';
import { auth } from '@/app/lib/auth';
import { getFavorite } from '@/app/lib/data';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { FiHeart, FiHome, FiTrash2 } from 'react-icons/fi';

const favoritePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const user = session?.user?.type
    const loginUserId = session?.user?.id;
    const favoriteData = await getFavorite()



    const favorites = favoriteData.filter(e => e.userId === loginUserId)
    // console.log(favorites)

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-4 sm:p-6 md:p-10">
            <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            <FiHeart className="text-red-500 fill-red-500" /> My Favorites
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Manage all your saved properties and quick-access listings.
                        </p>
                    </div>
                    <Link
                        href="/properties"
                        className="w-full sm:w-auto text-center px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition-all"
                    >
                        Explore More
                    </Link>
                </div>

                {/* Favorites Section */}
                {favorites.length === 0 ? (
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 text-center border border-gray-100 dark:border-gray-800 shadow-sm space-y-3">
                        <FiHeart size={40} className="mx-auto text-gray-300 dark:text-gray-700" />
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                            You have no favorite properties saved yet.
                        </p>
                    </div>
                ) : (
                    <>
                        {/* ====== Mobile Cards (visible only on small screens) ====== */}
                        <div className="space-y-4 md:hidden">
                            {favorites.map((item) => (
                                <div
                                    key={item._id}
                                    className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm p-4"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                            <FiHome size={18} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-1">
                                                ${item.rent} / mo
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                Saved: {item.date}
                                            </p>
                                        </div>
                                    </div>

                                    <form
                                        action={async () => {
                                            "use server";
                                            await deleteFavorite(item._id, user)
                                        }}
                                        className="mt-4"
                                    >
                                        <button
                                            type="submit"
                                            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-sm font-semibold rounded-lg transition-all"
                                        >
                                            <FiTrash2 size={14} />
                                            <span>Remove</span>
                                        </button>
                                    </form>
                                </div>
                            ))}
                        </div>

                        {/* ====== Desktop Table (hidden on mobile) ====== */}
                        <div className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-gray-100 dark:border-gray-800 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50/50 dark:bg-gray-800/50">
                                            <th className="py-4 px-6">Property Name</th>
                                            <th className="py-4 px-6">Price</th>
                                            <th className="py-4 px-6">Saved Date</th>
                                            <th className="py-4 px-6 text-right">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                                        {favorites.map((item) => (
                                            <tr
                                                key={item._id}
                                                className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                                            >
                                                <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                                    <div className="flex items-center gap-2.5">
                                                        <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                                                            <FiHome size={18} />
                                                        </div>
                                                        <span className="truncate max-w-55">{item.title}</span>
                                                    </div>
                                                </td>

                                                <td className="py-4 px-6 font-medium text-gray-800 dark:text-gray-200">
                                                    ${item.rent} / mo
                                                </td>

                                                <td className="py-4 px-6 text-gray-500 dark:text-gray-400 text-xs">
                                                    {item.date}
                                                </td>

                                                <td className="py-4 px-6 text-right">
                                                    <form
                                                        action={async () => {
                                                            "use server";
                                                             await deleteFavorite(item._id, user)
                                                        }}
                                                    >
                                                        <button
                                                            type="submit"
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-semibold rounded-lg transition-all"
                                                        >
                                                            <FiTrash2 size={14} />
                                                            <span>Remove</span>
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default favoritePage;