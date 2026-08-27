import React from 'react';
import PropertyCard from '../components/PropertyCard';
import { getHouses } from '../lib/data';

const AllProperties = async () => {
    const properties = await getHouses();
    const findProperties = properties.filter(element =>(element.status === "approved"))
    // console.log(findProperties,"this is find")
    return (
        <div>
            <div className=" max-w-7xl mx-auto mt-30 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {findProperties.map((property) => (

                    <PropertyCard key={property._id} property={property}></PropertyCard>
                ))}
            </div>
        </div>
    );
};

export default AllProperties;