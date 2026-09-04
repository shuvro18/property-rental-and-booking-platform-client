"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  HomeIcon,
  Menu,
  X,
  CreditCard,
} from "lucide-react";

const DashboardSidebarClient = ({ user, role = "tenant" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
      {
        title: "Transactions",
        href: "/dashboard/admin/transactions",
        icon: <CreditCard size={18} />,
      },
      {
        title: "Profile",
        href: "/dashboard/admin/profile",
        icon: <User size={18} />,
      },
    ],
  };

  const mainNav = navMenu[role] || navMenu.tenant;

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="font-bold text-gray-900 dark:text-white capitalize">
            {role} Dashboard
          </span>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64
          bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800
          flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
        `}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all duration-200"
            >
              <HomeIcon size={18} />
              Back To Home
            </Link>

            {/* Close button - mobile only */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-xs px-4 mt-1 text-gray-500 dark:text-gray-400 capitalize">
            {role} Dashboard
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {mainNav.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${isActive(item.href)
                  ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
                }`}
            >
              <span
                className={
                  isActive(item.href)
                    ? "text-indigo-500"
                    : "text-gray-400 dark:text-gray-500"
                }
              >
                {item.icon}
              </span>
              {item.title}
            </Link>
          ))}
        </nav>

        {/* User Info */}
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
    </>
  );
};

export default DashboardSidebarClient;