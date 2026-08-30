import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { getHouses } from "@/app/lib/data";
import MyPropertiesClient from "@/app/components/dashboard/owner/MyPropertiesClient";


const MyPropertiesPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  const userId = user?.id;

  // Fetch on the server
  const allHouses = await getHouses();
  const properties = allHouses.filter((item) => item.userId === userId);

  return <MyPropertiesClient properties={properties} />;
};

export default MyPropertiesPage;