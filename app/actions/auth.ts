import {
  SignupFormSchema,
  FormState,
  SignInSchema,
} from "@/app/lib/definitions";
import { register, signin } from "../lib/api/auth";
import { redirect } from "next/navigation";
import { HOME } from "../lib/routes";
import { createSession, deleteSession } from "../lib/session";
import { toast } from "react-toastify";
import { getUser } from "../lib/api/user";

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
      surename: validatedFields.data.lastName,
      name:
        validatedFields.data.firstName + " " + validatedFields.data.lastName,
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
    await createSession(
      response.result.accessToken,
      response.result.expireInSeconds,
      ""
    );
    const user = await getUser(response.result.userId);
    console.log(user);
    const role = user.result.roleNames.includes("ADMIN") ? "admin" : "agent";
    await createSession(
      response.result.accessToken,
      response.result.expireInSeconds,
      role
    );
    return {
      user: user.result,
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
