import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthContext } from "../../context/AuthContext";

const AuthForm = ({ isLogin = true }) => {
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ use context

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.email ||
      !formData.password ||
      (!isLogin && (!formData.userName || !formData.phoneNumber))
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const url = isLogin
      ? `${import.meta.env.VITE_API_URL}/auth/login`
      : `${import.meta.env.VITE_API_URL}/auth/register`;

    const payload = isLogin
      ? {
          loginField: formData.email,
          password: formData.password,
        }
      : {
          userName: formData.userName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          password: formData.password,
        };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("API Response:", result);

      if (!res.ok) {
        toast.error(result?.message || result?.error || "Something went wrong");
        return;
      }

      if (isLogin) {
        // ✅ Call login from context instead of localStorage directly
        login(result.userName, result.userId, result.token);
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        // 📨 After registration, redirect to OTP verification
        localStorage.setItem("emailForOtp", formData.email);
        toast.success("Registered successfully! OTP sent to your email.");
        setTimeout(() => navigate("/verify-otp"), 1000);
      }
    } catch (err) {
      console.error("Network error:", err);
      toast.error("Network error. Check backend or CORS.");
    }
  };

  return (
    <div className="flex">
      <div className="max-w-md bg-white p-6 rounded-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">User Name</label>
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email {isLogin && "/ Username"}
            </label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email or Username"
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Your Phone Number"
                className="w-full px-4 py-2 border rounded"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 text-white py-2 rounded hover:bg-[#ff5252] transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <Link to="/register" className="text-[#ff5252] hover:underline">
                Register
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link to="/login" className="text-[#ff5252] hover:underline">
                Login
              </Link>
            </>
          )}
        </p>

        {isLogin && (
          <p className="text-center mt-2 text-sm">
            <Link to="/reset-password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
          </p>
        )}

        <ToastContainer />
      </div>
    </div>
  );
};

export default AuthForm;
