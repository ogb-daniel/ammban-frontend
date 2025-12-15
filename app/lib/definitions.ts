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
    governmentId: z.any().nullable(),
    selfie: z.any().nullable(),
    proofOfAddress: z.any().nullable(),
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
  roleName: string;
  role: string;
  id: number;
  walletBalance: number;
  phoneNumber?: string;
  commissionEarnings?: number;
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
  roleId: number;
  percentage: number;
  id: number;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryName: string;
  productCode?: string;
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

export type Transaction = {
  productName: string;
  customerName: string;
  phoneNumber: string;
  status: number;
  amount: number;
};

export type WithdrawalHistory = {
  amount: number;
  narration: string;
  status: "SUCCESS" | "PENDING" | "FAILED" | null;
  beneficiaryAccountNumber: string;
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
    userID: number;
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
  resetToken: string;
  email: string;
  newPassword: string;
}

export interface SetupPinBody {
  newPin: string;
  confirmPin: string;
}
export interface VerifyPinBody {
  pin: string;
}

export interface SetupPinResponse extends ApiResponse<null> {
  result: null;
}
export interface VerifyPinResponse extends ApiResponse<boolean> {
  result: boolean;
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

export interface GetCurrentLoginInformationsResponse
  extends ApiResponse<{
    user: User;
  }> {
  result: {
    user: User;
  };
}

export interface GetAccountBalanceResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: {
      availableBalance: number;
      accountNumber: string;
      accountName: string;
    };
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: {
      availableBalance: number;
      accountNumber: string;
      accountName: string;
    };
  };
}

export interface WithdrawFundsRequestBody {
  amount: number;
  beneficiaryAccountNumber: string;
  beneficiaryBankName: string;
  beneficiaryBankCode: string;
  narration: string;
  securityPin: string;
}
export interface WithdrawCommissionRequestBody {
  amount: number;
}

export interface WithdrawFundsResponse
  extends ApiResponse<{
    requestSuccessful: boolean;
    responseMessage: string;
    responseCode: number;
    responseBody: {
      reference: string;
      amount: number;
      status: string;
      dateCreated: string;
      totalFee: number;
      destinationBankName: string;
      destinationAccountNumber: string;
      destinationAccountName: string;
      destinationBankCode: string;
    };
  }> {
  result: {
    requestSuccessful: boolean;
    responseMessage: string;
    responseCode: number;
    responseBody: {
      reference: string;
      amount: number;
      status: string;
      dateCreated: string;
      totalFee: number;
      destinationBankName: string;
      destinationAccountNumber: string;
      destinationAccountName: string;
      destinationBankCode: string;
    };
  };
}
export interface WithdrawCommissionResponse
  extends ApiResponse<{
    message: string;
    payload: string;
    responseCode: number;
  }> {
  result: {
    message: string;
    payload: string;
    responseCode: number;
  };
}

export interface DepositFundsResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: {
      accountName: string;
      accountNumber: string;
      bankName: string;
      bankCode: string;
    };
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: {
      accountName: string;
      accountNumber: string;
      bankName: string;
      bankCode: string;
    };
  };
}

export interface SyncTransactionBody {
  narration: string;
  amount: number;
  isTrial: boolean;
  productId: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  stateId: number;
  dateOfBirth: string;
  gender: string;
}

export interface SyncTransactionResponse
  extends ApiResponse<{
    status: boolean;
    message: string;
    data: {
      effectiveDate: string;
      expiryDate: string;
      customerID: string;
      transactionID: string;
    };
  }> {
  result: {
    status: boolean;
    message: string;
    data: {
      effectiveDate: string;
      expiryDate: string;
      customerID: string;
      transactionID: string;
    };
  };
}
export interface SyncStatusResponse
  extends ApiResponse<{
    status: boolean;
    message: string;
    data: {
      effectiveDate: string;
      expiryDate: string;
      trackNumber: string;
      transactionID: string;
    };
  }> {
  result: {
    status: boolean;
    message: string;
    data: {
      effectiveDate: string;
      expiryDate: string;
      trackNumber: string;
      transactionID: string;
    };
  };
}

export interface GetTransactionHistoryResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: {
      totalCount: number;
      items: {
        productName: string;
        customerName: string;
        phoneNumber: string;
        status: number;
        amount: number;
      }[];
    };
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: {
      totalCount: number;
      items: {
        productName: string;
        customerName: string;
        phoneNumber: string;
        status: number;
        amount: number;
      }[];
    };
  };
}
export interface GetWalletTransactionHistoryResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: WithdrawalHistory[];
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: WithdrawalHistory[];
  };
}

