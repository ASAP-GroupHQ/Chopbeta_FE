"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { authService } from "@/services/auth";

interface GoogleSignInButtonProps {
  disabled?: boolean;
  className: string;
}

export default function GoogleSignInButton({
  disabled = false,
  className,
}: GoogleSignInButtonProps) {
  const startGoogleSignIn = () => {
    window.location.assign(authService.googleLoginUrl());
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={startGoogleSignIn}
      className={className}
    >
      <FcGoogle size={18} /> Google
    </button>
  );
}
