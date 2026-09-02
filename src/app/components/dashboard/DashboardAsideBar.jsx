import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import {
    LayoutDashboard,
    CalendarCheck,
    Heart,
    User,
    PlusCircle,
    Home,
    ClipboardList,
    Users,
    Building2,
    CreditCard,
    HomeIcon,
} from "lucide-react";

const DashboardSidebar = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const user = session?.user;

    const role = user?.type || "tenant"; // default role

    const navMenu = {
        tenant: [
            {
                title: "My Bookings",
                href: "/dashboard/tenant/bookings",
                icon: <CalendarCheck size={18} />,
            },
            {
                title: "Favorites",
                href: "/dashboard/tenant/favorites",
                icon: <Heart size={18} />,
            },
            {
                title: "Profile",
                href: "/dashboard/tenant/profile",
                icon: <User size={18} />,
            },
        ],
        owner: [
            {
                title: "Overview",
                href: "/dashboard/owner",
                icon: <LayoutDashboard size={18} />,
            },
            {
                title: "Add Property",
                href: "/dashboard/owner/add-property",
                icon: <PlusCircle size={18} />,
            },
            {
                title: "My Properties",
                href: "/dashboard/owner/my-properties",
                icon: <Home size={18} />,
            },
            {
                title: "Booking Requests",
                href: "/dashboard/owner/booking-requests",
                icon: <ClipboardList size={18} />,
            },
            {
                title: "Profile",
                href: "/dashboard/owner/profile",
                icon: <User size={18} />,
            },
        ],
        admin: [
            {
                title: "Overview",
                href: "/dashboard/admin",
                icon: <LayoutDashboard size={18} />,
            },
            {
                title: "All Users",
                href: "/dashboard/admin/users",
                icon: <Users size={18} />,
            },
            {
                title: "All Properties",
                href: "/dashboard/admin/properties",
                icon: <Building2 size={18} />,
            },
            {
                title: "All Bookings",
                href: "/dashboard/admin/bookings",
                icon: <CalendarCheck size={18} />,
            },
            // {
            //     title: "Transactions",
            //     href: "/dashboard/admin/transactions",
            //     icon: <CreditCard size={18} />,
            // },
            {
                title: "Profile",
                href: "/dashboard/admin/profile",
                icon: <User size={18} />,
            },
        ],
    };

    const mainNav = navMenu[role] || navMenu.tenant;

    return (
        <aside className="w-64 h-screen bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 
        md:flex flex-col sticky top-0">

            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
               
                <Link href={"/"}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
                ><HomeIcon />
                    Back To Home
                </Link>
                <p className="text-xs px-4 text-gray-500 dark:text-gray-400 capitalize">
                    {role} Dashboard
                </p>

            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
                {mainNav.map((item) => (
                    <Link
                        key={item.title}
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
                    >
                        <span className="text-gray-400 dark:text-gray-500">
                            {item.icon}
                        </span>
                        {item.title}
                    </Link>
                ))}
            </nav>

            {/* User Info at bottom */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-3 px-2">
                    <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-semibold text-sm">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {user?.name || "User"}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {user?.email || ""}
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default DashboardSidebar;