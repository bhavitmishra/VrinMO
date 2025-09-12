"use server";

import { getServerSession } from "next-auth";
import { Auth } from "../lib/auth";
import { prisma } from "@repo/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { to, amount } = body;

    const session = await getServerSession(Auth);
    const from = parseInt(session?.user?.id);
    console.log(from, "from", typeof from);

    if (!from) {
      return NextResponse.json(
        { message: "Error while sending" },
        { status: 401 }
      );
    }

    const toUser = await prisma.user.findUnique({
      where: {
        number: String(to), // make sure it's a string
      },
    });

    if (!toUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
      const fromBalance = await tx.balance.findUnique({
        where: { userId: Number(from) },
      });

      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }

      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: parseInt(amount) } },
      });

      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: parseInt(amount) } },
      });
      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: toUser.id,
          amount: parseInt(amount),
          timestamp: new Date(),
        },
      });
    });

    return NextResponse.json(
      { message: "Transfer successful" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { message: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
