import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Booking from "../pages/Booking";
import MyBookings from "../pages/MyBookings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AddService from "../pages/AddService";
import EditService from "../pages/EditService";
import App from "../App";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "booking/:serviceId",
                element: <Booking />,
            },
            {
                path: "my-bookings",
                element: <MyBookings />,
            },
            {
                path: "add-service",
                element: <AddService />,
            },
            {
                path: "edit-service/:id",
                element: <EditService />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
]);

export default router;
