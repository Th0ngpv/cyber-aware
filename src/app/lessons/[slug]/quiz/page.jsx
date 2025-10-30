// src/app/lessons/[slug]/quiz/page.jsx
import QuizList from "@/components/QuizList";
import { prisma } from "@/lib/prisma";

export default async function LessonQuizPage({ params }) {
  // In Next.js 13+, params is usually a Promise
  const { slug } = await params;

  if (!slug) return <div>Missing lesson slug</div>;

  const lesson = await prisma.lesson.findUnique({
    where: { slug },
    include: { quizzes: true },
  });

  if (!lesson) return <div>Lesson not found</div>;

  // Normalize quizzes so options are objects with `text`
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

  return <QuizList quizzes={quizzes} />;
}
