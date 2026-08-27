import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Maximize, ArrowUpRight } from "lucide-react";

const PropertyCard = ({ property }) => {
    
  const {
    _id,
    title,
    location,
    rent,
    rentType,
    bedrooms,
    bathrooms,
    size,
    propertyType,
    images,
    status,
  } = property;
 

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-2xl transition-all duration-300">
      
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={images}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-60"></div>

        {/* Property Type */}
        <span className="absolute top-4 left-4 px-3 py-1.5 text-xs font-semibold tracking-wide bg-white/95 dark:bg-gray-900/90 text-gray-800 dark:text-gray-100 rounded-lg shadow-sm backdrop-blur-sm">
          {propertyType}
        </span>

        {/* Status */}
        {status === "approved" && (
          <span className="absolute top-4 right-4 px-3 py-1.5 text-xs font-semibold bg-emerald-500 text-white rounded-lg shadow-sm">
            Available
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-snug line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
          {title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 mt-2.5 text-sm text-gray-500 dark:text-gray-400">
          <MapPin size={15} className="text-indigo-500 shrink-0" />
          <span className="line-clamp-1">{location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-5 mt-5 text-sm text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1.5">
            <Bed size={16} className="text-gray-400" />
            <span>{bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath size={16} className="text-gray-400" />
            <span>{bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize size={16} className="text-gray-400" />
            <span>{size} sqft</span>
          </div>
        </div>

        {/* Divider + Price + Button */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-0.5">
              Starting from
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                ৳{rent?.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                /{rentType === "Monthly" ? "month" : rentType?.toLowerCase()}
              </span>
            </div>
          </div>

          <Link
            href={`/properties/${_id}`}
            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-white bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            Details
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;