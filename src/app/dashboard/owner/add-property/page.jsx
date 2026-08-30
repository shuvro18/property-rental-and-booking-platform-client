
"use client";

import { addProperty } from "@/app/lib/action";
import { authClient } from "@/app/lib/auth-client";
import { uploadImage } from "@/app/lib/image/imageupload";
import { useState } from "react";
import { toast } from "react-toastify";


const AddPropertyPage = () => {
    const { data: session } = authClient.useSession();
    const user = session?.user;
    // console.log(user)

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        propertyType: "",
        rent: "",
        rentType: "Monthly",
        bedrooms: "",
        bathrooms: "",
        size: "",
        amenities: [],
        images: "",
        extraFeatures: "",
        status: "pending",
        
    });

    // const [amenityInput, setAmenityInput] = useState("");
    // const [imagePreview, setImagePreview] = useState("");

    const propertyTypes = ["Apartment", "House", "Condo", "Studio", "Villa"];
    const rentTypes = ["Monthly", "Weekly", "Daily"];
    const commonAmenities = [
        "WiFi",
        "Air Conditioning",
        "Parking",
        "Gym",
        "Security",
        "Elevator",
        "Generator",
        "Swimming Pool",
        "Garden",
        "Furnished",
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const image = await uploadImage(file)
        setFormData(prev => ({ ...prev, images: image }))
        // console.log(image)
    }

    const handleAmenityToggle = (amenity) => {
        setFormData((prev) => {
            const exists = prev.amenities.includes(amenity);
            return {
                ...prev,
                amenities: exists
                    ? prev.amenities.filter((item) => item !== amenity)
                    : [...prev.amenities, amenity],
            };
        });
    };

    //   const addCustomAmenity = () => {
    //     if (amenityInput.trim() && !formData.amenities.includes(amenityInput.trim())) {
    //       setFormData((prev) => ({
    //         ...prev,
    //         amenities: [...prev.amenities, amenityInput.trim()],
    //       }));
    //       setAmenityInput("");
    //     }
    //   };

    // const handleImageChange = (e) => {
    //     const value = e.target.value;
    //     setFormData((prev) => ({ ...prev, images: value }));
    //     setImagePreview(value);
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const finalData = {
            ...formData,
            owner: {
            name:user?.name,
            email: user?.email,                       
        },
        userId: user?.id,

        }

        const add = await addProperty(finalData)
        toast.success("property added successfully")

       
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Add New Property
                </h1>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                    Fill in the details below to list your property
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Basic Information */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Basic Information
                    </h2>

                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Property Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder=" Modern Downtown Apartment with City View"
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Write a detailed description of your property..."
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Location *
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder=" Gulshan 2, Dhaka"
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    {/* Property Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Property Type *
                        </label>
                        <select
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        >
                            <option value="">Select Type</option>
                            {propertyTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Pricing & Details */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Pricing & Details
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {/* Rent */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Rent Price (৳) *
                            </label>
                            <input
                                type="number"
                                name="rent"
                                value={formData.rent}
                                onChange={handleChange}
                                placeholder=" 45000"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>

                        {/* Rent Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Rent Type *
                            </label>
                            <select
                                name="rentType"
                                value={formData.rentType}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            >
                                {rentTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Bedrooms */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Bedrooms *
                            </label>
                            <input
                                type="number"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handleChange}
                                placeholder=" 2"
                                required
                                min="0"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>

                        {/* Bathrooms */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Bathrooms *
                            </label>
                            <input
                                type="number"
                                name="bathrooms"
                                value={formData.bathrooms}
                                onChange={handleChange}
                                placeholder=" 2"
                                required
                                min="0"
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>

                        {/* Size */}
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                                Property Size (sqft) *
                            </label>
                            <input
                                type="number"
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                placeholder=" 1250"
                                required
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                            />
                        </div>
                    </div>
                </div>

                {/* Amenities */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Amenities
                    </h2>

                    <div className="flex flex-wrap gap-2">
                        {commonAmenities.map((amenity) => (
                            <button
                                key={amenity}
                                type="button"
                                onClick={() => handleAmenityToggle(amenity)}
                                className={`px-3 py-1.5 text-sm rounded-lg border transition-all ${formData.amenities.includes(amenity)
                                    ? "bg-indigo-600 text-white border-indigo-600"
                                    : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-400"
                                    }`}
                            >
                                {amenity}
                            </button>
                        ))}
                    </div>

                    {/* Custom Amenity */}
                    {/* <div className="flex gap-2">
                        <input
                            type="text"
                            value={amenityInput}
                            onChange={(e) => setAmenityInput(e.target.value)}
                            placeholder="Add custom amenity"
                            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                        <button
                            type="button"
                            onClick={addCustomAmenity}
                            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition"
                        >
                            <Plus size={18} />
                        </button>
                    </div> */}
                </div>

                {/* Image + Extra Features */}
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-5">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Image & Extra Features
                    </h2>

                    {/* Image URL */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Image URL *
                        </label>
                        <input
                            type="file"
                            name="images"

                            onChange={handleImageChange}
                            placeholder="https://i.ibb.co/your-image.jpg"
                            required
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>

                    {/* Image Preview */}
                    {/* {imagePreview && (
                        <div className="relative w-full h-56 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img
                                width={100}
                                height={100}
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )} */}

                    {/* Extra Features */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Extra Features
                        </label>
                        <input
                            type="text"
                            name="extraFeatures"
                            value={formData.extraFeatures}
                            onChange={handleChange}
                            placeholder=" Balcony, Lake View, Maid Room (comma separated)"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                    </div>
                </div>

                {/* Status Note */}
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4">
                    <p className="text-sm text-amber-700 dark:text-amber-300">
                        <strong>Note:</strong> Your property will be submitted with status{" "}
                        <span className="font-semibold">Pending</span>. An admin will review and approve it.
                    </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        className="px-6 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-8 py-2.5 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium shadow-md hover:shadow-lg transition-all"
                    >
                        Submit Property
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPropertyPage;