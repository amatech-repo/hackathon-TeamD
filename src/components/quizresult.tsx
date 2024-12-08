import React from "react";

interface IQuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export default function QuizResult({
  score,
  totalQuestions,
  onRestart,
}: IQuizResultProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full text-center">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">結果発表</h2>
      <p className="text-lg">
        あなたのスコアは{" "}
        <span className="font-bold text-blue-600">{score}</span> /{" "}
        {totalQuestions} です！
      </p>
      <button
        onClick={onRestart}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        もう一度挑戦
      </button>
    </div>
  );
}
