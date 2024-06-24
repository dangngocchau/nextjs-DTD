import { LoginResponseType } from "@/app/(auth)/login/validation";
import envConfig from "../../config";
import { normalizePath } from "./utils";

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
};

type EntityErrorPayload = {
  message: string;
  errors: { field: string; message: string }[];
};

const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

const SessionTokenPathName = ["auth/login", "auth/register"];

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ payload, status }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}


export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: 422;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });
    if (status !== ENTITY_ERROR_STATUS) {
      throw new Error("EntityError must have status 422");
    }
    this.status = status;
    this.payload = payload;
  }
}

class SessionToken {
  private token = "";
  get value() {
    return this.token;
  }
  set value(token: string) {
    if (typeof window === "undefined") {
      throw new Error("Cannot set token on server side");
    }
    this.token = token;
  }
}

export const sessionToken = new SessionToken();

const request = async <Response>(
  method: "GET" | "POST" | "DELETE" | "PUT",
  url: string,
  options?: CustomOptions
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const headers = {
    "Content-Type": "application/json",
    Authorization: sessionToken.value ? `Bearer ${sessionToken.value}` : "",
    ...options?.headers,
  };

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers,
    body,
    method,
  });

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
      if (typeof window !== "undefined") {
        await fetch("/api/auth/logout", {
          method: "POST",
          body: JSON.stringify({
            force: true,
          }),
          headers: {
            ...headers,
          },
        });
        sessionToken.value = "";
        // location.href = "/login";
      }
    } else {
      throw new HttpError(data);
    }
  }
  if (typeof window !== "undefined") {
    if (SessionTokenPathName.some(item => item === normalizePath(url))) {
      sessionToken.value = (payload as LoginResponseType).data.token;
    } else if ("auth/logout" === normalizePath(url)) {
      sessionToken.value = "";
    }
  }

  return data;
};

const http = {
  get<Response>(url: string, options?: Omit<CustomOptions, "body">) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body">
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body">
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
  put<Response>(url: string, body: any, options?: Omit<CustomOptions, "body">) {
    return request<Response>("PUT", url, { ...options, body });
  },
};

export default http;
