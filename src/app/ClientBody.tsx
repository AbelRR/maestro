"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { AuthModalWrapper } from "@/components/auth/AuthModalWrapper";

interface ClientBodyProps {
  children: React.ReactNode;
}

export default function ClientBody({ children }: ClientBodyProps) {
  return (
    <AuthProvider>
      <AuthModalWrapper />
      {children}
    </AuthProvider>
  );
}
