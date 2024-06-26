"use client";

import accountApiRequest from "@/apiRequests/account";
import { sessionToken } from "@/lib/https";
import { useEffect } from "react";

export default function ProfileMe() {
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.meClient();
    };

    fetchRequest();
  }, []);


  return <div>Render Client Profile</div>;
}
