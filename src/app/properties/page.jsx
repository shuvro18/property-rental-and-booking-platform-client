import React from 'react';
import PropertyCard from '../components/PropertyCard';
import { getHouses } from '../lib/data';

const AllProperties = async ({ searchParams }) => {
    const searchQuery = await searchParams;
    const page = searchQuery.page || 1;
    const limit = searchQuery.limit || 10;
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/total-houses?page=${page}&limit=${limit}`)
    const findProperties = await res.json();
    console.log(findProperties)
    // console.log(findProperties,"this is find")
    return (
        <div>
            <div className=" max-w-7xl mx-auto mt-30 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {findProperties.result.map((property) => (

                    <PropertyCard key={property._id} property={property}></PropertyCard>
                ))}
            </div>
        </div>
    );
};

export default AllProperties;