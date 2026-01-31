import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import Swal from "sweetalert2";

const Navbar = () => {
    const { userInfo, logOut } = useContext(UserContext);

    const handleLogout = () => {
        logOut();
    };

    return (
        <div className="navbar bg-base-100 shadow-md px-4 sm:px-8 sticky top-0 z-50">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-2xl font-bold text-primary gap-2">
                    <span className="text-3xl">🐾</span> Pet Care
                </Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1 gap-2 hidden md:flex items-center">
                    <li>
                        <Link to="/" className="font-medium hover:text-primary">บริการทั้งหมด</Link>
                    </li>
                    <li>
                        <Link to="/my-bookings" className="font-medium hover:text-primary">ประวัติการจอง</Link>
                    </li>
                    {userInfo && userInfo.role === 'admin' && (
                        <li>
                            <Link to="/add-service" className="font-medium text-secondary hover:text-secondary-focus">
                                + เพิ่มบริการ
                            </Link>
                        </li>
                    )}

                    {userInfo ? (
                        <>
                            <li className="ml-4 font-semibold text-primary">
                                Hi, {userInfo.username}
                            </li>
                            <li>
                                <button onClick={handleLogout} className="btn btn-error btn-sm text-white ml-2">Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/login" className="btn btn-ghost btn-sm">Login</Link>
                            </li>
                            <li>
                                <Link to="/register" className="btn btn-primary btn-sm text-white">Register</Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Mobile Menu Dropdown */}
                <div className="dropdown dropdown-end md:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><Link to="/">บริการทั้งหมด</Link></li>
                        <li><Link to="/my-bookings">ประวัติการจอง</Link></li>
                        {userInfo && userInfo.role === 'admin' && <li><Link to="/add-service">เพิ่มบริการ</Link></li>}
                        {userInfo ? (
                            <>
                                <li className="menu-title">Account</li>
                                <li><a>{userInfo.username}</a></li>
                                <li><a onClick={handleLogout} className="text-error">Logout</a></li>
                            </>
                        ) : (
                            <>
                                <li className="menu-title">Account</li>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
