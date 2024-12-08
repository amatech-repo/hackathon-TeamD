"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

export default function ChallengePage() {
  const router = useRouter();
  const searchParams = useParams<{
    id?: string;
    title?: string;
    level?: string;
  }>();

  const id = searchParams.id;
  const title = searchParams.title;
  const level = searchParams.level;

  if (!id || !title || !level) {
    return <p>クイズ情報が見つかりません。</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <p className="mb-4">レベル: {level}</p>
      <p className="mb-6">このクイズセットに挑戦しましょう。</p>
      <button
        onClick={() => router.push(`/quizsearch/${id}`)}
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        クイズを開始する
      </button>
    </div>
  );
}
