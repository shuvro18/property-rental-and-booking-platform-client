import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import {
  CalendarCheck,
  Heart,
  Home,
  PlusCircle,
  Users,
  Building2,
  CreditCard,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

const DashboardHomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const role = user?.type || "tenant";

  // Different quick links based on role
  const quickLinks = {
    tenant: [
      {
        title: "My Bookings",
        description: "View all your booking history",
        href: "/dashboard/tenant/bookings",
        icon: <CalendarCheck size={22} />,
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      },
      {
        title: "Favorites",
        description: "Properties you saved",
        href: "/dashboard/tenant/favorites",
        icon: <Heart size={22} />,
        color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
      },
      {
        title: "Profile",
        description: "Manage your account",
        href: "/dashboard/tenant/profile",
        icon: <Users size={22} />,
        color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
      },
    ],
    owner: [
      {
        title: "Add Property",
        description: "List a new property",
        href: "/dashboard/owner/add-property",
        icon: <PlusCircle size={22} />,
        color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
      },
      {
        title: "My Properties",
        description: "Manage your listings",
        href: "/dashboard/owner/my-properties",
        icon: <Home size={22} />,
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      },
      {
        title: "Booking Requests",
        description: "Approve or reject bookings",
        href: "/dashboard/owner/booking-requests",
        icon: <ClipboardList size={22} />,
        color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
      },
    ],
    admin: [
      {
        title: "All Users",
        description: "Manage user roles",
        href: "/dashboard/admin/users",
        icon: <Users size={22} />,
        color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
      },
      {
        title: "All Properties",
        description: "Approve or reject properties",
        href: "/dashboard/admin/properties",
        icon: <Building2 size={22} />,
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
      },
      // {
      //   title: "Transactions",
      //   description: "View all payments",
      //   href: "/dashboard/admin/transactions",
      //   icon: <CreditCard size={22} />,
      //   color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
      // },
    ],
  };

  const links = quickLinks[role] || quickLinks.tenant;

  return (
    <div className="space-y-8 ">
      {/* Welcome Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {user?.name || "User"} 👋
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          You are logged in as{" "}
          <span className="font-medium text-indigo-600 dark:text-indigo-400 capitalize">
            {role}
          </span>
          . Here’s a quick overview of your dashboard.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="text-lg font-semibold ">
          Quick Access
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {links.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg hover:border-indigo-200 dark:hover:border-indigo-800 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
                {item.icon}
              </div>

              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {item.title}
              </h3>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {item.description}
              </p>

              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity">
                Go to page
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHomePage;