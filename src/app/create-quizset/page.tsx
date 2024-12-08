"use client";
import React, { useState } from "react";
import QuizComponent from "@/components/quizsetCreatorElem";

type Option = {
  text: string;
  isCorrect: boolean;
};

type Quiz = {
  question: string;
  options: Option[];
};

function QuizSet() {
  const [quizSet, setQuizSet] = useState<Quiz[]>([
    {
      question: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    },
  ]);

  const handleAddQuiz = () => {
    const newQuiz: Quiz = {
      question: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
    };
    setQuizSet([...quizSet, newQuiz]);
  };

  const handleUpdateQuiz = (index: number, updatedQuiz: Quiz) => {
    const newQuizSet = [...quizSet];
    newQuizSet[index] = updatedQuiz;
    setQuizSet(newQuizSet);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/quizset/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizSet),
      });
      if (!response.ok) {
        throw new Error("Failed to submit quiz set");
      }
      console.log("Quiz set submitted successfully");
    } catch (error) {
      console.error("Error submitting quiz set:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">クイズセット</h1>
        {quizSet.map((quiz, index) => (
          <QuizComponent
            key={index}
            quiz={quiz}
            onUpdate={(updatedQuiz) => handleUpdateQuiz(index, updatedQuiz)}
          />
        ))}
        <button
          onClick={handleAddQuiz}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          クイズを追加
        </button>
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          クイズセットを送信
        </button>
      </div>
    </div>
  );
}

export default QuizSet;
