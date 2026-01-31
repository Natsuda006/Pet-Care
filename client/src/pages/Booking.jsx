import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById } from "../services/service.service";
import { createBooking } from "../services/booking.service";
import BookingForm from "../components/BookingForm";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

const Booking = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userInfo) {
            Swal.fire({
                title: "กรุณาเข้าสู่ระบบ",
                text: "คุณต้องเข้าสู่ระบบก่อนทำการจอง",
                icon: "warning",
                confirmButtonText: "ไปหน้า Login",
            }).then(() => {
                navigate("/login");
            });
            return;
        }

        if (serviceId) {
            getServiceById(serviceId)
                .then(data => setService(data))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [serviceId, userInfo, navigate]);

    const handleBookingSubmit = async (formData) => {
        try {
            await createBooking({ ...formData, serviceId });
            Swal.fire({
                title: "Success",
                text: "จองสำเร็จ!",
                icon: "success",
            }).then(() => {
                navigate("/my-bookings");
            });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "เกิดข้อผิดพลาดในการจอง: " + (error.response?.data?.message || "Unknown error"),
                icon: "error",
            });
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );
    if (!service) return <div className="text-center mt-10 text-error text-xl">ไม่พบข้อมูลบริการ</div>;

    return (
        <div className="container mx-auto p-4 max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-100 shadow-2xl rounded-2xl overflow-hidden animate-fade-in-up">
                {/* Left Side: Service Details */}
                <div className="relative h-64 md:h-auto group">
                    <img
                        src={service.cover || "https://via.placeholder.com/600x400"}
                        alt={service.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
                        <h2 className="text-3xl font-bold mb-2">{service.name}</h2>
                        <div className="badge badge-secondary badge-lg text-lg font-semibold">{service.price} ฿ / ครั้ง</div>
                    </div>
                </div>

                {/* Right Side: Booking Form */}
                <div className="p-8">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold text-gray-700 border-l-4 border-primary pl-3">
                            รายละเอียดบริการ
                        </h3>
                        <p className="text-gray-600 mt-2 leading-relaxed">{service.detail}</p>
                    </div>

                    <div className="divider">แบบฟอร์มจองคิว</div>

                    <BookingForm onSubmit={handleBookingSubmit} />
                </div>
            </div>
        </div>
    );
};

export default Booking;
