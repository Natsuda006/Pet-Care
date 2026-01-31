import React, { useState, useEffect, useContext } from "react";
import { getUserBookings, getAllBookings } from "../services/booking.service";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const MyBookings = () => {
    const [search, setSearch] = useState("");
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        if (userInfo && userInfo.role === 'admin') {
            fetchAllBookings();
        }
    }, [userInfo]);

    const fetchAllBookings = async () => {
        setLoading(true);
        try {
            const data = await getAllBookings();
            setBookings(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) return;
        setLoading(true);
        setSearched(true);
        try {
            const data = await getUserBookings(search);
            setBookings(data);
        } catch (error) {
            console.error(error);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl min-h-screen">
            <div className="flex flex-col items-center mb-8 mt-4">
                <h1 className="text-3xl font-bold mb-2">ประวัติการจอง</h1>
                <p className="text-gray-500">ตรวจสอบสถานะการนัดหมายของคุณได้ที่นี่</p>
            </div>

            {userInfo && userInfo.role === 'admin' ? (
                <div className="flex flex-col items-center mb-4">
                    <div className="badge badge-primary badge-lg p-4">Admin Mode: แสดงประวัติการจองทั้งหมด ({bookings.length} รายการ)</div>
                </div>
            ) : (
                <div className="card bg-base-100 shadow-xl p-6 mb-8">
                    <form onSubmit={handleSearch} className="flex gap-4 items-end">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">ค้นหาด้วยเบอร์โทรศัพท์</span>
                            </label>
                            <input
                                type="text"
                                placeholder="เช่น 081-xxx-xxxx"
                                className="input input-bordered w-full"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {loading ? <span className="loading loading-spinner"></span> : "ค้นหา"}
                        </button>
                    </form>
                </div>
            )}

            {!loading && searched && bookings.length === 0 && (
                <div className="alert alert-warning shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>ไม่พบประวัติการจองของเบอร์นี้</span>
                </div>
            )}

            {bookings.length > 0 && (
                <div className="card bg-base-100 shadow-xl overflow-hidden border border-blue-100">
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            {/* head */}
                            <thead>
                                <tr className="bg-base-200">
                                    <th>#</th>
                                    <th>บริการ</th>
                                    <th>วันที่นัดหมาย</th>
                                    <th>ผู้จอง</th>
                                    <th>สถานะ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking, index) => (
                                    <tr key={booking._id} className="hover">
                                        <th>{index + 1}</th>
                                        <td>
                                            <div className="font-bold">{booking.serviceId?.name || "ไม่ระบุ"}</div>
                                            <div className="text-sm opacity-50">{booking.serviceId?.price} บาท</div>
                                        </td>
                                        <td>
                                            {new Date(booking.bookingDate).toLocaleString('th-TH', {
                                                dateStyle: 'medium',
                                                timeStyle: 'short'
                                            })}
                                        </td>
                                        <td>
                                            <div>{booking.customerName}</div>
                                            <div className="text-xs text-gray-500">{booking.phoneNumber}</div>
                                        </td>
                                        <td>
                                            <div className={`badge ${booking.status === 'pending' ? 'badge-warning' :
                                                booking.status === 'confirmed' ? 'badge-success' : 'badge-ghost'
                                                } badge-sm p-3`}>
                                                {booking.status === 'pending' ? 'รอการยืนยัน' : booking.status}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyBookings;
