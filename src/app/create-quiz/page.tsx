"use client";
import React, { useState } from "react";
import QuizComponent from "@/components/quizCreatorElem";

type Option = {
  text: string;
  isCorrect: boolean;
};

type Quiz = {
  question: string;
  options: Option[];
};

function QuizList() {
  // 1問のクイズを初期状態として設定
  const [quiz, setQuiz] = useState<Quiz>({
    question: "",
    options: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
  });

  // クイズ更新処理
  const handleUpdateQuiz = (updatedQuiz: Quiz) => {
    setQuiz(updatedQuiz);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white p-6 shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">クイズ問題</h1>
        {/* 1問のみ表示する */}
        <QuizComponent quiz={quiz} onUpdate={handleUpdateQuiz} />
      </div>
    </div>
  );
}

export default QuizList;
