// src/app/page.tsx
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Lesson, UserRanking } from "@prisma/client";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function HomePage() {
  // 1. Get current session
  const session = await getServerSession(authOptions);

  // If not logged in, show login prompt
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p>Please log in to access lessons and rankings.</p>
        <Link
          href="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </Link>
      </div>
    );
  }

  // 2. Fetch lessons
  const lessons: Lesson[] = await prisma.lesson.findMany({
    orderBy: { createdAt: "asc" },
  });

  // 3. Fetch leaderboard
  const rankings: (UserRanking & { user: { name: string | null } })[] =
    await prisma.userRanking.findMany({
      orderBy: { totalScore: "desc" },
      include: { user: true },
    });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Cyber Aware Dashboard</h1>
        <LogoutButton />
      </div>

      {/* Lessons Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="p-4 border rounded shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold">{lesson.title}</h3>
              <p className="text-gray-600">{lesson.description}</p>
              <Link
                href={`/lessons/${lesson.slug}/page`}
                className="mt-2 inline-block text-white bg-blue-600 px-4 py-2 rounded"
              >
                Start Lesson
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Leaderboard Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
        <div className="grid gap-2">
          {rankings.map((rank, index) => (
            <div
              key={rank.id}
              className="flex justify-between p-2 border rounded"
            >
              <span>
                {index + 1}. {rank.user.name || "Anonymous"}
              </span>
              <span>{rank.totalScore} pts</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
