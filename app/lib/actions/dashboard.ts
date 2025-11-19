"use server";
import api from "../api/axios";
import {
  CommissionsEarnedResponse,
  DownlinesResponse,
  GetReferredUsersResponse,
  MonthlyReferralResponse,
  TotalSalesByAgentsResponse,
  TotalSalesNationalResponse,
  TotalSalesResponse,
} from "../definitions";

export const commissionsEarned =
  async (): Promise<CommissionsEarnedResponse> => {
    try {
      const response = await api.post<CommissionsEarnedResponse>(
        `/api/services/app/DashBoardService/CommissionsEarned`
      );
      console.log("Commissions Earned Response:", response.data);
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

export const getReferredUsers = async (): Promise<GetReferredUsersResponse> => {
  try {
    const response = await api.get<GetReferredUsersResponse>(
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

export const totalSales = async (): Promise<TotalSalesResponse> => {
  try {
    const response = await api.post<TotalSalesResponse>(
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

export const totalSalesByAgents =
  async (): Promise<TotalSalesByAgentsResponse> => {
    try {
      const response = await api.post<TotalSalesByAgentsResponse>(
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
export const totalSalesByAggregator =
  async (): Promise<TotalSalesByAgentsResponse> => {
    try {
      const response = await api.post<TotalSalesByAgentsResponse>(
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
export const nationalTotalSales =
  async (): Promise<TotalSalesNationalResponse> => {
    try {
      const response = await api.post<TotalSalesNationalResponse>(
        `/api/services/app/DashBoardService/NationalTotalSales`
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

export const getMonthlyReferrals =
  async (): Promise<MonthlyReferralResponse> => {
    try {
      const response = await api.get<MonthlyReferralResponse>(
        `/api/services/app/DashBoardService/GetMonthlyReferrals`
      );
      console.log("Monthly Referrals Response:", response.data);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error getting monthly referrals:", error?.response?.data);
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
export const getDownlines = async (
  userId?: number
): Promise<DownlinesResponse> => {
  try {
    const url = userId
      ? `/api/services/app/DashBoardService/GetDownlines?userId=${userId}`
      : `/api/services/app/DashBoardService/GetDownlines`;
    const response = await api.get<DownlinesResponse>(url);
    console.log("Downlines Response:", response.data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error getting downlines:", error?.response?.data);
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
