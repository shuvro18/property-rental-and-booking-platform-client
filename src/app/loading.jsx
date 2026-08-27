export default function Loading() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4">
            <div className="flex flex-col items-center gap-6">
                {/* Modern Spinner / Loader Animation */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-100 dark:border-indigo-950"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
                </div>

                {/* Loading Text */}
                <div className="text-center space-y-1">
                    <h3 className="text-lg font-semibold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                        Loading...
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Please wait a moment.
                    </p>
                </div>
            </div>
        </div>
    );
}