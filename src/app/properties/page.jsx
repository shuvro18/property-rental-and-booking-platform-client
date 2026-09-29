import React, { Suspense } from "react";
import PropertyCard from "../components/PropertyCard";
import { PaginationBasic } from "../components/Pagination";
import PropertyFilterBar from "../components/PropertyFilterBar";
import { FiHome, FiRotateCcw } from "react-icons/fi";
import Link from "next/link";

const AllProperties = async ({ searchParams }) => {
  const searchQuery = (await searchParams) || {};
  const page = searchQuery.page || 1;
  const limit = searchQuery.limit || 9;
  const location = searchQuery.location || "";
  const propertyType = searchQuery.propertyType || "";
  const minPrice = searchQuery.minPrice || "";
  const maxPrice = searchQuery.maxPrice || "";
  const search = searchQuery.search || "";

  // Construct query string to pass to backend API
  const params = new URLSearchParams();
  params.set("page", page);
  params.set("limit", limit);
  if (location) params.set("location", location);
  if (propertyType) params.set("propertyType", propertyType);
  if (minPrice) params.set("minPrice", minPrice);
  if (maxPrice) params.set("maxPrice", maxPrice);
  if (search) params.set("search", search);

  let findProperties = { result: [], totalPage: 1, totalData: 0 };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/total-houses?${params.toString()}`,
      { cache: "no-store" }
    );
    if (res.ok) {
      findProperties = await res.json();
    }
  } catch (error) {
    console.error("Error fetching properties:", error);
  }

  const properties = findProperties.result || [];
  const totalPage = findProperties.totalPage || 1;
  const totalData = findProperties.totalData ?? properties.length;

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Count */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Available Properties
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {totalData > 0
              ? `Found ${totalData} ${totalData === 1 ? "property" : "properties"} matching your criteria`
              : "Discover properties for rent across top locations"}
          </p>
        </div>

        {/* Filter Bar */}
        <Suspense fallback={<div className="h-24 bg-white dark:bg-gray-900 rounded-2xl animate-pulse mb-8" />}>
          <PropertyFilterBar />
        </Suspense>

        {/* Properties Grid or Empty State */}
        {properties.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>

            {/* Pagination with preserved query params */}
            <div className="flex items-center justify-center my-10">
              <PaginationBasic
                totalPage={totalPage}
                currentPage={page}
                queryParams={searchQuery}
              />
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-12 text-center max-w-lg mx-auto my-12 shadow-sm">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FiHome size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              No Properties Found
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              We couldn’t find any verified properties matching your current search or filter criteria. Try adjusting the price range, location, or type.
            </p>
            <Link
              href="/properties"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium text-sm rounded-xl shadow transition-all duration-300"
            >
              <FiRotateCcw size={16} />
              <span>Reset All Filters</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProperties;