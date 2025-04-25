import { ApiResponse, SetupCommissionPercentageBody } from "../definitions";

export const setupCommissionPercentage = async (
  body: SetupCommissionPercentageBody
): Promise<ApiResponse<string>> => {
  const response = await fetch(`/api/commission/setupCommissionPercentage`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to setup commission percentage");
  }
  return response.json();
};

export const getAllCommissionPercentages = async (
  params: string
): Promise<ApiResponse<string>> => {
  const response = await fetch(
    `/api/commission/getAllCommissionPercentages?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get all commission percentages");
  }
  return response.json();
};

export const getAllCommissions = async (
  params: string
): Promise<ApiResponse<string>> => {
  const response = await fetch(`/api/commission/getAllCommissions?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get all commissions");
  }
  return response.json();
};
