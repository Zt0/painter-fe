"use client"
import {use, useEffect, useState} from "react";

export default function Page({ params }) {
    const {id} = use(params);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setUser(data); // Set the fetched data to post state
            } catch (error) {
                console.error("Failed to fetch post:", error);
            }
        }

        getUser();
    }, [id]);
    if (!user) {
        return <p>Loading...</p>;
    }

    const firstName = "Azat";
    const lastName = "Antonyan";
    const age = 23;
    const occupation = "Software Engineer";
    console.log({user})
    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-4">About Me</h1>

            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <div key={'533'} className="mb-4">
                    <h3 className="text-lg font-bold">{user.data.task.title}</h3>
                    <p>{user.data.task.description}</p>
                    <hr/>
                </div>
                <div className="text-lg mb-2">
                    <strong>First Name:</strong> {firstName}
                </div>
                <div className="text-lg mb-2">
                    <strong>Last Name:</strong> {lastName}
                </div>
                <div className="text-lg mb-2">
                    <strong>Age:</strong> {age}
                </div>
                <div className="text-lg mb-2">
                    <strong>Occupation:</strong> {occupation}
                </div>
            </div>
        </div>
    );
}
