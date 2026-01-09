"use server";
import {
  ApiResponse,
  GetAllCommissionPercentagesResponse,
  GetAllCommissionsResponse,
  SetupCommissionPercentageBody,
} from "../definitions";
import api from "../api/axios";

export const setupCommissionPercentage = async (
  body: SetupCommissionPercentageBody
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `/api/services/app/CommissionService/SetupCommissionPercentage`,
      body
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error setting up commission percentage:",
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

export const getAllCommissionPercentages = async (
  params:
    | { MaxResultCount?: number; SkipCount?: number }
    | undefined = undefined
): Promise<GetAllCommissionPercentagesResponse> => {
  try {
    const response = await api.get<GetAllCommissionPercentagesResponse>(
      `/api/services/app/CommissionService/GetAllCommissionPercentages`,
      { params }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "Error getting all commission percentages:",
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

export const getAllCommissions = async (
  params:
    | { MaxResultCount?: number; SkipCount?: number }
    | undefined = undefined
): Promise<GetAllCommissionsResponse> => {
  try {
    const response = await api.get<GetAllCommissionsResponse>(
      `/api/services/app/CommissionService/GetAllCommissions`,
      { params }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error getting all commissions:", error?.response?.data);
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
