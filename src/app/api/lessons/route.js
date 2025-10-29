// src/app/api/lessons/route.js
import { prisma } from "@/utils/db";

export async function GET() {
  const lessons = await prisma.lesson.findMany();
  return new Response(JSON.stringify(lessons), { status: 200 });
}
