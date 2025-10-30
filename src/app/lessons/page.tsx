import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function LessonList() {
  const lessons = await prisma.lesson.findMany();

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold mb-4">Available Lessons</h1>
      {lessons.map((lesson) => (
        <Link
          key={lesson.id}
          href={`/lessons/${lesson.slug}/page`}
          className="block p-4 border rounded hover:bg-gray-100"
        >
          <h2 className="text-xl font-semibold">{lesson.title}</h2>
          <p>{lesson.description}</p>
        </Link>
      ))}
    </div>
  );
}
