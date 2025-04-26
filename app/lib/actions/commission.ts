"use server";
import { ApiResponse, SetupCommissionPercentageBody } from "../definitions";
import api from "../api/axios";

export const setupCommissionPercentage = async (
  body: SetupCommissionPercentageBody
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `/api/services/app/Commission/SetupCommissionPercentage`,
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
  params: string
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.get<ApiResponse<string>>(
      `/api/services/app/Commission/GetAllCommissionPercentages?${params}`
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
  params: string
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.get<ApiResponse<string>>(
      `/api/services/app/Commission/GetAllCommissions?${params}`
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
