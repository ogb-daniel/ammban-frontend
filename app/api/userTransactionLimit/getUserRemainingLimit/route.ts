import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
const baseUrl = process.env.API_URL;
export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const queryString = searchParams.toString();
    const endpoint = queryString
      ? `${baseUrl}/api/services/app/UserTransactionLimit/GetUserRemainingLimit?${queryString}`
      : `${baseUrl}/api/services/app/UserTransactionLimit/GetUserRemainingLimit`;

    const response = await fetch(endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
