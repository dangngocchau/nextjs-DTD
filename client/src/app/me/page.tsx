import accountApiRequest from "@/apiRequests/account";
import { cookies } from "next/headers";
import ProfileMe from "./profile";
import ProfileForm from "./profile-form";

export default async function Profile() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken')
  const result = await accountApiRequest.me(sessionToken?.value ?? '');

  return <div>
    <h1 className="text-center mt-5 font-bold">YOUR PROFILE</h1>
    <div className="flex items-center justify-center mt-8">
      <ProfileForm profile={result.payload.data} />
    </div>
  </div>;
}
