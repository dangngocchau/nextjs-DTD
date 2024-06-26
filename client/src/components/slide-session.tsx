"use client";
import authApiRequests from "@/apiRequests/auth";
import { sessionToken } from "@/lib/https";
import React, { useEffect } from "react";
import { differenceInHours } from "date-fns";

export default function SlideSession() {
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();
      const expiresAt = new Date(sessionToken.expiresAt);
      if (differenceInHours(expiresAt, now) > 1) {
        const res =
          await authApiRequests.slideSessionFromNextClientToNextServer();
        sessionToken.expiresAt = res.payload.data.expiresAt;
      }
    }, 1000 * 60 * 60);
    return () => clearInterval(interval); // Clear interval on unmount
  }, []);
  return null;
}
