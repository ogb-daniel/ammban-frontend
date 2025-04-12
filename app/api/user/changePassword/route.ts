import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const response = await fetch(
      `${baseUrl}/api/services/app/User/ChangePassword`,
      {
        method: "POST",
        body: await request.json(),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
