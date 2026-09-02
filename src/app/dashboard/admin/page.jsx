import AdminDashboardHome from '@/app/components/dashboard/admin/AdminOverVied';
import { auth } from '@/app/lib/auth';
import { getAdminDetails } from '@/app/lib/data';
import { headers } from 'next/headers';
import React from 'react';

const overView = async () => {

    const session = await auth.api.getSession({
        headers: await headers()
    })
    const userName = session.user.name

    const result = await getAdminDetails()
   

    const analytics = {
        totalEarnings: result?.totalEarn || 0,
        totalProperties: result?.totalHouses || 0,
        totalBookings: result?.totalBookings || 0,
        totalUser: result?.totalUser || 0,
        totalOwner: result?.totalOwner || 0,
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
    


    return (
        <AdminDashboardHome
            totalEarnings={analytics?.totalEarnings || 0}
            totalProperties={analytics?.totalProperties || 0}
            totalBookings={analytics?.totalBookings || 0}
            totalUser={analytics?.totalUser || 0}
            totalOwner={analytics?.totalOwner || 0}
            userName={userName}
            monthlyEarnings={analytics?.monthlyEarnings || []}

        />
    );
};

export default overView;