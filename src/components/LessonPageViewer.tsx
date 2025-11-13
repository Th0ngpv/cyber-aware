"use client";
import { useState } from "react";

interface LessonPageData {
  pageNumber: number;
  title?: string;
  content: { text?: string; html?: string };
}

interface LessonData {
  id: string;
  title: string;
  description?: string;
  pages: LessonPageData[];
}

interface LessonPageViewerProps {
  initialLesson: LessonData;
}

export default function LessonPageViewer({ initialLesson }: LessonPageViewerProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPage = initialLesson.pages[currentPageIndex];

  return (
    <div className="flex flex-col items-center w-full">
      {/* ===== Header (Outside the box) ===== */}
      <div className="w-full max-w-4xl px-6 mb-2 text-center">
        <h1 className="text-3xl font-bold text-foreground">
          {initialLesson.title}
        </h1>
        {initialLesson.description && (
          <p className="text-foreground/80 mt-2">
            {initialLesson.description}
          </p>
        )}
      </div>

      {/* ===== Lesson Box ===== */}
      <div
        className="
          relative
          mx-auto
          rounded-2xl
          shadow-lg
          bg-background
          border border-foreground/20
          w-full
          min-h-[80vh]
          flex flex-col
          overflow-hidden
          transition-all duration-300
          mb-20        /* <-- adds bottom margin naturally */
        "
      >
        {/* ===== Scrollable Content ===== */}
        <div
          className="
            grow overflow-y-auto px-8 py-6
            scrollbar-thin 
            scrollbar-thumb-foreground 
            scrollbar-track-transparent
          "
        >
          <h2 className="text-2xl font-semibold mb-3 text-foreground">
            Page {currentPage.pageNumber}: {currentPage.title || "Untitled"}
          </h2>

          {currentPage.content.html ? (
            <div
              className="prose max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: currentPage.content.html }}
            />
          ) : currentPage.content.text ? (
            <p className="text-foreground leading-relaxed">
              {currentPage.content.text}
            </p>
          ) : (
            <p className="text-foreground/60">No content available</p>
          )}
        </div>

        {/* ===== Pagination Buttons ===== */}
        <div
          className="
            shrink-0 flex justify-between items-center 
            border-t border-foreground/10 px-8 py-4
          "
        >
          {currentPageIndex > 0 ? (
            <button
              onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
              className="
                border border-foreground/30 
                text-foreground 
                bg-background 
                hover:bg-foreground/10 
                px-4 py-2 rounded-lg transition
              "
            >
              ← Previous Page
            </button>
          ) : (
            <div />
          )}

          {currentPageIndex < initialLesson.pages.length - 1 && (
            <button
              onClick={() => setCurrentPageIndex(currentPageIndex + 1)}
              className="
                bg-foreground 
                text-background 
                hover:opacity-90 
                px-4 py-2 rounded-lg transition
              "
            >
              Next Page →
            </button>
          )}
        </div>

      </div>

    </div>

  );
}
