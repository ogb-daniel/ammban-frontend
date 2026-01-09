"use server";
import {
  ApiResponse,
  ChangePasswordBody,
  CreateUserBody,
  CreateUserResponse,
  DeleteUserResponse,
  GetAllUsersResponse,
  GetUserDocumentResponse,
  GetUserResponse,
  GetUserRolesResponse,
  ResetPasswordBody,
  SetupPinBody,
  SetupPinResponse,
  States,
  VerifyPinBody,
  VerifyPinResponse,
} from "../definitions";
import api from "../api/axios";

export const getUser = async (id: number): Promise<GetUserResponse> => {
  try {
    const response = await api.get<GetUserResponse>(
      `/api/services/app/User/Get?Id=${id}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching user:", error?.response?.data);
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

export const getAllUsers = async (params: {
  Keyword?: string;
  SkipCount?: number;
  MaxResultCount?: number;
  IsActive?: boolean;
}): Promise<GetAllUsersResponse> => {
  try {
    const response = await api.get<GetAllUsersResponse>(
      `/api/services/app/User/GetAll`,
      {
        params,
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching users:", error?.response?.data);
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

export const createUser = async (
  body: CreateUserBody
): Promise<CreateUserResponse> => {
  try {
    const response = await api.post<CreateUserResponse>(
      `/api/services/app/User/Create`,
      body
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating user:", error?.response?.data);
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

export const updateUser = async (
  body: Partial<CreateUserBody> & {
    id: number;
    fullName: string;
    surname: string;
  }
): Promise<CreateUserResponse> => {
  try {
    const response = await api.put<CreateUserResponse>(
      `/api/services/app/User/Update`,
      body
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating user:", error?.response?.data);
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

export const deleteUser = async (id: number): Promise<DeleteUserResponse> => {
  try {
    const response = await api.delete<DeleteUserResponse>(
      `/api/services/app/User/Delete?Id=${id}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error deleting user:", error?.response?.data);
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

export const approveUser = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const response = await api.post<ApiResponse<null>>(
      `/api/services/app/User/Approve`,
      { id }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error approving user:", error?.response?.data);
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

export const disapproveUser = async (
  id: number
): Promise<ApiResponse<null>> => {
  try {
    const response = await api.post<ApiResponse<null>>(
      `/api/services/app/User/DisApprove`,
      { id }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error disapproving user:", error?.response?.data);
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

export const assignRole = async (params: {
  userId: number;
  roleName: string;
}): Promise<ApiResponse<null>> => {
  try {
    const response = await api.post<ApiResponse<null>>(
      `/api/services/app/User/AssignRoleToUser`,
      {},
      { params }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error assigning role:", error);
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

export const getRoles = async (): Promise<GetUserRolesResponse> => {
  try {
    const response = await api.get<GetUserRolesResponse>(
      `/api/services/app/User/GetRoles`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching roles:", error);
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

export const changePassword = async (
  body: ChangePasswordBody
): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `/api/services/app/User/ChangePassword`,
      body
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error changing password:", error);
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
export const generatePasswordResetToken = async (params: {
  Email?: string;
}): Promise<ApiResponse<string>> => {
  try {
    const response = await api.post<ApiResponse<string>>(
      `/api/services/app/User/GeneratePasswordResetToken`,
      {},
      {
        params,
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error changing password:", error);
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

export const resetPassword = async (
  body: ResetPasswordBody
): Promise<
  ApiResponse<{
    success: boolean;
    message: string;
    errors: string[];
  }>
> => {
  try {
    const response = await api.post<
      ApiResponse<{
        success: boolean;
        message: string;
        errors: string[];
      }>
    >(`/api/services/app/User/ResetPassword`, body);
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error resetting password:", error);
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

export const getAllStates = async (): Promise<ApiResponse<States[]>> => {
  try {
    const response = await api.get<ApiResponse<States[]>>(
      `/api/services/app/Account/GetAllStates`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching states:", error);
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

export const getUserDocument = async (
  userId: string,
  documentType: string
): Promise<GetUserDocumentResponse> => {
  try {
    const response = await api.get<GetUserDocumentResponse>(
      `/api/services/app/Account/GetUserDocument?userId=${userId}&documentType=${documentType}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching user document:", error?.response?.data);
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

export const verifyUserDocument = async (
  userId: string
): Promise<ApiResponse<{ success: boolean }>> => {
  try {
    const response = await api.post<ApiResponse<{ success: boolean }>>(
      `/api/services/app/User/VerifyUserDocument`,
      { id: userId }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error verifying user document:", error?.response?.data);
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

export const setupPin = async (
  body: SetupPinBody
): Promise<SetupPinResponse> => {
  try {
    const response = await api.post<ApiResponse<null>>(
      `/api/services/app/SecurityPin/Setup`,
      body
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error setting up pin:", error);
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

export const verifyPin = async (
  params: VerifyPinBody
): Promise<VerifyPinResponse> => {
  try {
    const response = await api.post<VerifyPinResponse>(
      `/api/services/app/SecurityPin/Verify?pin=${params.pin}`
    );
    console.log(response);

    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error verifying pin:", error);
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
