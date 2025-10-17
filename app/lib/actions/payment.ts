"use server";
import {
  DepositFundsResponse,
  GetAccountBalanceResponse,
  GetTransactionHistoryResponse,
  GetTransactionReceiptResponse,
  SyncStatusResponse,
  SyncTransactionBody,
  SyncTransactionResponse,
  WithdrawCommissionRequestBody,
  WithdrawCommissionResponse,
  WithdrawFundsRequestBody,
  WithdrawFundsResponse,
} from "../definitions";
import api from "../api/axios";

export const getAccountBalance =
  async (): Promise<GetAccountBalanceResponse> => {
    try {
      const response = await api.post<GetAccountBalanceResponse>(
        `/api/services/app/PaymentService/AccountBalance`
      );
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error getting balance:", error?.response?.data);
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

export const withdrawFunds = async (
  body: WithdrawFundsRequestBody
): Promise<WithdrawFundsResponse> => {
  try {
    const response = await api.post<WithdrawFundsResponse>(
      `/api/services/app/PaymentService/WithdrawFunds`,
      body
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error withdrawing funds:", error?.response?.data);
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
export const withdrawCommission = async (
  body: WithdrawCommissionRequestBody
): Promise<WithdrawCommissionResponse> => {
  try {
    const response = await api.post<WithdrawCommissionResponse>(
      `/api/services/app/PaymentService/WithdrawCommission?amount=${body.amount}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error withdrawing funds:", error?.response?.data);
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

export const depositFunds = async (): Promise<DepositFundsResponse> => {
  try {
    const response = await api.post<DepositFundsResponse>(
      `/api/services/app/PaymentService/DepositFunds`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error depositing funds:", error?.response?.data);
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

export const syncTransaction = async (
  body: SyncTransactionBody
): Promise<SyncTransactionResponse> => {
  try {
    const response = await api.post<SyncTransactionResponse>(
      `/api/services/app/PolicyService/SyncTransaction`,
      body
    );
    console.log("Sync Transaction Response:", response.data);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error syncing transaction:", error?.response?.data);
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

export const getSyncStatus = async (
  transactionId: string
): Promise<SyncStatusResponse> => {
  try {
    const response = await api.get<SyncStatusResponse>(
      `/api/services/app/PolicyService/GetSyncStatus`,
      { params: { transactionId } }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error getting sync status:", error?.response?.data);
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

export const getTransactionHistory =
  async (): Promise<GetTransactionHistoryResponse> => {
    try {
      const response = await api.get<GetTransactionHistoryResponse>(
        `/api/services/app/PolicyService/GetTransactionHistory`
      );
      console.log("Transaction History Response:", response.data);

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "Error getting transaction history:",
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
export const transactionReceipt = async (
  transactionId: string
): Promise<GetTransactionReceiptResponse> => {
  try {
    const response = await api.post<GetTransactionReceiptResponse>(
      `/api/services/app/PolicyService/TransactionReceipt`,
      { params: { transactionId } }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error getting transaction receipt:", error?.response?.data);
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
