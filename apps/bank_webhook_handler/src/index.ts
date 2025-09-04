import express from "express";
import { prisma } from "@repo/db";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

// on ramping k liyeee , it will listehn for the banking apis , when they credit money to our bank acc, we will put the updated in users db
// Add zod validation
// Check if this request actually came from hdfc, use a webhook secret here

app.post("/hdfcWebhook", async (req, res) => {
  const paymentInformation = {
    token: req.body.token,
    userId: req.body.userId,
    amount: req.body.amount,
  };
  await prisma.balance.update({
    where: {
      userId: paymentInformation.userId,
    },
    data: {
      amount: {
        increment: paymentInformation.amount,
      },
    },
  });

  console.log(paymentInformation);

  await prisma.onRampTransaction.update({
    where: {
      token: paymentInformation.token,
    },
    data: {
      status: "Success",
    },
  });
  res.status(200).json({
    message: "Captured",
  });
});
app.listen(6969, () => {
  console.log("Server running on http://localhost:6969");
});
