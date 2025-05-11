"use client";
import {FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface IPost {
    title: string
    description: string
    uuid: number
    id: number
    image: string
}

interface INewPost {
    title: string
    description: string
    image: string | null
}

export default function Page() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newPost, setNewPost] = useState<INewPost>({ title: "", description: "", image: null });
    const router = useRouter();

    async function fetchPosts() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
            const data = await response.json();
            setPosts(data.data.task);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(uuid: number) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${uuid}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            setPosts((prevPosts) => prevPosts.filter((post) => post.uuid !== uuid));
        } catch (err) {
            console.error("Failed to delete post:", err);
        }
    }

    async function handleCreatePost(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("title", newPost.title);
        formData.append("description", newPost.description);
        if (newPost.image) {
            formData.append("image", newPost.image);
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {
                method: "POST",
                headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            setPosts((prevPosts) => [...prevPosts, data.data.task]); // Add the new post to the list
            setNewPost({ title: "", description: "", image: null }); // Reset form
        } catch (err) {
            console.error("Failed to create post:", err);
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
        <div className="mx-auto flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">My Posts</h1>
            <form
                onSubmit={handleCreatePost}
                className=" rounded-lg shadow-lg p-8 w-full max-w-md mb-6"
            >
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-green">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={newPost.title}
                        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-green"
                    >
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={newPost.description}
                        onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        rows={3}
                        required
                    ></textarea>
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-white">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setNewPost({ ...newPost, image: e?.target?.files?.[0] as unknown as string })}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 text-white font-semibold bg-gradient-to-r from-green-600 to-green-400 rounded-md shadow-md hover:bg-gradient-to-r hover:from-green-500 hover:to-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    Create Post
                </button>
            </form>

            {/* Posts List */}
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mb-4 mx-auto flex flex-col items-center">
            {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="mb-6">
                            <h3
                                className="text-lg font-bold cursor-pointer hover:text-green-600"
                                onClick={() => {
                                    router.push(`/posts/${post.uuid}`);
                                }}
                            >
                                {post.title}
                            </h3>
                            <p>{post.description}</p>
                            {post.image ? (
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    width={300} // Adjust the width as needed
                                    height={200} // Adjust the height as needed
                                    className="mt-2 w-full max-w-xs rounded"
                                />
                            ) : (
                                <div className="mt-2 w-full max-w-xs rounded bg-gray-200 text-center py-4 text-gray-500">
                                    No Image Available
                                </div>
                            )}
                            <button
                                onClick={() => handleDelete(post.uuid)}
                                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                            <hr className="my-4" />
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
    );
}
