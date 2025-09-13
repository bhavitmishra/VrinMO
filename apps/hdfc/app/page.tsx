import { useRouter } from "next/navigation";
import { useState } from "react";

export default function () {
  const router = useRouter();
  const [user, setUser] = useState("");
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your email"
        onChange={(e) => setUser(e.target.value)}
      />
      <button onClick={() => router.push("/payment-gateway-hdfc")}>
        Submit
      </button>
    </div>
  );
}
