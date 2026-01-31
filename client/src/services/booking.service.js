import api from "./api";

const createBooking = async (bookingData) => {
    const response = await api.post("/bookings", bookingData);
    return response.data;
};

const getAllBookings = async () => {
    const response = await api.get("/bookings");
    return response.data;
};

const getUserBookings = async (search) => {
    const response = await api.get(`/bookings/${search}`);
    return response.data;
};

export {
    createBooking,
    getAllBookings,
    getUserBookings
};
