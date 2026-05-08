import React from "react";
import { IconType } from "react-icons";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  Icon: IconType;
}

const AuthInput: React.FC<AuthInputProps> = ({ label, Icon, ...props }) => {
  return (
    <div className="w-full space-y-1.5 text-left">
      {" "}
      {/* Added text-left to ensure label alignment */}
      <label className="text-sm font-medium text-gray-700 ml-1">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors">
          <Icon size={18} />
        </div>
        <input
          {...props}
          className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-600 outline-none transition-all text-sm placeholder:text-gray-400 text-[#1A2E35] font-medium"
          /* Changed: added text-[#1A2E35] for dark text and font-medium for better visibility */
        />
      </div>
    </div>
  );
};

export default AuthInput;
