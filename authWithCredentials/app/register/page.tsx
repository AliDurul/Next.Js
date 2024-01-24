import RegisterForm from "../components/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await getServerSession();

  if (session) redirect("/dashboard");

  return <RegisterForm />;
};

export default RegisterPage;
