import { LoginBodyType, LoginResponseType } from "@/app/(auth)/login/validation";
import { RegisterBodyType, RegisterResponseType } from "@/app/(auth)/register/validation";
import http from "@/lib/https";

const authApiRequests = {
    login: (body: LoginBodyType) => http.post<LoginResponseType>("/auth/login", body),
    register: (body: RegisterBodyType) => http.post<RegisterResponseType>("/auth/register", body),
    auth: (body: {
        sessionToken: string;
    }) => http.post("/api/auth", body, {
        baseUrl: "",
    }),
}


export default authApiRequests;