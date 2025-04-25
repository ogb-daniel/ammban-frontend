import {
  ApiResponse,
  GetAllTransactionLimitsResponse,
  ValidateTransactionBody,
} from "../definitions";

export const getAllTransactionLimits = async (
  params: string
): Promise<GetAllTransactionLimitsResponse> => {
  const response = await fetch(`/api/userTransactionLimit?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch transaction limits");
  }
  return response.json();
};

export const getUserRemainingLimit = async (
  params: string
): Promise<ApiResponse<number>> => {
  const response = await fetch(
    `/api/userTransactionLimit/getUserRemainingLimit?${params}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transaction limits");
  }
  return response.json();
};

export const validateTransaction = async (
  body: ValidateTransactionBody
): Promise<ApiResponse<boolean>> => {
  const response = await fetch(
    `/api/userTransactionLimit/validateTransaction`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to validate transaction");
  }
  return response.json();
};

export const setTransactionLimit = async (
  params: string
): Promise<ApiResponse<null>> => {
  const response = await fetch(
    `/api/userTransactionLimit/setTransactionLimit?${params}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to set transaction limit");
  }
  return response.json();
};

export const deleteUserTransactionLimit = async (
  params: string
): Promise<ApiResponse<null>> => {
  const response = await fetch(
    `/api/userTransactionLimit/deleteUserTransactionLimit?${params}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete transaction limit");
  }
  return response.json();
};
