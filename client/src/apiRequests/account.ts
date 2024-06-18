import { AccountResponseType } from "@/app/me/validation";
import http from "@/lib/https";

const accountApiRequest = {
  me: (sessionToken: string) =>
    http.get<AccountResponseType>("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    }),
  meClient: () => http.get<AccountResponseType>('account/me')
};

export default accountApiRequest;
