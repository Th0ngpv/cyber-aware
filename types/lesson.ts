// src/types/lesson.ts
export interface QuizOption {
  text: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: QuizOption[];
  answer: string;
  createdAt: string;
  updatedAt: string;
}
