'use client'
import Link from "next/link";
import { Home, Mail, Info, LogIn, UserPlus, User, FileText } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
    const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const companyDropdownRef = useRef(null);
    const userDropdownRef = useRef(null);

    // Handle clicks outside the dropdowns to close them
    useEffect(() => {
        function handleClickOutside(event) {
            if (companyDropdownRef.current && !companyDropdownRef.current.contains(event.target)) {
                setIsCompanyDropdownOpen(false);
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Toggle dropdowns
    const toggleCompanyDropdown = () => {
        setIsCompanyDropdownOpen(!isCompanyDropdownOpen);
        setIsUserDropdownOpen(false); // Close other dropdown
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
        setIsCompanyDropdownOpen(false); // Close other dropdown
    };

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
                        {/* User Dropdown */}
                        <div className="relative" ref={userDropdownRef}>
                            <button 
                                onClick={toggleUserDropdown}
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 flex items-center space-x-1"
                            >
                                <User className="h-4 w-4" />
                                <span>User</span>
                            </button>
                            {isUserDropdownOpen && (
                                <div className="absolute bg-white shadow-md rounded-md mt-2 py-2 w-48 z-10">
                                    <Link
                                        href="/user"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 flex items-center"
                                    >
                                        <User className="h-4 w-4 mr-2" />
                                        Profile
                                    </Link>
                                    <Link
                                        href="/posts"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 flex items-center"
                                    >
                                        <FileText className="h-4 w-4 mr-2" />
                                        Posts
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link
                            href="/"
                            className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 flex items-center space-x-1"
                        >
                            <Home className="h-4 w-4" />
                            <span>Home</span>
                        </Link>

                        {/* Company Dropdown */}
                        <div className="relative" ref={companyDropdownRef}>
                            <button 
                                onClick={toggleCompanyDropdown}
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors duration-200 flex items-center space-x-1"
                            >
                                <span>Company</span>
                            </button>
                            {isCompanyDropdownOpen && (
                                <div className="absolute bg-white shadow-md rounded-md mt-2 py-2 w-48 z-10">
                                    <Link
                                        href="/contact-us"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 flex items-center"
                                    >
                                        <Mail className="h-4 w-4 mr-2" />
                                        Contact Us
                                    </Link>
                                    <Link
                                        href="/about-us"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 flex items-center"
                                    >
                                        <Info className="h-4 w-4 mr-2" />
                                        About Us
                                    </Link>
                                </div>
                            )}
                        </div>

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
            </div>
        </nav>
    );
}