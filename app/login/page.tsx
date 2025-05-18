"use client";
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/nav-bar"; // Assuming Navbar is reused
import { decodeJWT } from "@/app/lib/utils";

export default function Page() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow p-6 md:p-12">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-4">
                        Welcome Back to Nkarich
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Please log in to access your account
                    </p>
                    <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-green-300 mx-auto rounded-full"></div>
                </div>

                {/* Login Form */}
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
                    </div>

                    <button
    className="w-full px-4 py-2 text-white font-semibold bg-gradient-to-r from-green-600 to-green-400 rounded-md shadow-md hover:shadow-xl hover:from-green-500 hover:to-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    onClick={async () => {
                            if (!email || !password) {
                                console.log("Missing fields");
                                return;
                            }
                            try {
                                const tokensResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
                                    method: 'POST',
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        email: email,
                                        password: password,
                                    })
                                });
                                const tokens = (await tokensResponse.json()).data;
                                console.log({ tokens });
                                localStorage.setItem('accessToken', tokens.accessToken);
                                console.log(111, localStorage.getItem("accessToken"))
                                const payload = decodeJWT(tokens.accessToken);
                                console.log({ payload });
                                console.log(222, localStorage.getItem("accessToken"))
                                await router.push(`/user/${payload.uuid}`);
                            } catch (err) {
                                setError('Login failed, please check your credentials.');
                                console.log(err);
                            }
                        }}
                    >
                        Log In
                    </button>

                    {error && (
                        <div className="mt-4 text-red-600 text-center">
                            <p>{error}</p>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white shadow-md mt-12">
                <div className="max-w-7xl mx-auto py-6 px-4 text-center text-gray-600">
                    <p>© 2024 Nkarich. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
