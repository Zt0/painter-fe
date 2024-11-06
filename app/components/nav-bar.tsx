// components/Navbar.js
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link href="/">
                        <p className="hover:text-gray-300">Nkarich</p>
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link href="/">
                        <p className="hover:text-gray-300">Home</p>
                    </Link>
                    <Link href="/contact-us">
                        <p className="hover:text-gray-300">Contact Us</p>
                    </Link>
                    <Link href="/about-us">
                        <p className="hover:text-gray-300">About Us</p>
                    </Link>
                    <Link href="/login">
                        <p className="hover:text-gray-300">Sign In</p>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
