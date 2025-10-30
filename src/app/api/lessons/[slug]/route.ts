import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (!slug) {
    return new Response("Missing slug", { status: 400 });
  }

  const lesson = await prisma.lesson.findUnique({
    where: { slug },
    include: { pages: { orderBy: { pageNumber: "asc" } }, quizzes: true },
  });

  if (!lesson) {
    return new Response("Lesson not found", { status: 404 });
  }

  // Normalize content for each page
  const normalizedLesson = {
    ...lesson,
    description: lesson.description ?? undefined,
    pages: lesson.pages.map((p) => ({
      ...p,
      title: p.title ?? undefined,
      content:
        p.content && typeof p.content === "object" && !Array.isArray(p.content)
          ? p.content
          : { text: String(p.content ?? "") },
    })),
  };

  return new Response(JSON.stringify(normalizedLesson), { status: 200 });
}
