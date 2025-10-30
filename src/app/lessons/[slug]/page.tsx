// src/app/lessons/[slug]/page.tsx
import LessonPageViewer from "@/components/LessonPageViewer";

interface LessonPageProps {
  params: Promise<{ slug: string }>; // params is a Promise in App Router
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
  // ✅ Await the params
  const { slug } = await params;

  if (!slug) return <div>Missing lesson slug</div>;

  // Fetch lesson from API
  const res = await fetch(`http://localhost:3000/api/lessons/${slug}`, { cache: "no-store" });
  if (!res.ok) return <div>Lesson not found</div>;

  const lesson: LessonType = await res.json();

  return <LessonPageViewer initialLesson={lesson} />;
}
