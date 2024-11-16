"use client";
import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import React from "react";

const MeInfoBtn = () => {
  const { data: session, status } = useSession();
  const [materials, setMaterials] = useState([]);
console.log(session);
  /* useEffect(() => {
    if (!session || !session.user || !session.accessToken) return;

    if (session?.error === "RefreshAccessTokenError") {
      signIn(); 
    }

    try {
      (async () => {
        const res = await fetch("http://127.0.0.1:8000/materials/", {
          method: "Get",
          headers: {
            authorization: `Bearer ${session.accessToken}`,
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
  }, [session]); */

  if (status === "loading") {
    return (
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        Loading..
      </div>
    );
  }

  // console.log(materials);

  return (
    <button
      onClick={() => signOut()}
      className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
    >
      Log Out
    </button>
  );
};

export default MeInfoBtn;
