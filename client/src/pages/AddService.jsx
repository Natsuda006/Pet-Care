import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createService } from "../services/service.service";
import Swal from "sweetalert2";

const AddService = () => {
    const [service, setService] = useState({
        name: "",
        detail: "",
        price: "",
        cover: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setService({ ...service, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createService(service);
            Swal.fire("Success", "เพิ่มบริการสำเร็จ!", "success").then(() => {
                navigate("/");
            });
        } catch (error) {
            Swal.fire("Error", "เกิดข้อผิดพลาดในการเพิ่มบริการ", "error");
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-lg">
            <h1 className="text-2xl font-bold mb-4 text-center">เพิ่มบริการใหม่</h1>
            <div className="bg-base-100 p-6 rounded-lg shadow-xl border border-base-200">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="label">ชื่อบริการ</label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="label">รายละเอียด</label>
                        <textarea
                            name="detail"
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
                            className="input input-bordered w-full"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="label">URL รูปภาพ</label>
                        <input
                            type="text"
                            name="cover"
                            className="input input-bordered w-full"
                            placeholder="https://example.com/image.jpg"
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full mt-4">
                        บันทึก
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddService;
