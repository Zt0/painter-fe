"use client"
import {useEffect, useState} from "react";
import axiosInstance from "@/app/lib/axios-instance";

interface IUser {
    firstName: string;
    lastName: string;
}

export default function Page() {
    const [user, setUser] = useState<IUser | null>(null);
    useEffect(() => {
        async function getUser() {
            try {
                const response = await axiosInstance.get(`/users`)

                const data = await response.data;
                console.log({data: data.user}, 2)
                setUser(data.user); // Set the fetched data to post state
            } catch (error) {
                console.error("Failed to fetch post:", error);
            }
        }

        getUser();
    }, []);
    if (!user) {
        return <p>Loading...</p>;
    }

    console.log({user: user})
    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-4">Profile</h1>

            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                <div key={'533'} className="mb-4">
                    <h3 className="text-lg font-bold">{user.firstName || "no first name"}</h3>
                    <p>{user.lastName || "no last name"}</p>
                    <p>age: 23</p>
                    <p>painter</p>
                    <hr/>
                </div>
            </div>
        </div>
    );
}
