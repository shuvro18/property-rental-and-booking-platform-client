import React from 'react';
import PropertyCard from '../components/PropertyCard';
import { getHouses } from '../lib/data';

const AllProperties = async () => {
    const properties = await getHouses();
    const findProperties = properties.filter(element =>(element.status === "approved"))
    console.log(findProperties,"this is find")
    return (
        <div>
            <div className=" container mx-auto mt-30 gap-4 grid grid-cols-4">
                {findProperties.map((property) => (

                    <PropertyCard key={property._id} property={property}></PropertyCard>
                ))}
            </div>
        </div>
    );
};

export default AllProperties;