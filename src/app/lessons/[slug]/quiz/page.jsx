// src/app/lessons/[slug]/quiz/page.jsx
import QuizList from "@/components/QuizList";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function LessonQuizPage({ params }) {
  const { slug } = await params;

  if (!slug) return <div>Missing lesson slug</div>;

  const lesson = await prisma.lesson.findUnique({
    where: { slug },
    include: { quizzes: true },
  });

  if (!lesson) return <div>Lesson not found</div>;

  const quizzes = lesson.quizzes.map((q) => ({
    id: q.id,
    question: q.question,
    answer: q.answer,
    createdAt: q.createdAt.toISOString(),
    updatedAt: q.updatedAt.toISOString(),
    options: Array.isArray(q.options)
      ? q.options.map((opt) =>
          typeof opt === "object" && opt !== null && "text" in opt
            ? { text: String(opt.text) }
            : { text: String(opt) }
        )
      : [],
  }));

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back to Lesson Button */}
      <div className="mb-6">
        <Link
          href={`/lessons/${lesson.slug}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
        >
          ← Back to Lesson
        </Link>
      </div>

      <QuizList quizzes={quizzes} />
    </div>
  );
}
