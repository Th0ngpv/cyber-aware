// src/app/api/rankings/route.ts
import { prisma } from "@/lib/prisma";

export async function GET() {
  const rankings = await prisma.userRanking.findMany({
    orderBy: { totalScore: "desc" },
    include: { user: true },
  });
  return new Response(JSON.stringify(rankings));
}