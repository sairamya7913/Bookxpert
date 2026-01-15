import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Login.css";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        let newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Enter a valid email";
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();

        // If validation failed
        if (!isValid) {
            // Check if fields are empty → show toast
            if (!formData.email || !formData.password) {
                toast.error("Please fill the required fields");
            }
            // If fields are filled but invalid → NO toast
            return;
        }

        // Mock login success
        localStorage.setItem("isLoggedIn", "true");

        toast.success("Login successful!");

        setTimeout(() => {
            navigate("/dashboard");
        }, 1500);
    };


    return (
        <div className="login-wrapper d-flex justify-content-center align-items-center">

            <div className="card shadow p-4" style={{ width: "380px" }}>
                <h4 className="text-center mb-4">Employee Login</h4>

                <form onSubmit={handleSubmit} noValidate>
                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label">
                            Email <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                        />
                        {errors.email && (
                            <div className="invalid-feedback">{errors.email}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label">
                            Password <span className="required">*</span>
                        </label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                        />
                        {errors.password && (
                            <div className="invalid-feedback">{errors.password}</div>
                        )}
                    </div>

                    <button className="btn btn-primary w-100 mt-2" type="submit">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
