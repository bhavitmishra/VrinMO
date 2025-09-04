import Sidebar from "@repo/ui/Sidebar";
import { useSession } from "next-auth/react"; // notice the /react import
import TransactionsPage from "../../components/Chart";

export default function Home() {
  return (
    <div>
      <TransactionsPage />
    </div>
  );
}
