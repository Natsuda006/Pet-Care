import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthService from "../services/authentication.service";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

const Register = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    const { userInfo } = useContext(UserContext);

    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((user) => ({ ...user, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!user.username || !user.password) {
            Swal.fire({
                title: "Error",
                text: "Username or Password cannot be empty!",
                icon: "error",
            });
        } else {
            try {
                const response = await AuthService.register(user.username, user.password);
                if (response?.status === 201) {
                    Swal.fire({
                        title: "Success",
                        text: response?.data?.message,
                        icon: "success",
                    }).then(() => {
                        navigate("/login");
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: "Error",
                    text: error.response?.data?.message || "Registration failed",
                    icon: "error",
                });
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh]">
            <div className="card bg-base-100 w-[500px] shadow-xl border border-base-200">
                <div className="card-body p-10 space-y-6">
                    <h2 className="card-title justify-center text-3xl font-bold text-primary">Register</h2>
                    <div>
                        <label className="label p-0 mb-1">
                            <span className="text-base label-text font-semibold">Username</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your username"
                            className="w-full input input-bordered"
                            name="username"
                            onChange={handleChange}
                            value={user.username}
                        />
                    </div>
                    <div>
                        <label className="label p-0 mb-1">
                            <span className="text-base label-text font-semibold">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="w-full input input-bordered"
                            name="password"
                            onChange={handleChange}
                            value={user.password}
                        />
                    </div>
                    <button className="btn btn-primary w-full" onClick={handleSubmit}>
                        Register
                    </button>
                    <p className="text-center text-sm">
                        Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
