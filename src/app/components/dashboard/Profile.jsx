
import { headers } from "next/headers";
import Image from "next/image";
import { User, Mail, Shield, Calendar } from "lucide-react";
import { auth } from "@/app/lib/auth";

const ProfilePage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;
    console.log("this is image",user.image, "hwllo")

    if (!user) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500 dark:text-gray-400">Please login to view your profile.</p>
            </div>
        );
    }

    const role = user?.type

    return (
        <div className="max-w-4xl mx-auto space-y-8">

            {/* Page Title */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    My Profile
                </h1>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Manage your account information
                </p>
            </div>

            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">

                {/* Cover */}
                <div className="h-32 bg-linear-to-r from-indigo-600 to-violet-600"></div>

                {/* Profile Info */}
                <div className="px-6 pb-6">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">

                        {/* Avatar */}
                        <div className="relative">
                            {user.image ? (
                                 
                                <Image
                                    src={user.image}
                                    alt={user.name || "User"}
                                    width={100}
                                    height={100}
                                    className="w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-900 object-cover shadow-md"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-2xl border-4 border-white dark:border-gray-900 bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                                </div>
                            )}
                        </div>

                        {/* Name + Role */}
                        <div className="pb-2">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                {user.name || "User"}
                            </h2>
                            <span className="inline-block mt-1 px-3 py-1 text-xs font-medium capitalize rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400">
                                {role}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Details Section */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                    Account Information
                </h3>

                <div className="space-y-5">

                    {/* Name */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                            <User size={18} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Full Name</p>
                            <p className="text-base font-medium text-gray-900 dark:text-white">
                                {user.name || "Not set"}
                            </p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                            <Mail size={18} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Email Address</p>
                            <p className="text-base font-medium text-gray-900 dark:text-white">
                                {user.email || "Not set"}
                            </p>
                        </div>
                    </div>

                    {/* Role */}
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                            <Shield size={18} className="text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Account Role</p>
                            <p className="text-base font-medium text-gray-900 dark:text-white capitalize">
                                {role}
                            </p>
                        </div>
                    </div>

                    {/* Joined Date (if available) */}
                    {user.createdAt && (
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                                <Calendar size={18} className="text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Joined On</p>
                                <p className="text-base font-medium text-gray-900 dark:text-white">
                                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Note */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 rounded-2xl p-5">
                <p className="text-sm text-indigo-700 dark:text-indigo-300">
                    This is your account profile. Your role determines what you can access in the dashboard.
                </p>
            </div>
        </div>
    );
};

export default ProfilePage;