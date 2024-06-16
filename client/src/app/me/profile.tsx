"use client";

import accountApiRequest from "@/apiRequests/account";
import { sessionToken } from "@/lib/https";
import { useEffect } from "react";

export default function ProfileMe() {
  console.log(sessionToken.value);
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.me(sessionToken.value);
    };

    fetchRequest();
  }, []);


  return <div>Profile</div>;
}
