import React from "react";
import AuthForm from "../components/AuthForm/AuthForm";

const RegisterPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <AuthForm isLogin={false} />
      </div>
    </div>
  );
};

export default RegisterPage;
