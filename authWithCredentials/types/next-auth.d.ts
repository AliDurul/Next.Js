import { JwtPayload } from "jwt-decode";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    expireAt: string;
    error?: string;
    user: {
      address: string;
      createdAt: string;
      deletedAt: string | null;
      email: string;
      emailToken: string;
      firstName: string;
      id: number;
      isActive: Boolean;
      isVerified: Boolean;
      lastName: string;
      nrcNo: string;
      phoneNO: string;
      role: number;
      updatedAt: string;
    };
  }

  interface User {
    access: string;
    refresh: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access: string;
    refresh: string;
    expiresAt: number;
    error?: string;
    userInfo: {
      id: number;
      firstName: string;
      lastName: string;
      nrcNo: string;
      phoneNO: string;
      address: string;
      role: number;
      email: string;
      isActive: Boolean;
      isVerified: Boolean;
      emailToken: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
      iat: number;
      exp: number;
    };
    iat: number;
    exp: number;
    jti: string;
  }

}

interface userInfo extends JwtPayload {
  id: number;
  firstName: string;
  lastName: string;
  nrcNo: string;
  phoneNO: string;
  address: string;
  role: number;
  email: string;
  isActive: Boolean;
  isVerified: Boolean;
  emailToken: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  iat: number;
  exp: number;
}
