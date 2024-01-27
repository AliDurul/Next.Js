// pages/api/auth/set-cookies.js
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  const { email, password } = body;

  // // Authenticate against your backend
  const authResponse = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!authResponse.ok) {
    return new Response("Authentication failed", { status: 401 });
  }

  const data = await authResponse.json();

  const { access, refresh } = data.Token;
  console.log(access);

  cookies().set({
    name: "access_token",
    value: access,
    httpOnly: true,
    path: "/",
    maxAge: 5 * 60,
  });

  // Set HTTP-only cookies for access and refresh tokens
  // res.setHeader("Set-Cookie", [
  //   serialize("access_token", access, {
  //     httpOnly: true,
  //     maxAge: 5 * 60,
  //     path: "/",
  //   }),
  //   serialize("refresh_token", refresh, {
  //     httpOnly: true,
  //     maxAge: 24 * 60 * 60,
  //     path: "/",
  //   }),
  // ]);

  // Call NextAuth's signIn to handle session management
  // const authRes = await signIn("credentials", {
  //   redirect: false,
  //   email,
  //   password,
  //   token: data.Token,
  // });

  return new Response("Success!", {
    status: 200,
  });
}
