"use client";

import { useState } from "react";

export default function QuizPage({ params }) {
  const { slug } = params;
  const [submitted, setSubmitted] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Quiz for {slug}</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            Your Answer:
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="border p-2 w-full mt-1"
            />
          </label>
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Submit
          </button>
        </form>
      ) : (
        <p className="text-green-600">Thanks! Your answer has been submitted.</p>
      )}
    </div>
  );
}
