'use client'

import React, { useEffect } from "react";
import envConfig from "../../../config";
import { useAppContext } from "../AppProvider";
import accountApiRequest from "@/apiRequests/account";

export default function ProfileMe() {
  const { sessionToken } = useAppContext();
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.me(sessionToken);
    };

    fetchRequest();
  }, []);

  return <div>Profile</div>;
}
