"use client";
import Navbar from "@/app/components/nav-bar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/app/lib/axios-instance";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import axios from "axios";

export default function Page() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await axiosInstance.get('/tasks/feed');
                setPosts(response.data.task || []);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message || "Failed to fetch posts");
                } else {
                    setError("Failed to fetch posts");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-lg text-gray-600">Loading amazing content...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col bg-gray-50">
                <Navbar />
                <main className="flex-grow flex items-center justify-center">
                    <div className="bg-red-50 p-8 rounded-xl shadow-lg text-center">
                        <div className="text-red-500 text-5xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-semibold text-red-700 mb-2">Oops! Something went wrong</h2>
                        <p className="text-red-600">{error}</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />
            <main className="flex-grow p-6 md:p-12">
                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent mb-4">
                        Welcome to Nkarich
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Discover amazing content shared by our community
                    </p>
                    <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-green-300 mx-auto rounded-full"></div>
                </div>

                {/* Posts Grid */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.length > 0 ? (
                        posts.map((post: {id: string, uuid: string, image: string, title: string, description: string, createdAt: string}) => (
                            <div
                                key={post.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                            >
                                {/* Post Image or Placeholder */}
                                <div className="h-48 bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                                    {post.image ? (
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="text-green-300 text-5xl">📝</div>
                                    )}
                                </div>

                                {/* Post Content */}
                                <div className="p-6">
                                    <h3
                                        className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors cursor-pointer flex items-center justify-between"
                                        onClick={() => router.push(`/posts/${post.uuid}`)}
                                    >
                                        {post.title}
                                        <ChevronRight className="h-5 w-5 text-green-500 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                                    </h3>

                                    <p className="text-gray-600 mt-3 line-clamp-3">
                                        {post.description}
                                    </p>

                                    {/* Meta Information */}
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-4 w-4" />
                                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Clock className="h-4 w-4" />
                                            <span>{new Date(post.createdAt).toLocaleTimeString()}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full">
                            <div className="bg-white rounded-xl shadow-md p-8 text-center">
                                <div className="text-6xl mb-4">🌱</div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Posts Yet</h3>
                                <p className="text-gray-600">
                                    Be the first to share something amazing with our community!
                                </p>
                            </div>
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