import { z } from "zod";

export const SignupFormSchema = z
  .object({
    referralCode: z.string().nonempty("Referral code is required"),
    firstName: z.string().nonempty("First name is required"),
    lastName: z.string().nonempty("Last name is required"),
    userName: z.string().nonempty("Username is required"),
    phoneNumber: z.string().nonempty("Phone number is required"),
    emailAddress: z.string().email("Invalid email address"),
    address: z.string().nonempty("Address is required"),
    stateId: z.number(),
    dateOfBirth: z.string().nonempty("Date of birth is required"),
    gender: z.number(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&#]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
// Email and phone number validation schema

const userNameOrEmailAddrezssSchema = z.union([
  z.string().email("Invalid email address"), // Validate email
  z.string().nonempty("Username is required"),
]);
export const SignInSchema = z.object({
  userNameOrEmailAddress: userNameOrEmailAddrezssSchema,
  password: z.string(),
});
export const EditUserInformationSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  // phoneNumber: z.string().nonempty("Phone number is required"),
  email: z.string().email("Invalid email address"),
  // address: z.string().nonempty("Address is required"),
  // state: z.string().nonempty("State is required"),
  dateOfBirth: z.string().nonempty("Date of birth is required"),
  // gender: z.string().nonempty("Gender is required"),
});
export type FormState =
  | {
      errors?: {
        [key: string]: string[];
      };
      message?: string;
    }
  | undefined;

export type User = {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: true;
  fullName: string;
  lastLoginTime: string;
  creationTime: string;
  roleNames: string[];
  role?: string;
  id: number;
};

export type Role = {
  name: string;
  displayName: string;
  normalizedName: string;
  description: string;
  grantedPermissions: string[];
  id: number;
};
export type Permission = {
  name: string;
  displayName: string;
  description: string;
  id: number;
};
export type CommissionPercentage = {
  roleId: number;
  percentage: number;
  roleName: string;
  customerType: number;
};

export type Commission = {
  transactionReference: string;
  policyCost: number;
  amount: number;
  roleName: string;
  customerType: number;
  userId: number;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryName: string;
};

export type ProductCategory = {
  id: number;
  name: string;
  description: string;
  industry: string;
};

export type TransactionLimit = {
  id: number;
  userId: number;
  dailyLimit: number;
  currentDayTransaction: number;
  creationTime: string;
  creatorUserId: number;
  lastModificationTime: string;
  lastModifierUserId: number;
  isDeleted: boolean;
  deleterUserId: number;
  deletionTime: string;
};

export type States = {
  id: number;
  creationTime: string;
  creatorUserId: number;
  lastModificationTime: string;
  lastModifierUserId: number;
  isDeleted: boolean;
  deleterUserId: number;
  deletionTime: string;
  stateName: string;
  regionId: number;
};

export interface ApiResponse<T> {
  result: T;
  targetUrl: null;
  success: boolean;
  error: {
    code: number;
    message: string;
    details: string[];
  };
  unAuthorizedRequest: boolean;
  __abp: boolean;
}
export interface IRegisterBody {
  name: string;
  sureName: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  address: string;
  stateId: number;
  dateOfBirth: string;
  gender: number;
  referralCode: string;
}
export interface RegisterResponse extends ApiResponse<{ canLogin: boolean }> {
  result: {
    canLogin: boolean;
  };
}

export interface ILoginBody {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
}

export interface LoginResponse
  extends ApiResponse<{
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: number;
  }> {
  result: {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: number;
  };
}

export interface GetUserResponse extends ApiResponse<User> {
  result: User;
}
export interface GetAllUsersResponse
  extends ApiResponse<{ items: User[]; totalCount: number }> {
  result: {
    items: User[];
    totalCount: number;
  };
}

export interface CreateUserBody {
  userName: string;
  name: string;
  sureName: string;
  emailAddress: string;
  password: string;
  phoneNumber: string;
  address: string;
  gender: number;
  dateOfBirth: string;
  referralCode: string;
  stateId: number;
}

export interface CreateUserResponse extends ApiResponse<User> {
  result: User;
}

export interface DeleteUserResponse extends ApiResponse<null> {
  result: null;
}

export interface ApproveUserBody {
  id: number;
}

export interface AssignRoleBody {
  id: number;
  roleName: string;
}

export interface GetUserRolesResponse extends ApiResponse<{ items: Role[] }> {
  result: {
    items: Role[];
  };
}

export interface ChangePasswordBody {
  userName: string;
}

export interface ResetPasswordBody {
  resetCode: string;
  userName: string;
  newPassword: string;
}

export interface SetupCommissionPercentageBody {
  roleId: number;
  percentage: number;
  roleName: string;
  customerType: number;
}

export interface GetAllCommissionPercentagesResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: { totalCount: number; items: CommissionPercentage[] };
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: {
      totalCount: number;
      items: CommissionPercentage[];
    };
  };
}

