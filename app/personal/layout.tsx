import Navbar from "@/app/components/nav-bar";
import React from "react";

export default function Layout() {
    return (
        <div>
            <Navbar/>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12"></div>
            </div>
        </div>
    );
}