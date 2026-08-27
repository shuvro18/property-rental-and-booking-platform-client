import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

const locations = [
  {
    name: "Gulshan",
    properties: 48,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
  },
  {
    name: "Banani",
    properties: 36,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
  },
  {
    name: "Dhanmondi",
    properties: 29,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
  },
  {
    name: "Uttara",
    properties: 41,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
  },
];

const TopLocations = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Explore Top Locations
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the most popular areas where people love to live. Find your next home in these prime locations.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location) => (
            <Link
              key={location.name}
              href={`/properties?location=${location.name}`}
              className="group relative block h-72 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Background Image */}
              <Image
                src={location.image}
                alt={location.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-2 text-white mb-1">
                  <MapPin size={16} className="text-indigo-400" />
                  <h3 className="text-xl font-semibold">{location.name}</h3>
                </div>
                <p className="text-sm text-gray-300">
                  {location.properties} Properties Available
                </p>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight size={18} className="text-white" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopLocations;