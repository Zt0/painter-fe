    "use client";
    import { useEffect, useState } from "react";
    import Image from "next/image";
    import axiosInstance from "@/app/lib/axios-instance";
    import axios, { AxiosResponse } from "axios";

    type SegmentParams<T extends Object = any> = T extends Record<string, any>
    ? { [K in keyof T]: T[K] extends string ? string | string[] | undefined : never }
    : T
    export default function Page({ params }: { params: Promise<SegmentParams> }) {
        // const { id } = params;
        const id = 3
        const [post, setPost] = useState<AxiosResponse | null>(null);
        const [isEditing, setIsEditing] = useState(false);
        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [image, setImage] = useState<File | null>(null);
        const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(null);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState<string | null>(null);

        async function getPost() {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/tasks/${id}`);
                setPost(response);
                setTitle(response.data.task.title);
                setDescription(response.data.task.description);
                setPreviewImage(response.data.task.image);
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message || "Failed to fetch post");
                } else {
                    console.error("Failed to fetch post:", err);
                }
            } finally {
                setLoading(false);
            }
        }

        useEffect(() => {
            getPost();
        }, [id]);

        async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
            e.preventDefault();
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            if (image) {
                formData.append("image", image);
            }

            try {
                setLoading(true);
                console.log({formData}, title, description)
                const response = await axiosInstance.patch(`/tasks/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                setPost(response);
                setPreviewImage(response.data.task.image);
                setIsEditing(false);
                setImage(null);
                getPost();
            } catch (err) {
                if (axios.isAxiosError(err)) {
                    setError(err.response?.data?.message || "Failed to update post");
                } else {
                    console.error("Failed to update post:", err);
                } 
            } finally {
                setLoading(false);
            }
        }

        function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
            const file = e.target.files?.[0];
            if (file) {
                setImage(file);
            }

            if (file) {
                const reader = new FileReader();
                reader.onload = () => setPreviewImage(reader.result);
                reader.readAsDataURL(file);
            }
        }

        if (loading && !post) {
            return <div className="flex justify-center items-center">Loading...</div>;
        }

        if (error) {
            return <div className="text-red-500">Error: {error}</div>;
        }

        return (
            <div key={id} className="mb-4">
                {isEditing ? (
                    <form onSubmit={handleUpdate} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium">
                                Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 border rounded"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border rounded"
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label htmlFor="image" className="block text-sm font-medium">
                                Update Image
                            </label>
                            {previewImage && (
                                <div className="mt-2">
                                    <Image
                                        src={previewImage as string}
                                        alt="Current Image"
                                        width={300}
                                        height={200}
                                        className="rounded"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                id="image"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="mt-2"
                                disabled={loading}
                            />
                        </div>
                        <div className="space-x-2">
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-4 py-2 text-gray-600 disabled:opacity-50"
                                disabled={loading}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <>
                        <h3 className="text-lg font-bold">{post?.data?.task?.title ?? ""}</h3>
                        <p>{post?.data?.task?.description ?? ""}</p>
                        {post?.data?.task?.image ? (
                            <Image
                                src={post?.data?.task?.image}
                                alt={post?.data?.task?.title}
                                width={300}
                                height={200}
                                className="mt-2 rounded"
                            />
                        ) : (
                            <div className="mt-2 w-full max-w-xs rounded bg-gray-200 text-center py-4 text-gray-500">
                                No Image Available
                            </div>
                        )}
                        <button
                            onClick={() => setIsEditing(true)}
                            className="px-4 py-2 mt-4 text-white bg-green-500 rounded"
                        >
                            Edit
                        </button>
                        <hr />
                    </>
                )}
            </div>
        );
    }