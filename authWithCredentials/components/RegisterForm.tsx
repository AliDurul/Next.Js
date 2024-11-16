"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const nrcNo = formData.get("nrcNo") as string;
    const phoneNO = formData.get("phoneNo") as string;
    const address = formData.get("address") as string;
    const role = parseInt(formData.get("role") as string, 10);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const response = await fetch(`http://localhost:8000/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          nrcNo,
          phoneNO,
          address,
          role,
          email,
          password,
        }),
      });

      if (response.ok) {
        // form.reset();
        const data = await response.json()
        console.log(data);
        router.push("/");
      } else {
        const data = await response.json()
        console.log(data);
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Register</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input name="firstName" type="text" placeholder="first name" />
          <input name="lastName" type="text" placeholder="last name" />
          <input name="nrcNo" type="text" placeholder="nrc no" />
          <input name="phoneNo" type="text" placeholder="phone no" />
          <input name="address" type="text" placeholder="address" />
          <input name="role" type="number" placeholder="role" />
          <input name="email" type="email" placeholder="email" />
          <input name="password" type="password" placeholder="password" />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Register
          </button>

          <Link className="text-sm mt-3 text-right" href={"/"}>
            Already have an account? <span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
