import { cookies } from "next/headers";
import envConfig from "../../../config";

export default async function Profile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')
  const result = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${sessionToken?.value}`
      }
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


  return <div>
    <h1>Profile</h1>
    <div>Hello {result.payload.data?.name}</div>
  </div>;
}