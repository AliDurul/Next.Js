"use server";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

interface valuesTypes {
  email: string;
  password: string;
}

export const login = async (values: valuesTypes) => {
  const { email, password } = values;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect:false,
    });
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials !" };
        case "CallbackRouteError":
          const errorMessage = error?.cause?.err?.message;
          return { error: errorMessage };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
