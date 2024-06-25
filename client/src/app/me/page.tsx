import accountApiRequest from "@/apiRequests/account";
import { cookies } from "next/headers";
import ProfileMe from "./profile";

export default async function Profile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')
  const result = await accountApiRequest.me(sessionToken?.value ?? '');

  return <div>
    <h1>Profile</h1>
    <div>Hello {result.payload.data?.name}</div>
    {/* <ProfileMe /> */}
  </div>;
}
