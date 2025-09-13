import SendCard from "../../components/SendCard";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Auth } from "../api/lib/auth";
export default async function () {
  const session = await getServerSession(Auth);
  if (!session?.user?.id) {
    redirect("/signin");
  }
  return (
    <div className="w-full">
      <SendCard />
    </div>
  );
}
