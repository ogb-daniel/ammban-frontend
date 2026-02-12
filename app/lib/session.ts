"use server";
import "server-only";
import { cookies } from "next/headers";
import { User } from "./definitions";
import { refreshToken } from "./actions/user";

export async function createSession(
  accessToken: string,
  expireInSeconds: number,
  role: string,
  user: User,
  refreshToken: string,
  refreshTokenExpireInSeconds: number,
) {
  const cookieStore = await cookies();

  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: expireInSeconds,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: refreshTokenExpireInSeconds,
    sameSite: "lax",
    path: "/",
  });

  cookieStore.set("role", role, {
    // NOT httpOnly so you can read on client if needed
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  if (user) {
    cookieStore.set("user", JSON.stringify(user), {
      // NOT httpOnly so you can read on client if needed
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}

export async function getSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const role = cookieStore.get("role")?.value;
  const user = cookieStore.get("user")?.value;
  return {
    accessToken,
    role,
    user,
    refreshToken,
  };
}

export async function refreshSession() {
  const cookieStore = await cookies();
  const oldRefreshToken = cookieStore.get("refreshToken")?.value;
  const role = cookieStore.get("role")!.value;
  const user = JSON.parse(cookieStore.get("user")!.value);
  if (oldRefreshToken) {
    const refreshResponse = await refreshToken({
      refreshToken: oldRefreshToken,
    });
    if (refreshResponse?.result?.accessToken) {
      const {
        accessToken,
        refreshToken: newRefreshToken,
        expireInSeconds,
        refreshTokenExpireInSeconds,
      } = refreshResponse.result;
      await createSession(
        accessToken,
        expireInSeconds,
        role,
        user,
        newRefreshToken,
        refreshTokenExpireInSeconds,
      );
    }
  }
}
