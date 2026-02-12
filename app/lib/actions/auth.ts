import {
  SignupFormSchema,
  FormState,
  SignInSchema,
  GetCurrentLoginInformationsResponse,
  GetAccountBalanceResponse,
} from "@/app/lib/definitions";

import {
  ILoginBody,
  IRegisterBody,
  LoginResponse,
  RegisterResponse,
} from "../definitions";

import { redirect } from "next/navigation";
import { VERIFY_ACCOUNT } from "../routes";
import { createSession, deleteSession, getSession } from "../session";
import { toast } from "react-toastify";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function signup(state: FormState, formData: FormData) {
  try {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
      referralCode: formData.get("referralCode"),
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      userName: formData.get("userName"),
      phoneNumber: formData.get("phoneNumber"),
      emailAddress: formData.get("emailAddress"),
      address: formData.get("address"),
      stateId: Number(formData.get("stateId")),
      dateOfBirth: formData.get("dateOfBirth"),
      gender: Number(formData.get("gender")),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const response = await register({
      ...validatedFields.data,
      sureName: validatedFields.data.lastName,
      name: validatedFields.data.firstName,
    });

    if (!response.success) {
      return {
        error: response?.error?.message,
      };
    }

    const userId = response?.result?.userID;
    console.log(formData);
    const documentUploadResponse = await uploadDocument(
      userId.toString(),
      formData,
    );
    if (!documentUploadResponse.success) {
      return {
        error: documentUploadResponse?.error?.message,
      };
    }
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
  toast.success("Account created successfully");
  redirect(VERIFY_ACCOUNT.url);
}

export async function login(state: FormState, formData: FormData) {
  try {
    // Validate form fields
    const validatedFields = SignInSchema.safeParse({
      userNameOrEmailAddress: formData.get("userNameOrEmailAddress"),
      password: formData.get("password"),
    });

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    const response = await signin({
      ...validatedFields.data,
      rememberClient: true,
    });
    if (!response.success) {
      return {
        error: response?.error?.message,
        details: response?.error?.details,
      };
    }

    const response2 = await getCurrentLoginInformation(
      response.result.accessToken,
    );
    const balance = await getAccountBalance(response.result.accessToken);
    const user = response2.result.user;
    const role = user.roleName.split(" ").join("-").toLowerCase();
    await createSession(
      response.result.accessToken,
      response.result.expireInSeconds,
      role,
      user,
      response.result.refreshToken,
      response.result.refreshTokenExpireInSeconds,
    );
    return {
      user: {
        ...user,
        walletBalance: balance?.result?.payload?.availableBalance,
      },
      success: true,
      role,
    };
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
}

export async function logout() {
  try {
    await deleteSession();
    // Clear any other server-side state if needed
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: (error as Error).message,
    };
  }
}

const register = async (body: IRegisterBody): Promise<RegisterResponse> => {
  const response = await fetch(`${baseUrl}/api/services/app/Account/Register`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const verifyEmail = async (body: { code: string }) => {
  const response = await fetch(
    `${baseUrl}/api/services/app/Account/VerifyEmailCode`,
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.json();
};

const uploadDocument = async (userId: string, formData: FormData) => {
  const response = await fetch(
    `${baseUrl}/api/services/app/Account/UploadDocuments?userId=${userId}`,
    {
      method: "POST",
      body: formData,
    },
  );

  return response.json();
};

const signin = async (body: ILoginBody): Promise<LoginResponse> => {
  const response = await fetch(`${baseUrl}/api/TokenAuth/Authenticate`, {
    method: "POST",
    body: JSON.stringify(body),
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

// async function getUserByToken(accessToken: string, userId: string) {
//   // Make API request using the token in the authorization header
//   const response = await fetch(
//     `${baseUrl}/api/services/app/User/Get?Id=${userId}`,
//     {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     }
//   );

//   return response.json();
// }

export const getCurrentLoginInformation = async (
  accessToken: string,
): Promise<GetCurrentLoginInformationsResponse> => {
  const response = await fetch(
    `${baseUrl}/api/services/app/Session/GetCurrentLoginInformations`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  return response.json();
};
export const getAccountBalance = async (
  accessToken: string,
): Promise<GetAccountBalanceResponse> => {
  const response = await fetch(
    `${baseUrl}/api/services/app/PaymentService/AccountBalance`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: "POST",
      cache: "no-store",
    },
  );

  return response.json();
};

export async function refreshUserData() {
  try {
    const session = await getSession();
    if (!session.accessToken) {
      return { success: false, error: "No access token" };
    }
    const response = await getCurrentLoginInformation(session.accessToken);
    if (!response.success) {
      return { success: false, error: response.error?.message };
    }
    const balance = await getAccountBalance(session.accessToken);

    const user = response.result.user;
    const updatedUser = {
      ...user,
      walletBalance: balance?.result?.payload?.availableBalance,
      role: user.roleName.split(" ").join("-").toLowerCase(),
    };
    return { success: true, user: updatedUser };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
