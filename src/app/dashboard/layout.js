import DashboardAsidebar from "../components/dashboard/DashboardAsideBar";


export default function RootLayout({ children }) {
  return (
  
      <body className="min-h-screen bg-gray-100 text-gray-900 antialiased">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <DashboardAsidebar></DashboardAsidebar>

          {/* Main content area */}
          <div className="flex-1 flex flex-col">

            {/* Page content */}
            <main className="flex-1 p-6 overflow-auto">
                {children}
                </main>
          </div>
        </div>
      </body>
    
  );
}
