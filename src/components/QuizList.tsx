"use client";
import { useState } from "react";

// Define the types for Quiz
export interface QuizOption {
  text: string;
}

export interface QuizType {
  id: string;
  question: string;
  options: QuizOption[];
  answer: string;
}

interface QuizListProps {
  quizzes: QuizType[];
}

export default function QuizList({ quizzes }: QuizListProps) {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const quiz = quizzes[currentQuizIndex];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (option === quiz.answer) setScore(score + 1);
  };

  const handleNext = () => {
    setSelectedOption(null);
    setCurrentQuizIndex(currentQuizIndex + 1);
  };

  if (!quiz) return <div>All quizzes completed! Your score: {score}/{quizzes.length}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Quiz</h1>

      <h2 className="text-xl font-semibold mb-2">
        Question {currentQuizIndex + 1}: {quiz.question}
      </h2>

      <div className="flex flex-col gap-2 mb-4">
        {quiz.options.map((opt: QuizOption) => (
          <button
            key={opt.text}
            onClick={() => handleOptionClick(opt.text)}
            className={`px-4 py-2 rounded border ${
              selectedOption === opt.text
                ? opt.text === quiz.answer
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-background"
            }`}
            disabled={!!selectedOption}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {selectedOption && currentQuizIndex < quizzes.length - 1 && (
        <button
          onClick={handleNext}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next Question
        </button>
      )}
      
      {selectedOption && currentQuizIndex === quizzes.length - 1 && (
        <p className="text-lg font-semibold">
          Quiz Completed! Your score: {score}/{quizzes.length}
        </p>
      )}
    </div>
  );
}
