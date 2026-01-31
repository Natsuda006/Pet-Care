import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById, updateService } from "../services/service.service";
import Swal from "sweetalert2";

const EditService = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState({
        name: "",
        detail: "",
        price: "",
        cover: "",
    });

    useEffect(() => {
        if (id) {
            getServiceById(id).then((data) => setService(data));
        }
    }, [id]);

    const handleChange = (e) => {
        setService({ ...service, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateService(id, service);
            Swal.fire("Success", "แก้ไขข้อมูลสำเร็จ!", "success").then(() => {
                navigate("/");
            });
        } catch (error) {
            Swal.fire("Error", "เกิดข้อผิดพลาดในการแก้ไข", "error");
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">แก้ไขบริการ</h1>
            <div className="bg-base-100 p-6 rounded-lg shadow-xl border border-base-200">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">ชื่อบริการ</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={service.name}
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="label">รายละเอียด</label>
                        <textarea
                            name="detail"
                            value={service.detail}
                            className="textarea textarea-bordered w-full"
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <div>
                        <label className="label">ราคา (บาท)</label>
                        <input
                            type="number"
                            name="price"
                            required
                            value={service.price}
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="label">URL รูปภาพ</label>
                        <input
                            type="text"
                            name="cover"
                            value={service.cover}
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-warning w-full mt-4 text-white">
                        อัปเดตข้อมูล
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditService;
