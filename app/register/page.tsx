"use client";
import { useState } from 'react';
import axiosInstance from "@/app/lib/axios-instance";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/nav-bar"; // Assuming Navbar is reused

export default function Page() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleRegister = async () => {
        if (!email || !password || !firstName || !lastName) {
            alert("All fields are required.");
            return;
        }
        setLoading(true);
        try {
            const response = await axiosInstance.post(`/users`, { email, password, firstName, lastName });
            router.push('/login');
        } catch (err) {
            console.error(err);
            alert("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">

            <main className="flex-grow p-6 md:p-12">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-4">
                        Create Your Account
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Join the Nkarich community and discover amazing content.
                    </p>
                    <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-green-300 mx-auto rounded-full"></div>
                </div>

                {/* Registration Form */}
                <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md space-y-6">

                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-gray-700">Email</span>
                            <input
                                type="email"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your email"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Password</span>
                            <input
                                type="password"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your password"
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-700">First Name</span>
                            <input
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your first name"
                                onChange={(event) => setFirstName(event.target.value)}
                            />
                        </label>

                        <label className="block">
                            <span className="text-gray-700">Last Name</span>
                            <input
                                type="text"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Enter your last name"
                                onChange={(event) => setLastName(event.target.value)}
                            />
                        </label>
                    </div>

                    <button
                        className="w-full px-4 py-2 text-white font-semibold bg-indigo-600 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleRegister}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </div>
            </main>
        </div>
    );
}
