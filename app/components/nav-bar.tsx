// components/Navbar.js
import Link from "next/link";
import { Home, Mail, Info, LogIn, UserPlus } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                            Nkarich
                        </span>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1">
                        <Link
                            href="/"
                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 flex items-center space-x-1"
                        >
                            <Home className="h-4 w-4" />
                            <span>Home</span>
                        </Link>

                        <Link
                            href="/contact-us"
                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 flex items-center space-x-1"
                        >
                            <Mail className="h-4 w-4" />
                            <span>Contact</span>
                        </Link>

                        <Link
                            href="/about-us"
                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 flex items-center space-x-1"
                        >
                            <Info className="h-4 w-4" />
                            <span>About</span>
                        </Link>

                        <div className="h-6 w-px bg-gray-200 mx-2"></div>

                        <Link
                            href="/login"
                            className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 flex items-center space-x-1"
                        >
                            <LogIn className="h-4 w-4" />
                            <span>Sign In</span>
                        </Link>

                        <Link
                            href="/register"
                            className="px-4 py-2 rounded-md text-sm font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 flex items-center space-x-1"
                        >
                            <UserPlus className="h-4 w-4" />
                            <span>Sign Up</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button className="mobile-menu-button p-2 rounded-md text-gray-700 hover:text-green-600 hover:bg-green-50 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
                        >
                            Home
                        </Link>

                        <Link
                            href="/contact-us"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
                        >
                            Contact
                        </Link>

                        <Link
                            href="/about-us"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
                        >
                            About
                        </Link>

                        <div className="h-px bg-gray-200 my-2"></div>

                        <Link
                            href="/login"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200"
                        >
                            Sign In
                        </Link>

                        <Link
                            href="/register"
                            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}