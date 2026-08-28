"use client"

import { Heart } from 'lucide-react';
import React from 'react';
import { authClient } from '../lib/auth-client';
import { addToFavorite } from '../lib/action';
import { toast } from 'react-toastify';


const AddToFavorite = ({ property }) => {
    const propertyDetails = property
    
    const { data: session } = authClient.useSession()
    const user = session?.user;
    const userName = user?.name;
    const userId = user?.id

    const favoriteData = {
        userName,
        userId,
        propertyId: propertyDetails._id,
        title: propertyDetails.title,
        rent: propertyDetails.rent,
        date: new Date().toISOString()

    }
    const handleFavorite = async () => {
        try {
            const result = await addToFavorite(favoriteData);

            if (result?.message) {
                toast.warn(result.message)
            } else {

                toast.success(`${userName} You Made It Favorite`)
            }
        } catch (error) {
            toast.error(`${userName} Sorry You Can't Do It Now`)
            console.log("error adding favorite", error)
        }

    }

    return (
        <div>
            <button onClick={handleFavorite} className="w-full py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                <Heart size={18} />
                Add to Favorites
            </button>
        </div>
    );
};

export default AddToFavorite;