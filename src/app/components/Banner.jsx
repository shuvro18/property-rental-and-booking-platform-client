"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FiSearch, FiMapPin, FiHome, FiDollarSign } from "react-icons/fi";

const Banner = () => {
  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
        height={1000}
        width={1000}
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop"
          alt="Luxury home"
          className="w-full h-full object-cover"
        />
        {/* Overlay - works in both themes */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/70 dark:from-black/70 dark:via-black/60 dark:to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-10 md:mb-14">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight"
          >
            Find Your Perfect
            <span className="block mt-2 bg-linear-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Place to Call Home
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="mt-5 md:mt-6 text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
          >
            Discover thousands of verified rental properties. Book instantly, 
            pay securely, and move in with confidence.
          </motion.p>
        </div>

        {/* Search Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 md:p-5 border border-gray-100 dark:border-gray-800">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
              
              {/* Location */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">
                  Location
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                  <input
                    type="text"
                    placeholder="City or area"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
                  />
                </div>
              </div>

              {/* Property Type */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">
                  Property Type
                </label>
                <div className="relative">
                  <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                  <select
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 appearance-none transition-all"
                  >
                    <option value="">Any Type</option>
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="condo">Condo</option>
                    <option value="studio">Studio</option>
                    <option value="villa">Villa</option>
                  </select>
                </div>
              </div>

              {/* Min Price */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">
                  Min Price
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
                  />
                </div>
              </div>

              {/* Max Price */}
              <div className="relative">
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1.5 ml-1">
                  Max Price
                </label>
                <div className="relative">
                  <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={18} />
                  <input
                    type="number"
                    placeholder="Any"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="button"
                  className="w-full h-12.5 flex items-center justify-center gap-2 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <FiSearch size={20} />
                  <span>Search</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;