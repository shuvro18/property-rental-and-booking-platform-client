"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { authClient } from "../lib/auth-client";

const Navbar = () => {

    const { data: session } = authClient.useSession();
    const user = session?.user;
    console.log("this is user", user)
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">

                    {/* Logo + Name */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 md:w-10 md:h-10 bg-linear-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                            <span className="text-white font-bold text-lg md:text-xl">N</span>
                        </div>
                        <span className="text-xl md:text-2xl font-bold bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                            Nestora
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors relative group"
                        >
                            Home
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link
                            href="/properties"
                            className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors relative group"
                        >
                            All Properties
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </nav>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* When logged out */}

                        {!user && (<div className="flex items-center gap-3"><Link
                            href="/login"
                            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                        >
                            Login
                        </Link>
                            <Link
                                href="/register"
                                className="px-5 py-2.5 text-sm font-medium text-white bg-linear-to-r from-indigo-600 to-violet-600 rounded-lg hover:from-indigo-700 hover:to-violet-700 shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                Register
                            </Link>
                        </div>
                        )}


                        {/* When logged in (uncomment & use later) */}
                        {user && (
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-700">Hello, {user.name}</span>
                                <button onClick={async () => authClient.signOut()} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="px-4 pb-4 pt-2 space-y-1 bg-white border-t border-gray-100">
                    <Link
                        href="/"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/properties"
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                    >
                        All Properties
                    </Link>

                    {user ? (<div>
                        <button onClick={async () => authClient.signOut()} className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            Logout
                        </button>
                    </div>) : (
                        <div className="border-t border-gray-100 pt-3 mt-2 space-y-2">
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-3 rounded-lg text-sm font-medium text-center text-white bg-linear-to-r from-indigo-600 to-violet-600"
                            >
                                Register
                            </Link>
                        </div>

                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;