"use client";

import { SessionProvider } from "next-auth/react";

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <SessionProvider refetchInterval={60 * 60 * 24}>{children}</SessionProvider>;
};
