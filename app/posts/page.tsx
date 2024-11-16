"use client";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";

export default function Page() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    async function fetchPosts() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setPosts(data.data.task);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(uuid) {

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${uuid}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            // Update the posts list after deletion
            setPosts(prevPosts => prevPosts.filter(post => post.uuid !== uuid));
        } catch (err) {
            console.error("Failed to delete post:", err);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">My posts</h1>

            {/* Create Post Button */}
            <button
                onClick={() => router.push("/posts/create")}
                className="mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors"
            >
                Create Post
            </button>

            {/* Posts List */}
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mb-4">
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className="mb-4">
                            <h3
                                className="text-lg font-bold cursor-pointer hover:text-green-600"
                                onClick={() => {
                                    router.push(`/posts/${post.uuid}`);
                                }}
                            >
                                {post.title}
                            </h3>
                            <p>{post.description}</p>
                            <button
                                onClick={() => handleDelete(post.uuid)}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                            >
                                Delete
                            </button>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
    );
}
