import React from "react";
import { Outlet } from "react-router-dom/dist";
import ScrollToTop from "../components/ScrollToTop";
import  Navbar  from "../components/Navbar";
import Footer from "../components/Footer";

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
const Layout = () => {
    return (
        <ScrollToTop>
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                <Navbar />
                <main className="flex-grow">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </ScrollToTop>
    );
};

export default Layout;