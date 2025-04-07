import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";

const baseUrl = process.env.API_URL;

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string; roleName: string } }
) {
  try {
    const session = await getSession();
    if (!session.accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, roleName } = params;

    if (!id || !roleName) {
      return NextResponse.json(
        { error: "id and roleName are required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${baseUrl}/api/services/app/User/AssignRole`,
      {
        method: "POST",
        body: JSON.stringify({
          userId: parseInt(id),
          roleName: roleName,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.error?.message || "Failed to assign role" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
