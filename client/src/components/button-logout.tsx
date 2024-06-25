"use client";
import React from "react";
import { Button } from "./ui/button";
import authApiRequests from "@/apiRequests/auth";
import { usePathname, useRouter } from "next/navigation";
import { handleErrorApi } from "@/lib/utils";

export default function ButtonLogout() {
  const router = useRouter();
  const pathName = usePathname();
  const handleLogout = async () => {
    try {
      await authApiRequests.logoutFromNextClientToNextServer();
      router.push("/login");
    } catch (error) {
      handleErrorApi({
        error,
      });
      authApiRequests.logoutFromNextClientToNextServer(true).then((res) => {
        router.push(`/login?redirect=${pathName}`);
      });
    }
  };

  return (
    <Button className="bg-white text-black dark:bg-[#000817] dark:text-white" size={"sm"} onClick={handleLogout}>
      Logout
    </Button>
  );
}
