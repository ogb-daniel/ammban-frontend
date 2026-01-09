"use server";
import {
  ApiResponse,
  GetAllTransactionLimitsResponse,
  ValidateTransactionBody,
} from "../definitions";
import api from "../api/axios";

export const getAllTransactionLimits = async (
  params: string
): Promise<GetAllTransactionLimitsResponse> => {
  try {
    const response = await api.get<GetAllTransactionLimitsResponse>(
      `/api/services/app/UserTransactionLimit/GetAll?${params}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching transaction limits:", error?.response?.data);
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};

export const getUserRemainingLimit = async (
  params: number
): Promise<ApiResponse<number>> => {
  try {
    const response = await api.get<ApiResponse<number>>(
      `/api/services/app/UserTransactionLimit/GetUserRemainingLimit?${params}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error fetching user remaining limit:",
      error?.response?.data
    );
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};

export const validateTransaction = async (
  body: ValidateTransactionBody
): Promise<ApiResponse<boolean>> => {
  try {
    const response = await api.post<ApiResponse<boolean>>(
      `/api/services/app/UserTransactionLimit/ValidateTransaction`,
      body
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error validating transaction:", error?.response?.data);
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};

export const setTransactionLimit = async (
  params: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await api.post<ApiResponse<null>>(
      `/api/services/app/UserTransactionLimit/SetTransactionLimit?${params}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error setting transaction limit:", error?.response?.data);
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};

export const deleteUserTransactionLimit = async (
  params: string
): Promise<ApiResponse<null>> => {
  try {
    const response = await api.delete<ApiResponse<null>>(
      `/api/services/app/UserTransactionLimit/DeleteUserTransactionLimit?${params}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error deleting transaction limit:", error?.response?.data);
    return (
      error?.response?.data || {
        success: false,
        error: {
          message: error?.response?.data?.error?.message || error?.message,
          details: error?.response?.data?.error?.details,
        },
      }
    );
  }
};
