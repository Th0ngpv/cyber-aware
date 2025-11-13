// src/app/lessons/[slug]/page.tsx
import LessonPageViewer from "@/components/LessonPageViewer";
import Link from "next/link";

interface LessonPageProps {
  params: Promise<{ slug: string }>;
}

type LessonContent = { text?: string; html?: string };

interface PageType {
  id: string;
  lessonId: string;
  pageNumber: number;
  title?: string;
  content: LessonContent;
}

interface QuizOption {
  text: string;
}

interface QuizType {
  id: string;
  question: string;
  options: QuizOption[];
  answer: string;
}

interface LessonType {
  id: string;
  title: string;
  slug: string;
  description?: string;
  pages: PageType[];
  quizzes: QuizType[];
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;

  if (!slug) return <div>Missing lesson slug</div>;

  const res = await fetch(`http://localhost:3000/api/lessons/${slug}`, { cache: "no-store" });
  if (!res.ok) return <div>Lesson not found</div>;

  const lesson: LessonType = await res.json();

  return (
    <div className="max-w-4xl mx-auto ">
      {/* ===== Top Navigation Buttons ===== */}
      <div className="flex justify-between items-center mt-1.5">
        {/* Back to Dashboard Button */}
        <Link
          href="/"
          className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition"
        >
          ← Back to Dashboard
        </Link>

        {/* Show Quiz Button if quizzes exist */}
        {lesson.quizzes.length > 0 && (
          <Link
            href={`/lessons/${lesson.slug}/quiz`}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Go to Quiz →
          </Link>
        )}
      </div>

      {/* ===== Lesson Viewer ===== */}
      <LessonPageViewer initialLesson={lesson} />
    </div>
  );
}