export interface GetAllCommissionsResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: { totalCount: number; items: Commission[] };
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: {
      totalCount: number;
      items: Commission[];
    };
  };
}

export interface CreateProductBody {
  name: string;
  description: string;
  categoryId: number;
  price: number;
  quantity: number;
}

export interface CreateProductResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: Product;
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: Product;
  };
}
export interface DeleteProductResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: null;
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: null;
  };
}

export interface GetAllProductsResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: { totalCount: number; items: Product[] };
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: {
      totalCount: number;
      items: Product[];
    };
  };
}

export interface GetProductResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: Product;
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: Product;
  };
}

export interface CreateProductCategoryBody {
  name: string;
  description: string;
  industry: string;
}

export interface CreateProductCategoryResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: ProductCategory;
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: ProductCategory;
  };
}

export interface DeleteProductCategoryResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: null;
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: null;
  };
}

export interface GetAllProductCategoriesResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: { totalCount: number; items: ProductCategory[] };
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: {
      totalCount: number;
      items: ProductCategory[];
    };
  };
}

export interface GetProductCategoryResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: ProductCategory;
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: ProductCategory;
  };
}

export interface GetRolesResponse
  extends ApiResponse<{
    items: {
      name: string;
      displayName: string;
      isStatic: boolean;
      isDefault: boolean;
      creationTime: string;
      id: number;
    }[];
  }> {
  result: {
    items: {
      name: string;
      displayName: string;
      isStatic: boolean;
      isDefault: boolean;
      creationTime: string;
      id: number;
    }[];
  };
}

export interface GetPermissionsResponse
  extends ApiResponse<{
    items: {
      name: string;
      displayName: string;
      description: string;
      id: number;
    }[];
  }> {
  result: {
    items: {
      name: string;
      displayName: string;
      description: string;
      id: number;
    }[];
  };
}

export interface GetRoleForEditResponse
  extends ApiResponse<{
    role: {
      id: number;
      name: string;
      displayName: string;
      description: string;
      isStatic: boolean;
    };
    permissions: {
      name: string;
      displayName: string;
      description: string;
    }[];
    grantedPermissionNames: string[];
  }> {
  result: {
    role: {
      id: number;
      name: string;
      displayName: string;
      description: string;
      isStatic: boolean;
    };
    permissions: {
      name: string;
      displayName: string;
      description: string;
    }[];
    grantedPermissionNames: string[];
  };
}

export interface GetAllRolesResponse
  extends ApiResponse<{
    items: Role[];
    totalCount: number;
  }> {
  result: {
    items: Role[];
    totalCount: number;
  };
}

export interface GetAllTransactionLimitsResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: { totalCount: number; items: TransactionLimit[] };
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: {
      totalCount: number;
      items: TransactionLimit[];
    };
  };
}

export interface ValidateTransactionBody {
  userId: number;
  transactionAmount: number;
}
