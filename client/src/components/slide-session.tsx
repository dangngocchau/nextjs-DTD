"use client";
import authApiRequests from "@/apiRequests/auth";
import { sessionToken } from "@/lib/https";
import React from "react";

export default function SlideSession() {
  const slideSession = async () => {
    const res = await authApiRequests.slideSessionFromNextClientToNextServer();
    sessionToken.expiresAt = res.payload.data.expiresAt;
  };
  return (
    <div>
      <button>Click to Slide Session</button>
    </div>
  );
}
