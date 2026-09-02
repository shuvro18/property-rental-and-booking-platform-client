
import { headers } from "next/headers";

// your function
import { auth } from "@/app/lib/auth";
import OwnerDashboardHome from "@/app/components/dashboard/owner/OwnerDashboardHome";
import { getOwnerDetail } from "@/app/lib/data";

const OwnerDashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const ownerId = session?.user?.id;

  const ownerDetails = await getOwnerDetail(ownerId)

  // console.log(ownerId)


  // You should return something like this from backend:
  const analytics = {
    totalEarnings: ownerDetails.totalEarning,
    totalProperties: ownerDetails.totalHouse,
    totalBookings: ownerDetails.totalBookings,
    monthlyEarnings: [
      { month: "Jan", earnings: 10000 },
      { month: "Feb", earnings: 15000 },
      { month: "Mar", earnings: 22000 },
      { month: "Apr", earnings: 18000 },
      { month: "May", earnings: 25000 },
      { month: "Jun", earnings: 30000 },
      { month: "Jul", earnings: 28000 },
      { month: "Aug", earnings: 35000 },
      { month: "Sep", earnings: 32000 },
      { month: "Oct", earnings: 40000 },
      { month: "Nov", earnings: 45000 },
      { month: "Dec", earnings: 50000 }

    ]
  }

  //   const analytics = await getOwnerAnalytics(ownerId);

  return (
    <OwnerDashboardHome
      totalEarnings={analytics?.totalEarnings || 0}
      totalProperties={analytics?.totalProperties || 0}
      totalBookings={analytics?.totalBookings || 0}
      monthlyEarnings={analytics?.monthlyEarnings || []}
    />
  );
};

export default OwnerDashboardPage;