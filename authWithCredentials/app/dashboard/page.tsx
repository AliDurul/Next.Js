import Link from "next/link";
import UserInfo from "../components/UserInfo";

export default function Dashboard() {
  return (
    <main>
      <UserInfo />

      <Link className="text-sm mt-3 text-right" href={"/"}>
        go to login? <span className="underline">Login</span>
      </Link>
    </main>
  );
}
