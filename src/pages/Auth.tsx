import React from "react";
import auth_cart from '../assets/auth_cart.png'
export default function Auth() {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="flex min-h-screen bg-[#f7e8e6]">
                {/* Left Section with Image */}
                <div className="hidden md:flex items-center justify-center w-1/2 bg-white">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-800 flex items-center w-3/4 mx-auto gap-2">
                            <span className="text-brown-700">🛒 NEOMART</span>
                        </h1>
                        <img
                            src={auth_cart}
                            alt="Shopping Illustration"
                            className="w-3/4 mx-auto mt-6 rounded-2xl"
                        />
                    </div>
                </div>

                {/* Right Section with Form */}
                <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                    <div className="bg-[#f7e8e6] rounded-lg p-10 w-full max-w-md shadow-lg">
                        <h2 className="text-3xl font-bold text-gray-800 text-center">Happy Shopping</h2>
                        <p className="text-lg text-center text-gray-600 mt-2 font-semibold">CREATE NEW ACCOUNT</p>

                        <form className="mt-6">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full p-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mt-2"
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full p-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mt-4"
                            />
                            <div className="flex gap-2 mt-4">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-1/2 p-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-1/2 p-3 rounded-3xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full mt-6 bg-white text-pink-500 font-semibold py-3 rounded-3xl shadow-md hover:bg-pink-500 hover:text-white transition"
                            >
                                Sign up
                            </button>
                            <div className="flex items-center justify-center my-4">
                                <span className="border-b w-1/4"></span>
                                <span className="mx-2 text-gray-500 text-sm">Or</span>
                                <span className="border-b w-1/4"></span>
                            </div>
                            <button
                                className="w-full bg-pink-500 text-white font-semibold py-3 rounded-3xl shadow-md hover:bg-pink-600 transition"
                            >
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}