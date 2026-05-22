"use client";

import React, { useState } from "react";
import { IconType } from "react-icons";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  Icon: IconType;
}

const AuthInput: React.FC<AuthInputProps> = ({
  label,
  Icon,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Determine if this specific input is a password field
  const isPasswordField = type === "password";

  const currentInputType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="w-full space-y-1.5 text-left">
      <label className="text-sm font-medium text-gray-700 ml-1">{label}</label>
      <div className="relative group">
        {/* Left Side Icon */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
          <Icon size={18} />
        </div>

        {/* Input Element */}
        <input
          {...props}
          type={currentInputType}
          className={`w-full pl-11 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all text-sm placeholder:text-gray-400 text-[#1A2E35] font-medium ${
            isPasswordField ? "pr-12" : "pr-4"
          }`}
        />

        {/* Password Visibility Button */}
        {isPasswordField && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none p-1"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthInput;
