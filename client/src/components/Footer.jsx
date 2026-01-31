import React from "react";

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 bg-base-100 text-base-content rounded shadow-md mt-4">
            <div>
                <p className="text-lg font-bold">© {new Date().getFullYear()} Pet Care Booking. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
