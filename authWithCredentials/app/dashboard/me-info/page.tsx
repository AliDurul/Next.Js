<<<<<<< HEAD
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FetchData from "@/app/components/FetchData";
import MeInfoBtn from "@/app/components/MeInfoBtn";
import { getServerSession } from "next-auth";
=======
import MeInfoBtn from "@/components/MeInfoBtn";
import { auth } from "@/auth"

>>>>>>> main

export default async function UserInfo() {
  const session = await auth()

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zince-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{session?.user?.firstName}</span>
        </div>
        <div>
          Role: <span className="font-bold">{session?.user?.role}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
        <MeInfoBtn />
      </div>
      <FetchData/>
    </div>
  );
}
