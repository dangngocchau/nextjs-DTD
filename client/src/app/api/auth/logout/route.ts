import authApiRequests from "@/apiRequests/auth";
import { HttpError } from "@/lib/https";
import { cookies, headers } from "next/headers";

export async function POST(request: Request) {
  const res = await request.json();
  const force = res.force as boolean | undefined;
  if (force) {
    return Response.json(
      { message: "You have to logout" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Max-age:0`,
        },
      }
    );
  }

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
    const result = await authApiRequests.logoutFromNextServertoServer(
      sessionToken.value
    );
    return Response.json(result.payload, {
      status: 200,
      headers: {
        // Clear cookie
        "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Max-age:0`,
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
