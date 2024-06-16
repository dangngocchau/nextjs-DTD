import { LoginResponseType } from "@/app/(auth)/login/validation";
import envConfig from "../../config";

type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
};

const SessionTokenPathName = ['/auth/login', '/auth/register'];

class HttpError extends Error {
  status: number;
  payload: any;
  constructor({ payload, status }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

class SessionToken {
  private token = ''
  get value() {
    return this.token;
  }
  set value(token: string) {
    if (typeof window === 'undefined') {
      throw new Error('Cannot set token on server side');
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
    throw new HttpError(data);
  }

  if (SessionTokenPathName.includes(url)) {
    sessionToken.value = (payload as LoginResponseType).data.token;
  }


  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body">
  ) {
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
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body">
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
};

export default http;
