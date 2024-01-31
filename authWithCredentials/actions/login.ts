"use server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { Router } from "next/router";

interface LoginValues {
  email: string;
  password: string;
}

export const login = async (values: LoginValues) => {
  const { email, password } = values;

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    console.log(res);
  } catch (error) {
    if (error instanceof AuthError) {
        switch (error.type){
            case "CredentialsSignin":
                return {error: "Invalid Credential"}
            
        }

      return error?.message || "Invalid credentials or server error";
    }
    throw error;
  }
};
