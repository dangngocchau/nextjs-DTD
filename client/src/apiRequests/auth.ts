import {
  LoginBodyType,
  LoginResponseType,
} from "@/app/(auth)/login/validation";
import {
  MessageResType,
  RegisterBodyType,
  RegisterResponseType,
  SlideSessionResType,
} from "@/app/(auth)/register/validation";
import http, { sessionToken } from "@/lib/https";

const authApiRequests = {
  login: (body: LoginBodyType) =>
    http.post<LoginResponseType>("/auth/login", body),
  register: (body: RegisterBodyType) =>
    http.post<RegisterResponseType>("/auth/register", body),
  auth: (body: { sessionToken: string, expiresAt: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
  logoutFromNextServertoServer: (sessionToken: string) =>
    http.post<MessageResType>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bear ${sessionToken}`,
        },
      }
    ),
  logoutFromNextClientToNextServer: (force?: boolean | undefined) =>
    http.post<MessageResType>(
      "/api/auth/logout",
      {
        force,
      },
      {
        baseUrl: "",
      }
    ),
  slideSessionFromNextServerToServer: (sessionToken: string) =>
    http.post<SlideSessionResType>(
      "/auth/slide-session",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    ),
  slideSessionFromNextClientToNextServer: () =>
    http.post<SlideSessionResType>(
      "/api/auth/slide-session",
      {},
      { baseUrl: "" }
    ),
};

export default authApiRequests;
