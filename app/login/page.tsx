"use client";
import { useEffect, useState } from 'react';
import {useRouter} from "next/navigation";
import {decodeJWT} from "@/app/lib/utils";
export default function Page() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800">Log in</h1>

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
                </div>

                <button
                    className="w-full px-4 py-2 text-white font-semibold bg-indigo-600 rounded-md shadow-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={async () => {
                        console.log({email, password})
                        if (!email || !password) {
                            console.log('Missing fields')
                            return
                        }
                        const tokensResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
                            method: 'POST',
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                email: email,
                                password: password,
                            })
                        })
                        const tokens = (await tokensResponse.json()).data
                        console.log({tokens})
                        localStorage.setItem('accessToken', tokens.accessToken)
                        const payload = decodeJWT(tokens.accessToken);
                        console.log({payload});
                        await router.push(`/user/${payload.uuid}`);
                    }}
                >
                    Log In
                </button>
            </div>
        </div>
    )
}
