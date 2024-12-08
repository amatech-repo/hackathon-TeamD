"use client";

import React, { useState } from "react";
import Quiz from "../../components/quiz";
import QuizResult from "../../components/quizresult";

const quizData = [
  {
    question: "Reactはライブラリですか？",
    options: [
      { text: "はい", isCorrect: true },
      { text: "いいえ", isCorrect: false },
    ],
  },
  {
    question: "JavaScriptのファイル拡張子は？",
    options: [
      { text: ".java", isCorrect: false },
      { text: ".js", isCorrect: true },
      { text: ".jsx", isCorrect: false },
      { text: ".json", isCorrect: false },
    ],
  },
  {
    question: "HTMLの略は？",
    options: [
      { text: "Hyper Text Makeup Language", isCorrect: false },
      { text: "Hyper Text Markup Language", isCorrect: true },
      { text: "High Text Makeup Language", isCorrect: false },
      { text: "Hyper Tool Markup Language", isCorrect: false },
    ],
  },
];

export default function QuizzesPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quizData.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {showResult ? (
        <QuizResult
          score={score}
          totalQuestions={quizData.length}
          onRestart={handleRestart}
        />
      ) : (
        <Quiz
          questionData={quizData[currentQuestionIndex]}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
}
