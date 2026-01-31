const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking.controller");

const authJwt = require("../middlewares/authJWT.middleware");

//http://localhost:5002/api/bookings/
router.post("/", bookingController.createBooking);

//http://localhost:5002/api/bookings/
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], bookingController.getAllBookings);

//http://localhost:5002/api/bookings/:user (search by phone number)
router.get("/:user", bookingController.getUserBookings);

module.exports = router;
