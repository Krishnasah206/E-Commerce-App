import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPasswordFlow = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Enter your email");

    try {
      const res = await fetch("http://localhost:8080/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      if (!res.ok) return toast.error(result?.message || "Failed to send OTP");

      toast.success("OTP sent to your email");
      localStorage.setItem("emailForOtp", email);
      setStep(2);
    } catch {
      toast.error("Network error");
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("emailForOtp");

    if (!otp || !email) return toast.error("Missing fields");

    try {
      const res = await fetch("http://localhost:8080/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const result = await res.json();
      if (!res.ok) return toast.error(result?.message || "OTP invalid");

      toast.success("OTP verified");
      setStep(3);
    } catch {
      toast.error("Network error");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("emailForOtp");

    if (!newPassword || newPassword !== confirmPassword)
      return toast.error("Passwords must match");

    try {
      const res = await fetch("http://localhost:8080/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword, confirmPassword, otp }),
      });

      const result = await res.json();
      if (!res.ok) return toast.error(result?.message || "Reset failed");

      toast.success("Password reset successful");
      localStorage.removeItem("emailForOtp");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch {
      toast.error("Network error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          {step === 1 ? "Forgot Password" : step === 2 ? "Verify OTP" : "Reset Password"}
        </h2>

        {step === 1 && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <label className="text-sm text-gray-700">
              Enter Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border rounded outline-none"
            />
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition">
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpVerify} className="space-y-4">
            <label className="text-sm text-gray-700">
              Enter OTP <span className="text-red-500">*</span>
            </label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              required
              className="w-full px-4 py-2 border rounded outline-none"
            />
            <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded transition">
              Enter Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <label className="text-sm text-gray-700">
              Enter Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              disabled
              className="w-full px-4 py-2 border rounded bg-gray-200 text-gray-500"
            />

            <label className="text-sm text-gray-700">
              Enter OTP <span className="text-red-500">*</span>
            </label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP again"
              required
              className="w-full px-4 py-2 border rounded outline-none"
            />

            <label className="text-sm text-gray-700">
              Enter New Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded outline-none"
            />

            <label className="text-sm text-gray-700">
              Enter Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded outline-none"
            />
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition">
              Reset Password
            </button>
          </form>
        )}

        <ToastContainer position="top-center" />
      </div>
    </div>
  );
};

export default ResetPasswordFlow;
