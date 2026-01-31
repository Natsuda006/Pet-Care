import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="min-h-screen bg-blue-50 font-sans flex flex-col">
            <Navbar />
            <main className="p-4 flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
