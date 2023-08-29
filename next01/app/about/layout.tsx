import React from "react";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <nav>About Navbar</nav>
        <main className="min-h-screen grid place-content-center bg-[#333]" >
            {children}
        </main>
    </>
  )
}
