import api from "../api/axios";
import {
  ApiResponse,
  CommissionsEarnedResponse,
  GetReferredUsersResponse,
  TotalSalesByAgentsResponse,
  TotalSalesResponse,
} from "../definitions";

export const commissionsEarned = async (): Promise<
  ApiResponse<CommissionsEarnedResponse>
> => {
  try {
    const response = await api.post<ApiResponse<CommissionsEarnedResponse>>(
      `/api/services/app/DashBoardService/CommissionsEarned`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error getting commissions earned:", error?.response?.data);
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

export const getReferredUsers = async (): Promise<
  ApiResponse<GetReferredUsersResponse>
> => {
  try {
    const response = await api.get<ApiResponse<GetReferredUsersResponse>>(
      `/api/services/app/DashBoardService/GetReferredUsers`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error getting referred users:", error?.response?.data);
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

export const totalSales = async (): Promise<
  ApiResponse<TotalSalesResponse>
> => {
  try {
    const response = await api.post<ApiResponse<TotalSalesResponse>>(
      `/api/services/app/DashBoardService/TotalSales`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error getting total sales:", error?.response?.data);
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

export const totalSalesByAgents = async (): Promise<
  ApiResponse<TotalSalesByAgentsResponse>
> => {
  try {
    const response = await api.post<ApiResponse<TotalSalesByAgentsResponse>>(
      `/api/services/app/DashBoardService/TotalSalesByAgents`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error getting total sales:", error?.response?.data);
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
export const totalSalesByAggregator = async (): Promise<
  ApiResponse<TotalSalesByAgentsResponse>
> => {
  try {
    const response = await api.post<ApiResponse<TotalSalesByAgentsResponse>>(
      `/api/services/app/DashBoardService/TotalSalesByAggregator`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error getting total sales:", error?.response?.data);
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