export interface GetTransactionReceiptResponse
  extends ApiResponse<{
    transactionDate: string;
    productName: string;
    amount: number;
    sellerName: string;
    buyerName: string;
  }> {
  result: {
    transactionDate: string;
    productName: string;
    amount: number;
    sellerName: string;
    buyerName: string;
  };
}
export interface CheckExistingCustomerResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: {
      id: number;
      creationTime: string;
      creatorUserId: number;
      lastModificationTime: string;
      lastModifierUserId: number;
      isDeleted: boolean;
      deleterUserId: number;
      deletionTime: string;
      narration: string;
      amount: number;
      isTrial: boolean;
      productId: number;
      payStatus: string;
      transactionDate: string;
      customerID: string;
      transactionID: string;
      serviceID: string;
      sellerUserId: number;
      payType: string;
      status: number;
      effectiveDate: string;
      expiryDate: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
      address: string;
      state: string;
      gender: string;
      dateOfBirth: string;
      productCategory: string;
    };
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: {
      id: number;
      creationTime: string;
      creatorUserId: number;
      lastModificationTime: string;
      lastModifierUserId: number;
      isDeleted: boolean;
      deleterUserId: number;
      deletionTime: string;
      narration: string;
      amount: number;
      isTrial: boolean;
      productId: number;
      payStatus: string;
      transactionDate: string;
      customerID: string;
      transactionID: string;
      serviceID: string;
      sellerUserId: number;
      payType: string;
      status: number;
      effectiveDate: string;
      expiryDate: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      email: string;
      address: string;
      state: string;
      gender: string;
      dateOfBirth: string;
      productCategory: string;
    };
  };
}

export interface WalletAccountDetails {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
}

export interface CommissionsEarnedResponse
  extends ApiResponse<{
    responseCode: number;
    message: string;
    payload: {
      amount: number;
      userId: string;
    };
  }> {
  result: {
    responseCode: number;
    message: string;
    payload: {
      amount: number;
      userId: string;
    };
  };
}

export interface GetReferredUsersResponse
  extends ApiResponse<{
    totalUsers: number;
    totalActiveUsers: number;
    totalInActiveUsers: number;
    referredUsers: User[];
  }> {
  result: {
    totalUsers: number;
    totalActiveUsers: number;
    totalInActiveUsers: number;
    referredUsers: User[];
  };
}

export interface TotalSalesResponse
  extends ApiResponse<{
    totalSales: number;
    amount: number;
  }> {
  result: {
    totalSales: number;
    amount: number;
  };
}
export interface TotalSalesByAgentsResponse
  extends ApiResponse<{
    totalSales: number;
    totalAggregators: number;
    totalAgents: number;
    transactionAmount: number;
    aggregatedBreakdown: {
      aggregatorId: number;
      aggregatorName: string;
      agentCount: number;
      salesCount: number;
      salesAmount: number;
      agentBreakdown: {
        agentId: number;
        agentName: string;
        transactionCount: number;
        transactionAmount: number;
      }[];
    }[];
  }> {
  result: {
    totalSales: number;
    totalAggregators: number;
    totalAgents: number;
    transactionAmount: number;
    aggregatedBreakdown: {
      aggregatorId: number;
      aggregatorName: string;
      agentCount: number;
      salesCount: number;
      salesAmount: number;
      agentBreakdown: {
        agentId: number;
        agentName: string;
        transactionCount: number;
        transactionAmount: number;
      }[];
    }[];
  };
}
export interface TotalSalesNationalResponse
  extends ApiResponse<{
    totalSales: number;
    amount: number;
  }> {
  result: {
    totalSales: number;
    amount: number;
  };
}
export interface DownlinesResponse
  extends ApiResponse<{
    totalUsers: number;
    totalActiveUsers: number;
    totalInActiveUsers: number;
    referredUsers: User[];
  }> {
  result: {
    totalUsers: number;
    totalActiveUsers: number;
    totalInActiveUsers: number;
    referredUsers: User[];
  };
}

export interface MonthlyReferralResponse
  extends ApiResponse<
    [
      {
        month: string;
        count: number;
      }
    ]
  > {
  result: [
    {
      month: string;
      count: number;
    }
  ];
}

export interface GetUserDocumentResponse
  extends ApiResponse<{
    fileName: string;
    fileType: string;
    fileUrl: string;
    fileContent: string;
  }> {
  result: {
    fileName: string;
    fileType: string;
    fileUrl: string;
    fileContent: string;
  };
}
