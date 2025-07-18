import React from "react";
import AuthForm from "../Components/AuthForm/AuthForm";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <AuthForm isLogin={true} />
      </div>
    </div>
  );
};

export default LoginPage;
