import { GetUserResponse } from "../definitions";

export const getUser = async (id: number): Promise<GetUserResponse> => {
  const response = await fetch(`/api/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};
