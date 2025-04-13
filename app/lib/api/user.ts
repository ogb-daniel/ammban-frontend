import {
  ApiResponse,
  ChangePasswordBody,
  CreateUserBody,
  CreateUserResponse,
  DeleteUserResponse,
  GetAllUsersResponse,
  GetUserResponse,
  GetUserRolesResponse,
  ResetPasswordBody,
} from "../definitions";

export const getUser = async (id: number): Promise<GetUserResponse> => {
  const response = await fetch(`/api/user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }

  return response.json();
};

export const getAllUsers = async (): Promise<GetAllUsersResponse> => {
  const response = await fetch(`/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

export const createUser = async (
  body: CreateUserBody
): Promise<CreateUserResponse> => {
  const response = await fetch(`/api/user`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create user");
  }

  return response.json();
};

export const updateUser = async (
  body: CreateUserBody
): Promise<CreateUserResponse> => {
  const response = await fetch(`/api/user`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
};

export const deleteUser = async (id: number): Promise<DeleteUserResponse> => {
  const response = await fetch(`/api/user/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }
  return response.json();
};

export const approveUser = async (id: number): Promise<ApiResponse<null>> => {
  const response = await fetch(`/api/user/approve`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to approve user");
  }
  return response.json();
};

export const disapproveUser = async (
  id: number
): Promise<ApiResponse<null>> => {
  const response = await fetch(`/api/user/disapprove`, {
    method: "POST",
    body: JSON.stringify({ id }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to disapprove user");
  }
  return response.json();
};

export const assignRole = async (
  id: number,
  roleName: string
): Promise<ApiResponse<null>> => {
  const response = await fetch(`/api/user/${id}/assign-role/${roleName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to assign role");
  }
  return response.json();
};

export const getRoles = async (): Promise<GetUserRolesResponse> => {
  const response = await fetch(`/api/user/getRoles`, {
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

export const changePassword = async (
  body: ChangePasswordBody
): Promise<ApiResponse<string>> => {
  const response = await fetch(`/api/user/changePassword`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to change password");
  }
  return response.json();
};

export const resetPassword = async (
  body: ResetPasswordBody
): Promise<ApiResponse<string>> => {
  const response = await fetch(`/api/user/resetPassword`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to reset password");
  }
  return response.json();
};
