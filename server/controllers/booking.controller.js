const Booking = require("../models/Booking");


exports.createBooking = async (req, res) => {
    try {
        const { customerName, phoneNumber, bookingDate, serviceId } = req.body;
        if (!customerName || !phoneNumber || !bookingDate || !serviceId) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newBooking = new Booking({
            customerName,
            phoneNumber,
            bookingDate,
            serviceId,
        });
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("serviceId")
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const userIdentifier = req.params.user;
        const bookings = await Booking.find({
            $or: [{ customerName: userIdentifier }, { phoneNumber: userIdentifier }],
        })
            .populate("serviceId") 
            .sort({ createdAt: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};