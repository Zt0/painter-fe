import React from 'react';
import Navbar from "@/app/components/nav-bar";

const AboutPage: React.FC = () => {
    return (
        <div className="text-center">
            <Navbar />
            <h2 className="font-sans text-4xl mb-4">About Us</h2>
            <p className="text-lg text-gray-600 mb-8">
                We are a dedicated team of professionals committed to delivering the best services to our customers. Our passion for excellence drives us to continuously improve and innovate.
            </p>
            <h3 className="font-sans text-2xl mb-2">Our Mission</h3>
            <p className="text-lg text-gray-600 mb-4">
                To provide exceptional service and create lasting relationships with our clients.
            </p>
            <h3 className="font-sans text-2xl mb-2">Our Values</h3>
            <ul className="text-lg text-gray-600 mb-4 list-disc list-inside">
                <li>Integrity</li>
                <li>Innovation</li>
                <li>Collaboration</li>
                <li>Excellence</li>
            </ul>
            <h3 className="font-sans text-2xl mb-2">Get Involved</h3>
            <p className="text-lg text-gray-600 mb-4">
                If you want to know more about us or get involved, feel free to reach out!
            </p>
        </div>
    );
};

export default AboutPage;
