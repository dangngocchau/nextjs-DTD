"use client";

import authApiRequests from "@/apiRequests/auth";
import { sessionToken } from "@/lib/https";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

export default function Logout() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const token = searchParams.get("sessionToken");

  useEffect(() => {
    if (token === sessionToken.value) {
      authApiRequests.logoutFromNextClientToNextServer(true).then((res) => {
        router.push(`/login?redirect=${pathname}`);
      });
    }
  }, [token, pathname, router]);
  return <div>Logout</div>;
}
