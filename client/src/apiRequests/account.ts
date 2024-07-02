import { AccountResponseType, UpdateMeBodyType } from "@/app/me/validation";
import http from "@/lib/https";

const accountApiRequest = {
  me: (sessionToken: string) =>
    http.get<AccountResponseType>("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  meClient: () => http.get<AccountResponseType>("account/me"),
  updateMe: (body: UpdateMeBodyType) => http.put<AccountResponseType>("account/me", body),
};

export default accountApiRequest;
