import {
  GetPermissionsResponse,
  GetRoleForEditResponse,
  GetRolesResponse,
  GetAllRolesResponse,
  Role,
  ApiResponse,
} from "../definitions";

export const getRoles = async (params: string): Promise<GetRolesResponse> => {
  const response = await fetch(`/api/role/getRoles?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch roles");
  }
  return response.json();
};

export const getAllRoles = async (
  params: string
): Promise<GetAllRolesResponse> => {
  const response = await fetch(`/api/role/getAllRoles?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch roles");
  }
  return response.json();
};

export const getRoleForEdit = async (
  id: string
): Promise<GetRoleForEditResponse> => {
  const response = await fetch(`/api/role/getRoleForEdit?Id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch role for edit");
  }
  return response.json();
};

export const getPermissions = async (): Promise<GetPermissionsResponse> => {
  const response = await fetch(`/api/role/getAllPermissions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch permissions");
  }
  return response.json();
};

export const createRole = async (role: Role): Promise<ApiResponse<Role>> => {
  const response = await fetch(`/api/role`, {
    method: "POST",
    body: JSON.stringify(role),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create role");
  }
  return response.json();
};
export const updateRole = async (role: Role): Promise<ApiResponse<Role>> => {
  const response = await fetch(`/api/role`, {
    method: "PUT",
    body: JSON.stringify(role),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update role");
  }
  return response.json();
};

export const deleteRole = async (id: number): Promise<ApiResponse<null>> => {
  const response = await fetch(`/api/role?Id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete role");
  }
  return response.json();
};

export const getRole = async (id: number): Promise<ApiResponse<Role>> => {
  const response = await fetch(`/api/role/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to get role");
  }
  return response.json();
};
