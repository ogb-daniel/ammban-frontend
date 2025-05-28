import {
  SignupFormSchema,
  FormState,
  SignInSchema,
  GetCurrentLoginInformationsResponse,
} from "@/app/lib/definitions";

import {
  ILoginBody,
  IRegisterBody,
  LoginResponse,
  RegisterResponse,
} from "../definitions";

import { redirect } from "next/navigation";
import { HOME } from "../routes";
import { createSession, deleteSession } from "../session";
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
  } catch (error) {
    return {
      error: (error as Error).message,
    };
  }
  toast.success("Account created successfully");
  redirect(HOME.url);
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
      response.result.accessToken
    );
    const user = response2.result.user;
    const role = user.roleName.includes("Admin") ? "admin" : "agent";
    await createSession(
      response.result.accessToken,
      response.result.expireInSeconds,
      role,
      user
    );
    return {
      user: user,
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
  accessToken: string
): Promise<GetCurrentLoginInformationsResponse> => {
  const response = await fetch(
    `${baseUrl}//api/services/app/Session/GetCurrentLoginInformations`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return response.json();
};
