import {
  ILoginBody,
  IRegisterBody,
  LoginResponse,
  RegisterResponse,
} from "../definitions";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const register = async (
  body: IRegisterBody
): Promise<RegisterResponse> => {
  const response = await fetch(`${baseUrl}/api/services/app/Account/Register`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const signin = async (body: ILoginBody): Promise<LoginResponse> => {
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
