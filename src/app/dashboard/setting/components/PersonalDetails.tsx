"use client";

// import React, { useState } from "react";
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

export default function PersonalDetails() {
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
              <span className="text-gray-400 font-medium text-xl">VO</span>
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
          label="First Name"
          placeholder="First name"
          Icon={FiUser}
          // value={firstName}
          // onChange={(e) =>
          //   setFormData({ ...formData, firstName: e.target.value })
          // }
        />
        <AuthInput
          label="Middle Name"
          placeholder="Middle name"
          Icon={FiUser}
          // value={middleName}
          // onChange={(e) =>
          //   setFormData({ ...formData, middleName: e.target.value })
          // }
        />
        <AuthInput
          label="Last Name"
          placeholder="Last name"
          Icon={FiUser}
          // value={lastName}
          // onChange={(e) =>
          //   setFormData({ ...formData, lastName: e.target.value })
          // }
        />
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="example@domain.com"
          Icon={FiMail}
          disabled={true}
          // value={email}
          // onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <AuthInput
          label="Phone Number"
          type="tel"
          placeholder="Phone number"
          Icon={FiPhone}
          // value={phone}
          // onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <AuthInput
          label="House Address"
          placeholder="Physical address address"
          Icon={FiMapPin}
          // value={address}
          // onChange={(e) =>
          //   setFormData({ ...formData, address: e.target.value })
          // }
        />
        <AuthInput
          label="LGA"
          placeholder="Local Government Area"
          Icon={FiFileText}
          // value={lga}
          // onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
        />
        <AuthInput
          label="Country Of Residence"
          placeholder="Country"
          Icon={FiGlobe}
          // value={country}
          // onChange={(e) =>
          //   setFormData({ ...formData, country: e.target.value })
          // }
        />
        <AuthInput
          label="Date Of Birth"
          type="date"
          Icon={FiCalendar}
          // value={dob}
          // onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
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
