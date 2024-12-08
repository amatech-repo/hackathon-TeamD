"use client";

import React from "react";
import Link from "next/link";

const quizSets = [
  { id: "1", title: "数学クイズセット", level: 3 },
  { id: "2", title: "歴史クイズセット", level: 4 },
  { id: "3", title: "科学クイズセット", level: 5 },
];

export default function QuizSearchPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">クイズタイトル選択</h1>
      <ul className="space-y-4">
        {quizSets.map((quizSet) => (
          <li key={quizSet.id}>
            <Link
              href={`/quizsearch/challenge?id=${quizSet.id}&title=${encodeURIComponent(
                quizSet.title,
              )}&level=${quizSet.level}`}
              className="block px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {quizSet.title} (レベル: {quizSet.level})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
