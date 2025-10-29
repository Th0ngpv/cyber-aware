// src/app/lessons/[slug]/page.jsx
import { prisma } from "@/utils/db";

export default async function LessonPage({ params }) {
  const { slug } = params;

  const lesson = await prisma.lesson.findUnique({
    where: { slug },
  });

  if (!lesson) {
    return <p>Lesson not found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{lesson.title}</h1>
      <p>{lesson.content || "No content yet."}</p>

      <div className="mt-6">
        <a
          href={`/lessons/${lesson.slug}/quiz`}
          className="text-white bg-blue-600 px-4 py-2 rounded"
        >
          Take Quiz
        </a>
      </div>
    </div>
  );
}
