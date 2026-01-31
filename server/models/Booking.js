const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
    bookingDate: { type: Date, required: true },
    status: { 
        type: String, 
        enum: ["pending", "confirmed", "completed", "cancelled"], 
        default: "confirmed" 
    },
});
module.exports = mongoose.model("Booking", bookingSchema);