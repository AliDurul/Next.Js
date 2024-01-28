import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    user: {
      access: string;
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
      refresh: string;
      role: number;
      updatedAt: string;
    };
  }

  interface User {
    access: string;
    refresh: string;
  }
}
