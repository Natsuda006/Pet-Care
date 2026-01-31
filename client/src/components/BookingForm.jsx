import React, { useState } from "react";


const BookingForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        customerName: "",
        phoneNumber: "",
        bookingDate: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-center font-medium text-gray-500 mb-4">กรุณากรอกข้อมูลเพื่อยืนยันการนัดหมาย</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">ชื่อของคุณ</span>
                    </label>
                    <input
                        type="text"
                        name="customerName"
                        required
                        className="input input-bordered w-full focus:input-primary"
                        placeholder="กรอกชื่อ-นามสกุล"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">เบอร์โทรศัพท์</span>
                    </label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        required
                        className="input input-bordered w-full focus:input-primary"
                        placeholder="เช่น 081-234-5678"
                        onChange={handleChange}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-semibold">วันและเวลาที่นัดหมาย</span>
                    </label>
                    <input
                        type="datetime-local"
                        name="bookingDate"
                        required
                        className="input input-bordered w-full focus:input-primary"
                        onChange={handleChange}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-full text-lg mt-4 shadow-md hover:shadow-xl transition-all"
                >
                    ยืนยันการจอง
                </button>
            </form>
        </div>
    );
};

export default BookingForm;
