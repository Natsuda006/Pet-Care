import React, { useEffect, useState, useContext } from "react";
import { getAllServices } from "../services/service.service";
import ServiceCard from "../components/ServiceCard";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

const Home = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const data = await getAllServices();
            setServices(data);
        } catch (err) {
            setError("ไม่สามารถดึงข้อมูลบริการได้");
        } finally {
            setLoading(false);
        }
    };

    const handleBook = (id) => {
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
        navigate(`/booking/${id}`);
    };

    const handleDeleteSuccess = (id) => {
        setServices(services.filter(s => s._id !== id));
    };


    if (loading) return <div className="text-center mt-20"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
    if (error) return <div className="text-center mt-20 text-error">{error}</div>;

    return (
        <div>
            {/* Hero Section */}
            {/* Hero Section */}
            {/* Hero Section */}
            <div className="hero min-h-[500px] mb-10 rounded-box overflow-hidden" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1450778865369-3d4b7c2927d7?q=80&w=2070&auto=format&fit=crop)' }}>
                <div className="hero-overlay bg-pink-100/60 backdrop-blur-[2px]"></div>
                <div className="hero-content text-center text-neutral-content pt-16">
                    <div className="max-w-2xl text-gray-800">
                        <h1 className="mb-5 text-5xl font-extrabold leading-relaxed text-primary">
                            ดูแลสัตว์เลี้ยงของคุณ <br />
                            <span className="text-secondary">ดุจคนในครอบครัว</span> 🐾
                        </h1>
                        <p className="mb-8 text-lg font-medium opacity-90 text-gray-700">
                            บริการครบวงจรสำหรับเพื่อนรักสี่ขา ทั้งอาบน้ำ ตัดขน ฝากเลี้ยง และพาเดินเล่น
                            โดยทีมงานมืออาชีพที่เข้าใจและรักสัตว์เลี้ยงอย่างแท้จริง
                        </p>
                        <button
                            className="btn btn-primary btn-lg border-none shadow-lg hover:scale-105 transition-transform text-white"
                            onClick={() => document.getElementById('services-section').scrollIntoView({ behavior: 'smooth' })}
                        >
                            ดูบริการของเรา
                        </button>
                    </div>
                </div>
            </div>

            {/* Services Section */}
            <div id="services-section" className="container mx-auto p-4">
                <div className="flex items-center gap-4 mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">บริการยอดนิยม</h2>
                    <div className="h-1 flex-1 bg-base-200 rounded"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((service) => (
                        <ServiceCard key={service._id} service={service} onBook={handleBook} onDeleteSuccess={handleDeleteSuccess} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
