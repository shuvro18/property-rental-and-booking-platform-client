"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch, FiMapPin, FiHome, FiDollarSign, FiX, FiFilter } from "react-icons/fi";

const propertyTypes = ["Apartment", "House", "Condo", "Studio", "Villa", "Duplex"];

const PropertyFilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("propertyType") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // We use key on the container/form based on searchParams.toString() to naturally reset state when URL changes

  const handleFilterSubmit = (e) => {
    if (e) e.preventDefault();
    const params = new URLSearchParams();

    if (search.trim()) params.set("search", search.trim());
    if (location.trim()) params.set("location", location.trim());
    if (propertyType && propertyType.toLowerCase() !== "any") {
      params.set("propertyType", propertyType);
    }
    if (minPrice && Number(minPrice) > 0) params.set("minPrice", minPrice);
    if (maxPrice && Number(maxPrice) > 0) params.set("maxPrice", maxPrice);

    // Reset to page 1 on new search
    params.set("page", "1");

    router.push(`/properties?${params.toString()}`);
  };

  const handleClearFilters = () => {
    setSearch("");
    setLocation("");
    setPropertyType("");
    setMinPrice("");
    setMaxPrice("");
    router.push("/properties");
  };

  const removeFilter = (key) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    params.set("page", "1");
    router.push(`/properties?${params.toString()}`);
  };

  const hasActiveFilters = Boolean(
    searchParams.get("search") ||
    searchParams.get("location") ||
    searchParams.get("propertyType") ||
    searchParams.get("minPrice") ||
    searchParams.get("maxPrice")
  );

  return (
    <div className="w-full bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800 p-4 md:p-6 mb-8">
      <form onSubmit={handleFilterSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
          
          {/* Keyword Search */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 ml-1">
              Search
            </label>
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Title or keywords"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Location */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 ml-1">
              Location
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Area (e.g. Baridhara, Gulshan)"
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>

          {/* Property Type */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 ml-1">
              Property Type
            </label>
            <div className="relative">
              <FiHome className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none transition-all cursor-pointer"
              >
                <option value="">All Types</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 ml-1">
              Price Range (৳)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <FiDollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="Min"
                  className="w-full pl-7 pr-2 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
              <div className="relative">
                <FiDollarSign className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="Max"
                  className="w-full pl-7 pr-2 py-2.5 text-sm rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="flex-1 h-10.5 flex items-center justify-center gap-1.5 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium text-sm rounded-xl shadow hover:shadow-md transition-all cursor-pointer"
            >
              <FiFilter size={15} />
              <span>Filter</span>
            </button>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="h-10.5 px-3 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all"
                title="Clear all filters"
              >
                <FiX size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Active Filters Pill List */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Active Filters:
            </span>
            {searchParams.get("search") && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Keyword: {searchParams.get("search")}
                <button type="button" onClick={() => removeFilter("search")}>
                  <FiX size={12} className="cursor-pointer hover:text-indigo-900" />
                </button>
              </span>
            )}
            {searchParams.get("location") && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                📍 {searchParams.get("location")}
                <button type="button" onClick={() => removeFilter("location")}>
                  <FiX size={12} className="cursor-pointer hover:text-indigo-900" />
                </button>
              </span>
            )}
            {searchParams.get("propertyType") && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                🏠 {searchParams.get("propertyType")}
                <button type="button" onClick={() => removeFilter("propertyType")}>
                  <FiX size={12} className="cursor-pointer hover:text-indigo-900" />
                </button>
              </span>
            )}
            {searchParams.get("minPrice") && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Min: ৳{Number(searchParams.get("minPrice")).toLocaleString()}
                <button type="button" onClick={() => removeFilter("minPrice")}>
                  <FiX size={12} className="cursor-pointer hover:text-indigo-900" />
                </button>
              </span>
            )}
            {searchParams.get("maxPrice") && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                Max: ৳{Number(searchParams.get("maxPrice")).toLocaleString()}
                <button type="button" onClick={() => removeFilter("maxPrice")}>
                  <FiX size={12} className="cursor-pointer hover:text-indigo-900" />
                </button>
              </span>
            )}
            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline ml-1 font-medium"
            >
              Reset all
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default PropertyFilterBar;
