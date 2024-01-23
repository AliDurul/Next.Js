"use client";
import React, { FormEvent } from "react";

const RegisterForm = () => {
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

    const response = await fetch(`/api/auth/register`, {
      method: "POST",
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

  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 mx-auto max-w-md mt-10"
    >
      <input
        name="firstName"
        className="border border-b-black text-black"
        type="text"
        placeholder="first name"
      />
      <input
        name="lastName"
        className="border border-b-black text-black"
        type="text"
        placeholder="last name"
      />
      <input
        name="nrcNo"
        className="border border-b-black text-black"
        type="text"
        placeholder="nrc no"
      />
      <input
        name="phoneNo"
        className="border border-b-black text-black"
        type="text"
        placeholder="phone no"
      />
      <input
        name="address"
        className="border border-b-black text-black"
        type="text"
        placeholder="address"
      />
      <input
        name="role"
        className="border border-b-black text-black"
        type="number"
        placeholder="role"
      />
      <input
        name="email"
        className="border border-b-black text-black"
        type="email"
        placeholder="email"
      />
      <input
        name="password"
        className="border border-b-black text-black"
        type="password"
        placeholder="password"
      />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
