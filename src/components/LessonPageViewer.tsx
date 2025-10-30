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

// ✅ Renamed component
export default function LessonPageViewer({ initialLesson }: LessonPageViewerProps) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const currentPage = initialLesson.pages[currentPageIndex];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{initialLesson.title}</h1>
      {initialLesson.description && (
        <p className="text-gray-600 mb-6">{initialLesson.description}</p>
      )}

      <h2 className="text-2xl font-semibold mb-2">
        Page {currentPage.pageNumber}: {currentPage.title || "Untitled"}
      </h2>

      {currentPage.content.html ? (
        <div
          className="mb-6"
          dangerouslySetInnerHTML={{ __html: currentPage.content.html }}
        />
      ) : currentPage.content.text ? (
        <p className="mb-6">{currentPage.content.text}</p>
      ) : (
        <p className="mb-6 text-gray-400">No content available</p>
      )}

      <div className="flex gap-4">
        {currentPageIndex > 0 && (
          <button
            onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Previous Page
          </button>
        )}
        {currentPageIndex < initialLesson.pages.length - 1 && (
          <button
            onClick={() => setCurrentPageIndex(currentPageIndex + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
}
