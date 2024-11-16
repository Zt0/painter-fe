"use client";
import { useEffect, useState } from 'react';

export default function Page({ params }) {
    const { id } = params;
    const [post, setPost] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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
            setPost(data);
            setTitle(data.data.task.title);
            setDescription(data.data.task.description);
        } catch (error) {
            console.error("Failed to fetch post:", error);
        }
    }

    useEffect(() => {

        getPost();
    }, [id]);

    async function handleUpdate(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tasks/${id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ title, description })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const updatedData = await response.json();
            setPost(updatedData);
            setIsEditing(false); // Exit edit mode after successful update
            getPost(); //
        } catch (error) {
            console.error("Failed to update post:", error);
        }
    }

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div key={id} className="mb-4">
            {isEditing ? (
                <form onSubmit={handleUpdate} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 text-gray-600">Cancel</button>
                </form>
            ) : (
                <>
                    <h3 className="text-lg font-bold">{post?.data?.task?.title ?? ''}</h3>
                    <p>{post?.data?.task?.description ?? ''}</p>
                    <button onClick={() => setIsEditing(true)} className="px-4 py-2 mt-4 text-white bg-green-500 rounded">Edit</button>
                    <hr />
                </>
            )}
        </div>
    );
}
