// src/app/lessons/page.jsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LessonsPage() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    fetch("/api/lessons")
      .then(res => res.json())
      .then(data => setLessons(data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Lessons</h1>
      {lessons.length === 0 ? (
        <p>No lessons found.</p>
      ) : (
        lessons.map(lesson => (
          <div key={lesson.id} className="p-4 border rounded mb-2">
            <Link href={`/lessons/${lesson.slug}`} className="font-semibold text-blue-600">
              {lesson.title}
            </Link>
            <p>{lesson.content || "No content yet."}</p>
          </div>
        ))
      )}
    </div>
  );
}
