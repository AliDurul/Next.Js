import LoginForm from "@/components/LoginForm";
import { redirect } from "next/navigation";
import { auth } from "../auth";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <h1 className="text-xl font-bold my-4">18Mart2020.</h1>
        <LoginForm />
      </div>
    </div>
  );
}
