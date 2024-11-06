"use client";
import { useEffect, useState } from 'react';
import { use } from 'react';
export default function Page({ params }) {
    console.log({params: params.id})
    const {id} = use(params);
    const [post, setPost] = useState(null);
    console.log({post})
    useEffect(() => {
        async function getPost() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }

                const data = await response.json();
                setPost(data); // Set the fetched data to post state
            } catch (error) {
                console.error("Failed to fetch post:", error);
            }
        }

        getPost();
    }, [id]);
    if (!post) {
        return <p>Loading...</p>;
    }
    console.log(222, post.data.task)

    return (
        <div key={'533'} className="mb-4">
            <h3 className="text-lg font-bold">{post.data.task.title}</h3>
            <p>{post.data.task.description}</p>
            <hr/>
        </div>
    );
}
