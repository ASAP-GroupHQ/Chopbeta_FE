"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import AuthInput from "@/components/auth/AuthInput";
import {
  FiUser,
  FiMail,
  FiMapPin,
  FiGlobe,
  FiCalendar,
  FiFileText,
  FiCamera,
  FiLoader,
  FiChevronDown,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { updateProfile, uploadProfilePicture } from "@/services/settings";
import nigeriaLocations from "@/data/nigeria-states-lgas.json";

interface NigeriaState {
  state: string;
  lgas: string[];
}

export default function PersonalDetails() {
  // Destructure updateUserData instead of setUser
  const { user, updateUserData } = useAuth();
  const toast = useToast();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

  // Local state to manage form fields
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    homeAddress: "",
    lga: "",
    countryOfResidence: "",
    dob: "",
    gender: "",
    stateOfOrigin: "",
    emergencyContact: "",
    schoolName: "",
    courseOfStudy: "",
    academicLevel: "",
    profilePicture: "",
  });
  const nigeriaStates = nigeriaLocations as NigeriaState[];
  const selectedState = nigeriaStates.find(
    (state) => state.state === formData.stateOfOrigin,
  );

  const updateState = (stateName: string) => {
    const nextState = nigeriaStates.find((state) => state.state === stateName);
    setFormData((previous) => ({
      ...previous,
      stateOfOrigin: stateName,
      lga: nextState?.lgas.includes(previous.lga) ? previous.lga : "",
    }));
  };

  // Sync state when user data is fetched/available from AuthContext
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        userName: user.userName || "",
        email: user.email || "",
        homeAddress: user.houseAddress || user.address || "",
        lga: user.LGA || user.lga || "",
        countryOfResidence: user.countryOfResidence || user.country || "",
        dob: (user.dateOfBirth || user.dob || "").slice(0, 10),
        gender: user.gender || "",
        stateOfOrigin: user.stateOfOrigin || "",
        emergencyContact: user.emergencyContact || "",
        schoolName: user.schoolName || "",
        courseOfStudy: user.courseOfStudy || "",
        academicLevel: user.academicLevel || "",
        profilePicture: user.profilePicture || user.avatar || "",
      });
    }
  }, [user]);

  const handleSaveProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);

    const profile = {
      gender: formData.gender,
      dateOfBirth: formData.dob,
      LGA: formData.lga,
      countryOfResidence: formData.countryOfResidence.trim(),
      houseAddress: formData.homeAddress.trim(),
      stateOfOrigin: formData.stateOfOrigin,
    };

    try {
      const response = await updateProfile(profile);
      updateUserData({
        gender: profile.gender,
        dateOfBirth: profile.dateOfBirth,
        LGA: profile.LGA,
        countryOfResidence: profile.countryOfResidence,
        houseAddress: profile.houseAddress,
        stateOfOrigin: profile.stateOfOrigin,
      });
      toast.success(response.message);
    } catch (error) {
      toast.error(
        "Profile update failed",
        error instanceof Error
          ? error.message
          : "Could not update your profile. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Image Selection and Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File size exceeds 5MB limit.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError(null);
      setUploadSuccess(null);

      const response = await uploadProfilePicture(file);

      if (response.success && response.data?.profilePicture) {
        const newImageUrl = response.data.profilePicture;

        // Update local state
        setFormData((prev) => ({ ...prev, profilePicture: newImageUrl }));

        // Update global auth context state & sync localStorage
        updateUserData({ profilePicture: newImageUrl });

        setUploadSuccess(
          response.message || "Profile picture updated successfully",
        );
      }
    } catch (err: any) {
      const errorMsg =
        err?.response?.data?.message ||
        "Failed to upload image. Please try again.";
      setUploadError(errorMsg);
    } finally {
      setIsUploading(false);
      // Reset input value
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Generate dynamic initials for avatar placeholder
  const getInitials = () => {
    if (formData.fullName) {
      const names = formData.fullName.trim().split(" ");
      if (names.length >= 2) {
        return `${names[0][0]}${names[1][0]}`.toUpperCase();
      }
      return names[0].slice(0, 2).toUpperCase();
    }
    return "CB";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg"
        className="hidden"
      />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-gray-100">
        <div className="flex flex-col items-center sm:flex-row sm:items-start gap-4">
          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className="relative group cursor-pointer"
          >
            <div className="relative w-24 h-24 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-emerald-500">
              {formData.profilePicture ? (
                <Image
                  src={formData.profilePicture}
                  alt="Profile"
                  fill
                  sizes="96px"
                  className="object-cover"
                  priority
                />
              ) : (
                <span className="text-gray-400 font-medium text-xl">
                  {getInitials()}
                </span>
              )}

              {/* Loader Overlay */}
              {isUploading && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <FiLoader className="text-white w-6 h-6 animate-spin" />
                </div>
              )}
            </div>

            {/* Hover Action Layer */}
            {!isUploading && (
              <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <FiCamera className="text-white w-5 h-5 mb-0.5" />
                <span className="text-white text-[10px] font-semibold">
                  Change
                </span>
              </div>
            )}
          </div>

          <div className="text-center sm:text-left pt-2">
            <h4 className="text-sm font-semibold text-gray-800">
              Profile Picture
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">PNG, JPG up to 5MB</p>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 disabled:opacity-50 transition-colors cursor-pointer"
            >
              {isUploading ? "Uploading..." : "Upload New Photo"}
            </button>

            {/* Feedback Messages */}
            {uploadError && (
              <p className="text-xs text-red-500 font-medium mt-1">
                {uploadError}
              </p>
            )}
            {uploadSuccess && (
              <p className="text-xs text-emerald-600 font-medium mt-1">
                {uploadSuccess}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Grid Inputs Using AuthInput */}
      <form onSubmit={handleSaveProfile}>
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
          label="Email Address"
          type="email"
          placeholder="example@domain.com"
          Icon={FiMail}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          disabled={true}
        />

        <div className="w-full space-y-1.5 text-left">
          <label htmlFor="personal-gender" className="ml-1 text-sm font-medium text-gray-700">
            Gender
          </label>
          <div className="group relative">
            <FiUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-green-600" size={18} />
            <select
              id="personal-gender"
              value={formData.gender}
              onChange={(event) =>
                setFormData({ ...formData, gender: event.target.value })
              }
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm font-medium text-[#1A2E35] outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-500/20 disabled:cursor-not-allowed disabled:bg-gray-50"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <AuthInput
          label="Date Of Birth"
          type="date"
          Icon={FiCalendar}
          value={formData.dob}
          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
        />

        <AuthInput
          label="Country of Residence"
          placeholder="e.g. Nigeria"
          Icon={FiGlobe}
          value={formData.countryOfResidence}
          onChange={(event) =>
            setFormData({
              ...formData,
              countryOfResidence: event.target.value,
            })
          }
        />

        <div className="w-full space-y-1.5 text-left">
          <label htmlFor="personal-state" className="ml-1 text-sm font-medium text-gray-700">
            State of Origin
          </label>
          <div className="group relative">
            <FiMapPin className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-green-600" size={18} />
            <select
              id="personal-state"
              value={formData.stateOfOrigin}
              onChange={(event) => updateState(event.target.value)}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm font-medium text-[#1A2E35] outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-500/20 disabled:cursor-not-allowed disabled:bg-gray-50"
            >
              <option value="">Select state</option>
              {nigeriaStates.map((state) => (
                <option key={state.state} value={state.state}>
                  {state.state}
                </option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <div className="w-full space-y-1.5 text-left">
          <label htmlFor="personal-lga" className="ml-1 text-sm font-medium text-gray-700">
            Local Government Area
          </label>
          <div className="group relative">
            <FiFileText className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-green-600" size={18} />
            <select
              id="personal-lga"
              value={formData.lga}
              onChange={(event) =>
                setFormData({ ...formData, lga: event.target.value })
              }
              disabled={!selectedState}
              className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-10 text-sm font-medium text-[#1A2E35] outline-none transition-all focus:border-green-600 focus:ring-2 focus:ring-green-500/20 disabled:cursor-not-allowed disabled:bg-gray-50"
            >
              <option value="">
                {selectedState ? "Select LGA" : "Select a state first"}
              </option>
              {selectedState?.lgas.map((lga) => (
                <option key={lga} value={lga}>
                  {lga}
                </option>
              ))}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        <div className="w-full space-y-1.5 text-left sm:col-span-2">
          <label
            htmlFor="personal-home-address"
            className="ml-1 text-sm font-medium text-gray-700"
          >
            Home Address
          </label>
          <div className="group relative">
            <FiMapPin
              className="pointer-events-none absolute left-4 top-4 text-gray-400 transition-colors group-focus-within:text-green-600"
              size={18}
            />
            <textarea
              id="personal-home-address"
              value={formData.homeAddress}
              onChange={(event) =>
                setFormData({ ...formData, homeAddress: event.target.value })
              }
              rows={3}
              placeholder="Enter your home address"
              className="w-full resize-y rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm font-medium text-[#1A2E35] outline-none transition-all placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-500/20"
            />
          </div>
        </div>

      </div>

      {/* Save Trigger Option Footer */}
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={isSaving}
          className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-medium transition-all shadow-sm shadow-emerald-700/10 active:scale-95 cursor-pointer disabled:cursor-wait disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      </form>
    </motion.div>
  );
}
