import { updateUserRole } from "@/app/lib/action";
import { auth } from "@/app/lib/auth";
import { getAllUsers } from "@/app/lib/data";
import { headers } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

const changeRoleAction = async (formData) => {
    "use server";
    const newRole = formData.get("role");
    const userId = formData.get("userId");

    if (!userId || !newRole) return;
    await updateUserRole(userId, newRole);
    redirect("/dashboard/admin/users");
};

const AllUsersPage = async () => {
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

    const users = await getAllUsers();

    const getRoleBadge = (role) => {
        const styles = {
            admin: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
            owner: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
            tenant: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
        };

        return (
            <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full capitalize ${styles[role] || styles.tenant
                    }`}
            >
                {role || "tenant"}
            </span>
        );
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto px-4 sm:px-0">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    All Users
                </h1>
                <p className="mt-1 text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    Manage users and their roles
                </p>
            </div>

            {/* ===================== MOBILE VIEW (Cards) ===================== */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {users?.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        No users found.
                    </div>
                ) : (
                    users?.map((user) => {
                        const userId = user._id || user.id;
                        const currentUserRole = user.type || user.role || "tenant";

                        return (
                            <div
                                key={userId}
                                className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm"
                            >
                                {/* User Info */}
                                <div className="flex items-center gap-3 mb-4">
                                    {user.image ? (
                                        <Image
                                            height={40}
                                            width={40}
                                            src={user.image}
                                            alt={user.name || "User"}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-semibold text-sm">
                                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white truncate">
                                            {user.name || "Unknown"}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                            {user.email || "—"}
                                        </p>
                                    </div>
                                </div>

                                {/* Role */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-gray-500 dark:text-gray-400">Role</span>
                                    {getRoleBadge(currentUserRole)}
                                </div>

                                {/* Change Role Form */}
                                <form action={changeRoleAction} className="flex flex-col gap-2">
                                    <input type="hidden" name="userId" value={userId} />

                                    <select
                                        name="role"
                                        defaultValue={currentUserRole}
                                        className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="tenant">Tenant</option>
                                        <option value="owner">Owner</option>
                                        <option value="admin">Admin</option>
                                    </select>

                                    <button
                                        type="submit"
                                        className="w-full px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition"
                                    >
                                        Change Role
                                    </button>
                                </form>
                            </div>
                        );
                    })
                )}
            </div>

            {/* ===================== DESKTOP VIEW (Table) ===================== */}
            <div className="hidden md:block bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    User
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">
                                    Role
                                </th>
                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {users?.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                                    >
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users?.map((user) => {
                                    const userId = user._id || user.id;
                                    const currentUserRole = user.type || user.role || "tenant";

                                    return (
                                        <tr
                                            key={userId}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {user.image ? (
                                                        <Image
                                                            height={40}
                                                            width={40}
                                                            src={user.image}
                                                            alt={user.name || "User"}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-semibold text-sm">
                                                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                                                        </div>
                                                    )}
                                                    <p className="font-medium text-gray-900 dark:text-white">
                                                        {user.name || "Unknown"}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                                {user.email || "—"}
                                            </td>

                                            <td className="px-6 py-4">
                                                {getRoleBadge(currentUserRole)}
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-end">
                                                    <form
                                                        action={changeRoleAction}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <input type="hidden" name="userId" value={userId} />

                                                        <select
                                                            name="role"
                                                            defaultValue={currentUserRole}
                                                            className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                        >
                                                            <option value="tenant">Tenant</option>
                                                            <option value="owner">Owner</option>
                                                            <option value="admin">Admin</option>
                                                        </select>

                                                        <button
                                                            type="submit"
                                                            className="px-3 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition"
                                                        >
                                                            Change Role
                                                        </button>
                                                    </form>
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

export default AllUsersPage;