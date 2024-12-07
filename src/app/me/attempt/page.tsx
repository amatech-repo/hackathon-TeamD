"use client";

import React, { useState } from "react";

export default function AttemptPage() {
  const [viewMode, setViewMode] = useState<"sets" | "quizzes">("sets");

  const setsHistory = [
    { id: 1, name: "クイズセット1", date: "2023-12-01" },
    { id: 2, name: "クイズセット2", date: "2023-12-02" },
    { id: 3, name: "クイズセット3", date: "2023-12-03" },
    { id: 4, name: "クイズセット4", date: "2023-12-04" },
  ];

  const quizzesHistory = [
    { id: 1, name: "クイズ1", date: "2023-12-03" },
    { id: 2, name: "クイズ2", date: "2023-12-04" },
    { id: 3, name: "クイズ3", date: "2023-12-05" },
    { id: 4, name: "クイズ4", date: "2023-12-06" },
  ];

  const data = viewMode === "sets" ? setsHistory : quizzesHistory;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">履歴全体</h1>

      {/* 切り替えボタン */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            viewMode === "sets" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setViewMode("sets")}
        >
          クイズセット
        </button>
        <button
          className={`px-4 py-2 rounded ${
            viewMode === "quizzes" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setViewMode("quizzes")}
        >
          クイズ
        </button>
      </div>

      {/* 履歴表示 */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          {viewMode === "sets" ? "クイズセットの履歴" : "クイズの履歴"}
        </h2>
        <ul>
          {data.map((item) => (
            <li key={item.id} className="mb-2">
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
