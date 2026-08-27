import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { getHouses } from "../lib/data";
import PropertyCard from "./PropertyCard";
import { div } from "framer-motion/client";


const HomepageProperty = async () => {
    const properties = await getHouses();
    const findProperties = properties.filter(element => (element.status === "approved"))
    return (
        <div className="py-20 bg-gray-50 dark:bg-gray-950">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center my-10">

                    <div className="">
                        <p className="font-semibold text-6xl">Curated Residences</p>
                        <p className="">Explore our handpicked selection of premium properties.</p>
                    </div>
                    <Link className="flex items-center gap-2  rounded-sm hover:text-indigo-500 hover:scaleup-200 duration-200 transition-all" href={"/properties"}>
                        <p>show all</p>
                        <FaArrowRight className="text-sm" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {findProperties.slice(0, 6).map(property => (<div key={property._id}>
                        <PropertyCard property={property}></PropertyCard>
                    </div>))}
                </div>
            </div>
        </div>
    );
};

export default HomepageProperty;