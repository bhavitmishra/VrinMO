"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TransactionPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("id");
  const router = useRouter();
  console.log(search);
  const handlePay = async () => {
    await axios.post("http://localhost:6969/hdfcWebhook", {
      token: data.token,
      amount: data.amount,
      userId: data.userId,
    });
    router.push("http://localhost:3000/home");
  };
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!search) return;

    axios
      .get("http://localhost:3000/api/create-onramp-transaction", {
        params: { id: search },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);

        setError(true);
      });
  }, [search]);

  if (error) return <div>already done</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      {data.amount}
      <button onClick={handlePay}>Pay</button>
    </div>
  );
}
