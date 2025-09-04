"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function () {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const handleLogin = async () => {
    router.push(`/payment-gateway-hdfc?id=${id}`);
  };
  return (
    <div>
      <input type="text" placeholder="Bank UserName" />
      <input type="text" placeholder="Bank Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
