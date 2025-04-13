import { NextResponse } from "next/server";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
export async function GET() {
  try {
    const response = await fetch(
      `${baseUrl}/api/services/app/User/GetAllStates`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
