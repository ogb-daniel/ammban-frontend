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
  id: number | null;
};

export interface IRegisterBody {
  name: string;
  surename: string;
  emailAddress: string;
  phoneNumber: string;
  password: string;
  address: string;
  stateId: number;
  dateOfBirth: string;
  gender: number;
  referralCode: string;
}
export interface RegisterResponse {
  result: {
    canLogin: boolean;
  };
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

export interface ILoginBody {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
}

export interface LoginResponse {
  result: {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: number;
  };
  targetUrl: null;
  success: boolean;
  error: {
    code: number;
    message: string;
    details: string[];
  } | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}

export interface GetUserResponse {
  result: User;
  targetUrl: null;
  success: boolean;
  error: {
    code: number;
    message: string;
    details: string[];
  } | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
}
export interface GetAllUsersResponse {
  result: {
    items: User[];
    totalCount: number;
  };
  targetUrl: null;
  success: boolean;
  error: {
    code: number;
    message: string;
    details: string[];
  } | null;
  unAuthorizedRequest: boolean;
  __abp: boolean;
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

export interface CreateUserResponse {
  result: User;
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

export interface DeleteUserResponse {
  result: null;
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
