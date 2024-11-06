"use client";
import { useEffect, useState } from 'react';
export default function Page() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800">Register</h1>

                <div className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Email</span>
                        <input
                            type="email"
                            title="Email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your email"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Password</span>
                        <input
                            type="password"
                            title="Password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-700">First Name</span>
                        <input
                            type="text"
                            title="First Name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your first name"
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </label>

                    <label className="block">
                        <span className="text-gray-700">Last Name</span>
                        <input
                            type="text"
                            title="Last Name"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter your last name"
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </label>
                </div>

                <button
                    className="w-full px-4 py-2 text-white font-semibold bg-indigo-600 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={async () => {
                        console.log({email, password, firstName, lastName});
                        if (!email || !password || !firstName || !lastName) {
                            console.log("Missing fields");
                            return;
                        }
                        const registerResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email,
                                password,
                                firstName,
                                lastName
                            })
                        });
                        const tokens = await registerResponse.json();
                        console.log({tokens});
                    }}
                >
                    Register
                </button>
            </div>
        </div>

    );
}
