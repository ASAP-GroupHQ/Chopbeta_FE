"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AuthInput from "@/components/auth/AuthInput";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiGlobe,
  FiCalendar,
  FiFileText,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function PersonalDetails() {
  const { user } = useAuth();

  // Local state to manage the form fields
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phone: "",
    address: "",
    lga: "",
    country: "",
    dob: "",
  });

  // Sync state when user data is fetched/available from AuthContext
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        userName: user.userName || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        lga: user.lga || "",
        country: user.country || "",
        dob: user.dob || "",
      });
    }
  }, [user]);

  // Generate dynamic initials for the avatar placeholder
  const getInitials = () => {
    if (formData.fullName) {
      const names = formData.fullName.trim().split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return names[0].slice(0, 2).toUpperCase();
    }
    return "VO";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-emerald-500">
              <span className="text-gray-400 font-medium text-xl">
                {getInitials()}
              </span>
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-white text-xs font-semibold">Change</span>
            </div>
          </div>
          <div className="text-center sm:text-left pt-2">
            <h4 className="text-sm font-semibold text-gray-800">
              Profile Picture
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">PNG, JPG up to 5MB</p>
          </div>
        </div>
      </div>

      {/* Grid Inputs Using AuthInput */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
        <AuthInput
          label="Full Name"
          placeholder="John Doe"
          Icon={FiUser}
          value={formData.fullName}
          onChange={(e) =>
            setFormData({ ...formData, fullName: e.target.value })
          }
          disabled={!!user?.fullName}
        />

        <AuthInput
          label="Username"
          placeholder="username"
          Icon={FiUser}
          value={formData.userName}
          onChange={(e) =>
            setFormData({ ...formData, userName: e.target.value })
          }
          disabled={!!user?.userName}
        />

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="example@domain.com"
          Icon={FiMail}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={true}
        />

        <AuthInput
          label="Phone Number"
          type="tel"
          placeholder="Phone number"
          Icon={FiPhone}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          disabled={!!user?.phoneNumber}
        />

        <AuthInput
          label="House Address"
          placeholder="Physical address"
          Icon={FiMapPin}
          value={formData.address}
          onChange={(e) =>
            setFormData({ ...formData, address: e.target.value })
          }
          disabled={!!user?.address}
        />

        <AuthInput
          label="LGA"
          placeholder="Local Government Area"
          Icon={FiFileText}
          value={formData.lga}
          onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
          disabled={!!user?.lga}
        />

        <AuthInput
          label="Country Of Residence"
          placeholder="Country"
          Icon={FiGlobe}
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
          disabled={!!user?.country}
        />

        <AuthInput
          label="Date Of Birth"
          type="date"
          Icon={FiCalendar}
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
          disabled={!!user?.dob}
        />
      </div>

      {/* Save Trigger Option Footer */}
      <div className="flex justify-end pt-4">
        <button className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-medium transition-all shadow-sm shadow-emerald-700/10 active:scale-95 cursor-pointer">
          Save Changes
        </button>
      </div>
    </motion.div>
  );
}
