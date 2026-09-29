import DashboardAsidebar from "../components/dashboard/DashboardAsideBar";

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <DashboardAsidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Page content */}
          <main className="flex-1 overflow-auto p-4 md:p-8 pt-16 md:pt-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
