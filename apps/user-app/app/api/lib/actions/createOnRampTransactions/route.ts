import { prisma } from "@repo/db";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { Auth } from "../../auth";
export async function POST(req: NextRequest) {
  const session = await getServerSession(Auth);
  if (!session) {
    return NextResponse.json({
      message: "Secured Path, Login and Come Back",
    });
  }
  //@ts-ignore
  const userId = session?.user?.id;
  const { amt } = await req.json();

  const onRampTransaction = await prisma.onRampTransaction.create({
    data: {
      user: {
        connect: { id: Number(userId) }, // <-- relation fix
      },
      amount: parseInt(amt, 10),
      token: crypto.randomUUID(),
      provider: "HDFC",
      status: "Processing",
      startTime: new Date(),
    },
  });
  return NextResponse.json({ onRampTransactionId: onRampTransaction.id });
}
export async function GET(req: NextRequest) {
  // expecting the ffake bank to hit it and will send the the amount and token to it, hdfc will display will display it and on payment hit the webhook server
  const orderId = req.nextUrl.searchParams.get("id");
  console.log(orderId);

  if (!orderId)
    return NextResponse.json({ error: "orderId missing" }, { status: 400 });

  const txn = await prisma.onRampTransaction.findUnique({
    where: { id: parseInt(orderId, 10) },
  });

  if (!txn) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(txn, {
    headers: {
      "Access-Control-Allow-Origin": "*", // allow all origins
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
