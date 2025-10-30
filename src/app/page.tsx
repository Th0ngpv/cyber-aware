// src/app/page.tsx
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Lesson, UserRanking } from "@prisma/client";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <p className="text-lg">Please log in to access lessons and rankings.</p>
        <Link
          href="/login"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
        >
          Login
        </Link>
      </div>
    );
  }

  const lessons: Lesson[] = await prisma.lesson.findMany({
    orderBy: { createdAt: "asc" },
  });

  const rankings: (UserRanking & { user: { name: string | null } })[] =
    await prisma.userRanking.findMany({
      orderBy: { totalScore: "desc" },
      include: { user: true },
    });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Cyber Aware Dashboard</h1>
        <LogoutButton />
      </div>

      {/* Lessons Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Lessons</h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="flex flex-col justify-between p-5 border rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-transform "
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{lesson.description}</p>
              </div>
              <Link
                href={`/lessons/${lesson.slug}`}
                className="mt-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition"
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
              <span className="font-medium">{rank.totalScore} pts</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
