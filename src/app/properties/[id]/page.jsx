import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Bed,
    Bath,
    Maximize,
    Home,
    CheckCircle2,
    ArrowLeft,
    Heart,
    Share2
} from "lucide-react";
import { getSingleHouse } from "@/app/lib/data";


const propertyDetailPage = async ({ params }) => {


    const { id } = await params;

    const property = await getSingleHouse(id)
   
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 mt-20 pb-20">

            {/* Back Button */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
                <Link
                    href="/properties"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    <ArrowLeft size={18} />
                    Back to Properties
                </Link>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Side - Images + Details */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Main Image */}
                        <div className="relative h-100 md:h-125 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src={property.images}
                                alt={property.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, 66vw"
                            />

                            {/* Badges */}
                            <div className="absolute top-5 left-5 flex gap-3">
                                <span className="px-3 py-1.5 text-xs font-semibold bg-white/95 dark:bg-gray-900/90 rounded-lg shadow-sm">
                                    {property.propertyType}
                                </span>
                                {property.status === "approved" && (
                                    <span className="px-3 py-1.5 text-xs font-semibold bg-emerald-500 text-white rounded-lg shadow-sm">
                                        Available
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Title + Location */}
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                                {property.title}
                            </h1>
                            <div className="flex items-center gap-2 mt-3 text-gray-600 dark:text-gray-400">
                                <MapPin size={18} className="text-indigo-500" />
                                <span className="text-lg">{property.location}</span>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 text-center">
                                <Bed className="mx-auto text-indigo-500 mb-2" size={24} />
                                <p className="text-sm text-gray-500 dark:text-gray-400">Bedrooms</p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">{property.bedrooms}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 text-center">
                                <Bath className="mx-auto text-indigo-500 mb-2" size={24} />
                                <p className="text-sm text-gray-500 dark:text-gray-400">Bathrooms</p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">{property.bathrooms}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 text-center">
                                <Maximize className="mx-auto text-indigo-500 mb-2" size={24} />
                                <p className="text-sm text-gray-500 dark:text-gray-400">Size</p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">{property.size} sqft</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-100 dark:border-gray-800 text-center">
                                <Home className="mx-auto text-indigo-500 mb-2" size={24} />
                                <p className="text-sm text-gray-500 dark:text-gray-400">Type</p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">{property.propertyType}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                Description
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                {property.description}
                            </p>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">
                                Amenities
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {property.amenities?.map((item, index) => (
                                    <div key={index} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                                        <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Extra Features */}
                        {property.extraFeatures?.length > 0 && (
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-5">
                                    Extra Features
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {property.extraFeatures.map((feature, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1.5 text-sm bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Side - Booking Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg p-6 space-y-6">

                            {/* Price */}
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Rental Price</p>
                                <div className="flex items-baseline gap-1 mt-1">
                                    <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                                        ৳{property.rent?.toLocaleString()}
                                    </span>
                                    <span className="text-gray-500 dark:text-gray-400">
                                        /{property.rentType === "Monthly" ? "month" : property.rentType?.toLowerCase()}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button className="w-full py-3.5 text-sm font-semibold text-white bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md transition-all duration-300">
                                    Book Now
                                </button>

                                <button className="w-full py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                                    <Heart size={18} />
                                    Add to Favorites
                                </button>

                                <button className="w-full py-3.5 text-sm font-semibold text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 flex items-center justify-center gap-2">
                                    <Share2 size={18} />
                                    Share Property
                                </button>
                            </div>

                            {/* Owner Info */}
                            <div className="pt-5 border-t border-gray-100 dark:border-gray-800">
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
                                    Property Owner
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-semibold text-lg">
                                        {property.owner?.name?.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {property.owner?.name}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {property.owner?.email}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default propertyDetailPage;