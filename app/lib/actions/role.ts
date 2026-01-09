"use server";
import {
  GetPermissionsResponse,
  GetRoleForEditResponse,
  GetRolesResponse,
  GetAllRolesResponse,
  Role,
  ApiResponse,
} from "../definitions";
import api from "../api/axios";

export const getRoles = async (params: string): Promise<GetRolesResponse> => {
  try {
    const response = await api.get<GetRolesResponse>(
      `/api/services/app/Role/GetRoles?${params}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching roles:", error?.response?.data);
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

export const getAllRoles = async (
  params?: Partial<{
    permission: string;
  }>
): Promise<GetAllRolesResponse> => {
  try {
    const response = await api.get<GetAllRolesResponse>(
      `/api/services/app/Role/GetAll`,
      {
        params,
      }
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching all roles:", error?.response?.data);
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

export const getRoleForEdit = async (
  id: string
): Promise<GetRoleForEditResponse> => {
  try {
    const response = await api.get<GetRoleForEditResponse>(
      `/api/services/app/Role/GetRoleForEdit?Id=${id}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching role for edit:", error?.response?.data);
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

export const getPermissions = async (): Promise<GetPermissionsResponse> => {
  try {
    const response = await api.get<GetPermissionsResponse>(
      `/api/services/app/Role/GetAllPermissions`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error fetching permissions:", error?.response?.data);
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

export const createRole = async (
  role: Omit<Role, "id">
): Promise<ApiResponse<Role>> => {
  try {
    const response = await api.post<ApiResponse<Role>>(
      `/api/services/app/Role/Create`,
      role
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating role:", error?.response?.data);
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
export const updateRole = async (role: Role): Promise<ApiResponse<Role>> => {
  try {
    const response = await api.put<ApiResponse<Role>>(
      `/api/services/app/Role/Update`,
      role
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error updating role:", error?.response?.data);
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

export const deleteRole = async (id: number): Promise<ApiResponse<null>> => {
  try {
    const response = await api.delete<ApiResponse<null>>(
      `/api/services/app/Role/Delete?Id=${id}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error deleting role:", error?.response?.data);
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

export const getRole = async (id: number): Promise<ApiResponse<Role>> => {
  try {
    const response = await api.get<ApiResponse<Role>>(
      `/api/services/app/Role/Get?Id=${id}`
    );
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error getting role:", error?.response?.data);
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
