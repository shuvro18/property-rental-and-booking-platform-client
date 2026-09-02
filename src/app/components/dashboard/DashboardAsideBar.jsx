
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import DashboardSidebarClient from "./DashboardSidebarClient";


const DashboardSidebar = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const role = user?.type || "tenant";

  return <DashboardSidebarClient user={user} role={role} />;
};

export default DashboardSidebar;