import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthRegisterWithOtp = () => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const { userName, email, phoneNumber, password } = formData;

    if (!userName || !email || !phoneNumber || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result?.message || "Registration failed");
        return;
      }

      localStorage.setItem("emailForOtp", email);
      toast.success("OTP sent to your email");
      setStep(2);
    } catch {
      toast.error("Network error");
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("emailForOtp");

    if (!otp || !email) {
      toast.error("Missing OTP or email");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const result = await res.json();
      if (!res.ok) {
        toast.error(result?.message || "OTP verification failed");
        return;
      }

      toast.success("Registration successful! Redirecting...");
      localStorage.removeItem("emailForOtp");

      setTimeout(() => navigate("/login"), 1500);
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          {step === 1 ? "Register" : "Verify OTP"}
        </h2>

        {step === 1 && (
          <form onSubmit={handleRegister} className="space-y-4">
            <label className="text-sm text-gray-600">
              Enter Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="userName"
              placeholder="User Name"
              required
              autoFocus
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, userName: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded outline-none"
            />

            <label className="text-sm text-gray-600">
              Enter Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded outline-none"
            />

            <label className="text-sm text-gray-600">
              Enter Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              required
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded outline-none"
            />

            <label className="text-sm text-gray-600">
              Enter Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full px-4 py-2 border rounded outline-none"
            />

            <button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition"
            >
              Register
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <label className="text-sm text-gray-600">
              An OTP has been sent to your email. Please enter it to verify.{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              value={otp}
              required
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 border rounded outline-none"
              autoFocus
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition"
            >
              Verify OTP
            </button>
          </form>
        )}

        <ToastContainer position="top-center" />

      </div>
    </div>
  );
};

export default AuthRegisterWithOtp;
