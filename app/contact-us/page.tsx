'use client'
import React from 'react';
import Navbar from "@/app/components/nav-bar";

const ContactPage: React.FC = () => {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert('Form submitted!');
    };

    return (
        <div className="text-center">
            <Navbar />
            <h2 className="font-sans text-4xl mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-8">
                We would love to hear from you! Please fill out the form below.
            </p>

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-left mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-left mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block text-left mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ContactPage;
