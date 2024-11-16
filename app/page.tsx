"use client";
import Navbar from "@/app/components/nav-bar";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axiosInstance from "@/app/lib/axios-instance";

export default function Page() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    console.log(121n)
    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axiosInstance.get('/tasks/feed')

                const data = await response.data;
                setPosts(data.task);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);
    console.log(34)
    if (loading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    console.log({posts})
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow p-6 md:overflow-y-auto md:p-12">
                <div className="text-center">
                    <h1 className="font-sans text-4xl mb-4">Welcome to Nkarich</h1>
                    <p className="text-lg text-gray-600">
                        Recent posts
                    </p>
                </div>
                <div
                    className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md mb-6 transition-transform transform hover:scale-105">
                    {console.log({posts2: posts})}
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <div key={post.id} className="mb-6 border-b border-gray-200 pb-4">
                                <h3
                                    className="text-xl font-semibold text-gray-800 cursor-pointer hover:text-green-700 transition-colors"
                                    onClick={() => {
                                        router.push(`/posts/${post.uuid}`);
                                    }}
                                >
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mt-2 leading-relaxed">{post.description}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-center">No posts available.</p>
                    )}
                </div>

            </main>
        </div>
    );
}
