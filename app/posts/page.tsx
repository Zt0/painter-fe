"use client";
import { useEffect, useState } from 'react';
export default function Page() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMGM1NTI4NTgtNDQwYi00MjVkLWExNDYtYjJhZTg3MzM3MTM1IiwicmVtZW1iZXIiOnRydWUsImlhdCI6MTczMDAxMjE4OSwiZXhwIjoxNzMwMDk4NTg5fQ.RcfokjtUd4IFw_R2t1lvraHRz-mYTABn_TfH2Abjccg'
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

        fetchPosts();
    }, []);

    if (loading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    console.log({posts})
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">My posts</h1>
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md mb-4">
                {console.log({posts2: posts})}
                {posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className="mb-4">
                            <h3 className="text-lg font-bold">{post.title}</h3>
                            <p>{post.description}</p>
                            <hr/>
                        </div>
                    ))
                ) : (
                    <p>No posts available.</p>
                )}
            </div>
        </div>
    );
}
