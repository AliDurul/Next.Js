import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex gap-x-4">
        <Link
          className="text-sm mt-3 text-right"
          href={"/dashboard/verify-email"}
        >
        <span className="underline">verify email page</span>
        </Link>
        <Link className="text-sm mt-3 text-right" href={"/dashboard/admin"}>
        <span className="underline">admin page</span>
        </Link>
        <Link className="text-sm mt-3 text-right" href={"/dashboard/me-info"}>
         <span className="underline">user info page</span>
        </Link>
        <Link className="text-sm mt-3 text-right" href={"/register"}>
         <span className="underline">register page</span>
        </Link>
        <Link className="text-sm mt-3 text-right" href={"/dashboard"}>
         <span className="underline">main page</span>
        </Link>
      </div>
      <main className="grid place-items-center h-screen">{children}</main>
    </>
  );
}
2;
