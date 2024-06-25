import authApiRequests from "@/apiRequests/auth";
import { HttpError } from "@/lib/https";
import { decodeJWT } from "@/lib/utils";
import { cookies } from "next/headers";

type PayloadJWT = {
  iat: number;
  exp: number;
  token: string;
  userId: number;
};

export async function POST(request: Request) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");

  if (!sessionToken) {
    return Response.json(
      { message: "Can not recieve session token" },
      {
        status: 401,
      }
    );
  }

  try {
    const res = await authApiRequests.slideSessionFromNextServerToServer(
      sessionToken.value
    );
    const newExprireDate = new Date(res.payload.data.expiresAt).toUTCString();
    return Response.json(res.payload, {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken.value}; Path=/; HttpOnly; Expires=${newExprireDate}; SameSite=Lax; Secure`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Unexpected Error",
        },
        {
          status: 500,
        }
      );
    }
  }
}
