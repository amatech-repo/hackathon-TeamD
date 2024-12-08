"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

export default function QuizResultPage() {
  const router = useRouter();
  const { score, total } = useParams<{ score: string; total: string }>();

  if (!score || !total) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">結果発表</h1>
      <p className="text-lg mb-6">
        あなたのスコアは{" "}
        <span className="font-bold text-blue-600">{score}</span> / {total}{" "}
        です！
      </p>
      <button
        onClick={() => router.push("/quizsearch")}
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        タイトル選択に戻る
      </button>
    </div>
  );
}
