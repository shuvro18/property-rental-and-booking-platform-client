import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";


const FeaturedSection = () => {
    const highlights = [
        "Verified & Trusted Properties",
        "24/7 Dedicated Customer Support",
        "Easy & Transparent Booking Process",
        "Best Price Guarantee in Market"
    ];

    return (
        <section className="py-20 px-4 md:px-8 bg-gray-50 dark:bg-gray-950 transition-colors">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Side: Images Grid with next/image */}
                <div className="relative grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
                                alt="Modern House"
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                className="object-cover hover:scale-105 transition-transform duration-500"
                                priority
                            />
                        </div>
                        <div className="relative h-40 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop"
                                alt="Luxury Interior"
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-8">
                        <div className="relative h-40 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=600&auto=format&fit=crop"
                                alt="Cozy Room"
                                fill
                                sizes="(max-width: 768px) 100vw, 300px"
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=800&auto=format&fit=crop"
                                alt="Dream Villa"
                                fill
                                sizes="(max-width: 768px) 100vw, 400px"
                                className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="space-y-6">
                    <span className="px-3.5 py-1.5 text-xs font-semibold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-full uppercase">
                        Why Choose Us
                    </span>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        We Help You Find Your Dream Home & Property
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                        Explore a wide range of verified properties tailored to fit your lifestyle and budget. Our platform ensures a seamless experience from search to final paperwork.
                    </p>

                    {/* Highlights List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {highlights.map((item, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <FiCheckCircle className="text-indigo-600 dark:text-indigo-400 shrink-0" size={20} />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                        <Link
                            href="/properties"
                            className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            Explore Properties
                            <FiArrowRight size={18} />
                        </Link>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default FeaturedSection;