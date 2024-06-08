'use client'

import React, { useEffect } from "react";
import envConfig from "../../../config";
import { useAppContext } from "../AppProvider";

export default function ProfileMe() {
  const { sessionToken } = useAppContext();
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
    };

    fetchRequest();
  }, []);

  return <div>Profile</div>;
}
