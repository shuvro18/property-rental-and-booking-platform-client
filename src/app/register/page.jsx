"use client"

import * as React from "react"
import { Eye, EyeOff, UserPlus } from "lucide-react"
import { useState } from "react";
import Link from "next/link";

import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Description, FieldError, Input, TextField } from "@heroui/react";
import { authClient } from "../lib/auth-client";
import { uploadImage } from "../lib/image/imageupload";
import ThemeToggle from "../components/ThemeToggle";






const RegisterPage = () => {

    const router = useRouter();



    //login with google 
    const handleLogin = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };

    // password error
    const [passwordError, setPasswordError] = useState("")

    // password eye effect
    const [showPassword, setShowPassword] = useState(true)
    const [showConformPassword, setShowConformPassword] = useState(true)


    const handleRegister = async (e) => {
        e.preventDefault();
        setPasswordError("");
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const image = await uploadImage(user.image);



        const { name, email, password, } = user

        if (user.password !== user.confirmPassword) {
            setPasswordError("Passwords do not match!")
            return;
        }

        try {
            const { data, error } = await authClient.signUp.email({
                name: name, // required
                email: email, // required
                password: password, // required
                image: image,
                type: "tenant",
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message)
                return
            } else {
                toast.success("register compleat " + name);
                router.push("/")
            }
            console.log("register data", data)
        }
        catch (err) {
            console.log(err)
        }




    };



    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50/50 dark:bg-gray-950 px-4 py-12 pt-24 sm:px-6 lg:px-8 transition-colors">
            {/* মূল কার্ড কন্টেইনার */}
            <div className="w-full max-w-md space-y-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-xl relative transition-colors">

                {/* Theme Toggle Quick Access */}
                <div className="absolute top-6 right-6">
                    <ThemeToggle />
                </div>

                {/* হেডার */}
                <div className="text-center pt-2">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Create Account
                    </h2>
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                        Join Nestora to manage your house rent
                    </p>
                </div>

                {/* ফর্ম */}
                <form className="mt-6 space-y-4" onSubmit={handleRegister}>

                    {/* নাম ইনপুট */}
                    <div className="space-y-1">
                        <label htmlFor="name" className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            Full Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            placeholder="Shuvro Biswas"
                            className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-colors"
                        />
                    </div>

                    {/* image er jonno  */}
                    <div className="space-y-1">
                        <label htmlFor="image" className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            Profile Image
                        </label>
                        <input
                            id="image"
                            name="image"
                            type="file"
                            required
                            className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 dark:file:bg-indigo-950 dark:file:text-indigo-300 hover:file:bg-indigo-100 cursor-pointer focus:outline-none transition-colors"
                        />
                    </div>

                    {/* ইমেইল ইনপুট */}
                    <div className="space-y-1">
                        <label htmlFor="email" className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            placeholder="user@example.com"
                            className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-colors"
                        />
                    </div>

                    {/* পাসওয়ার্ড ইনপুট */}
                    <div className="space-y-1">
                        <label htmlFor="password" className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            Password
                        </label>
                        <div className="relative flex items-center">
                            <TextField
                                isRequired
                                className="block w-full"
                                minLength={8}
                                name="password"
                                type={showPassword ? "password" : "text"}
                                validate={(value) => {
                                    if (value.length < 8) {
                                        return "Password must be at least 8 characters";
                                    }
                                    if (!/[A-Z]/.test(value)) {
                                        return "Password must contain at least one uppercase letter";
                                    }
                                    if (!/[0-9]/.test(value)) {
                                        return "Password must contain at least one number";
                                    }
                                    return null;
                                }}
                            >
                                <Input className="block w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-3 pr-10 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none transition-colors focus-visible:ring-0" placeholder="Enter your password" />
                                <Description className="text-gray-400 dark:text-gray-500 text-xs mt-1">Must be at least 8 characters with 1 uppercase and 1 number</Description>
                                <FieldError className="text-xs text-red-500 mt-1" />
                            </TextField>

                            <button
                                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none cursor-pointer"
                                type="button"
                                onClick={() => { setShowPassword(!showPassword) }}
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    {/* কনফার্ম পাসওয়ার্ড ইনপুট */}
                    <div className="space-y-1">
                        <label htmlFor="confirmPassword" className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            Confirm Password
                        </label>
                        <div className="relative flex items-center">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConformPassword ? "password" : "text"}
                                required
                                placeholder="••••••••"
                                className={`block w-full rounded-xl border bg-gray-50 dark:bg-gray-800 pl-3 pr-10 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-colors ${passwordError ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400'}`}
                            />
                            <button
                                className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none cursor-pointer"
                                type="button"
                                onClick={() => { setShowConformPassword(!showConformPassword) }}
                            >
                                {showConformPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {passwordError && (
                            <p className="text-xs font-medium text-red-500 mt-1 text-left">
                                {passwordError}
                            </p>
                        )}
                    </div>

                    {/* রেজিস্টার বাটন */}
                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 px-4 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg focus:outline-none transition-all mt-6 cursor-pointer"
                    >
                        Register
                        <UserPlus className="h-4 w-4" />
                    </button>
                </form>

                {/* OR ডিভাইডার */}
                <div className="relative flex items-center py-1">
                    <div className="grow border-t border-gray-200 dark:border-gray-800"></div>
                    <span className="shrink mx-4 text-xs font-medium text-gray-400 dark:text-gray-500">OR</span>
                    <div className="grow border-t border-gray-200 dark:border-gray-800"></div>
                </div>

                {/* গুগল সাইন-আপ বাটন */}
                <button
                    onClick={handleLogin}
                    type="button"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors cursor-pointer"
                >
                    {/* গুগল SVG লোগো */}
                    <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                        <g transform="matrix(1, 0, 0, 1, 0, 0)">
                            <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.6h3.29c1.92,-1.78 3.02,-4.4 3.02,-7.4C21.65,11.87 21.54,11.46 21.35,11.1Z" fill="#4285F4" />
                            <path d="M12,20.75c2.43,0 4.47,-0.8 5.96,-2.18l-3.29,-2.6c-0.91,0.61 -2.08,0.98 -2.67,0.98 -2.56,0 -4.73,-1.73 -5.51,-4.05H3.1v2.68C4.59,18.52 8.04,20.75 12,20.75Z" fill="#34A853" />
                            <path d="M6.49,12.9a5.19,5.19 0 0,1 0,-3.2V7.02H3.1a8.68,8.68 0 0,0 0,8.56l3.39,-2.68Z" fill="#FBBC05" />
                            <path d="M12,6.65c1.32,0 2.51,0.45 3.44,1.35l2.58,-2.58C16.46,4.02 14.42,3.25 12,3.25c-3.96,0 -7.41,2.23 -8.9,5.17l3.39,2.68C7.27,8.38 9.44,6.65 12,6.65Z" fill="#EA4335" />
                        </g>
                    </svg>
                    Sign up with Google
                </button>

                {/* লগইন লিংক */}
                <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                        Login
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default RegisterPage;