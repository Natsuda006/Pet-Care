import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteService } from "../services/service.service";

const ServiceCard = ({ service, onBook, onDeleteSuccess }) => {
    const { _id, name, detail, price, cover } = service;
    const { userInfo } = useContext(UserContext);

    const handleDelete = async () => {
        const result = await Swal.fire({
            title: 'แน่ใจหรือไม่?',
            text: "คุณต้องการลบรายการนี้ใช่ไหม?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'ใช่, ลบเลย!',
            cancelButtonText: 'ยกเลิก'
        });

        if (result.isConfirmed) {
            try {
                await deleteService(_id);
                Swal.fire('Deleted!', 'ลบเรียบร้อยแล้ว.', 'success');
                if (onDeleteSuccess) onDeleteSuccess(_id);
            } catch (error) {
                Swal.fire('Error!', 'เกิดข้อผิดพลาดในการลบ.', 'error');
            }
        }
    };

    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-200 flex flex-col h-full">
            <figure className="h-48 overflow-hidden relative group">
                <img
                    src={cover || "https://via.placeholder.com/400x250?text=No+Image"}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </figure>
            <div className="card-body flex-grow">
                <h2 className="card-title text-primary">
                    {name}
                </h2>
                <p className="text-gray-500 text-sm line-clamp-3 mb-4">{detail}</p>

                <div className="mt-auto">
                    <div className="flex justify-between items-center">
                        <div className="badge badge-lg badge-outline font-semibold border-primary text-primary">{price} ฿</div>

                        {userInfo && userInfo.role === 'admin' ? (
                            <div className="flex gap-2">
                                <Link to={`/edit-service/${_id}`} className="btn btn-warning btn-sm text-white">
                                    แก้ไข
                                </Link>
                                <button onClick={handleDelete} className="btn btn-error btn-sm text-white">
                                    ลบ
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => onBook(_id)}
                                className="btn btn-primary btn-sm md:btn-md shadow-md hover:shadow-lg"
                            >
                                จองคิว
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
