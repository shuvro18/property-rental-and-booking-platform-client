"use client";

import Link from "next/link";
import { FiHome, FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-24">
            <div className="text-center max-w-lg mx-auto">
                {/* 404 Number Animation / Styling */}
                <h1 className="text-8xl md:text-9xl font-extrabold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                    404
                </h1>

                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mt-4">
                    Page Not Found
                </h2>

                <p className="text-gray-600 dark:text-gray-400 mt-2 mb-8 text-sm md:text-base">
                    Sorry! The page you are looking for might have been removed, or the link was broken.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-linear-to-r from-indigo-600 to-violet-600 rounded-xl hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                        <FiHome size={18} />
                        Back to Home
                    </Link>

                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-300"
                    >
                        <FiArrowLeft size={18} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}