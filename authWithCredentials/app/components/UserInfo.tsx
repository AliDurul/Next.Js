"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const { data: session, status } = useSession();

  const [materials, setMaterials] = useState([]);
  console.log(session);
  useEffect(() => {
    console.log(status);

    if (!session || !session.user || !session.user.access) return;
    try {
      (async () => {
        const res = await fetch("http://127.0.0.1:8000/materials/", {
          method: "Get",
          headers: {
            authorization: `Bearer ${session?.user?.access}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          console.log(data.message);
          return;
        }
        setMaterials(data.rows);
      })();
    } catch (error: any) {
      console.log(error.message);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
          Loading..
        </div>
      </div>
    );
  }

  console.log(materials);

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{session?.user?.firstName}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
