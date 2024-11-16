"use client";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { login } from "@/actions/login";

const LoginForm = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    login({ email, password })
      .then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          router.push("/dashboard");
          console.log("Successful login");
        }
      })
      .catch((error) => {
        setError("An error occurred");
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input name="email" type="email" placeholder="Your Email" />
      <input
        name="password"
        type="password"
        placeholder="Enter your password"
      />
      <button
        type="submit"
        className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2"
      >
        Login
      </button>
      {error && (
        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
          {error}
        </div>
      )}

      <Link className="text-sm mt-3 text-right" href={"/register"}>
        Dont have an account? <span className="underline">Register</span>
      </Link>
    </form>
  );
};

export default LoginForm;
