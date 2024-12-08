"use client";

import React, { useState } from "react";
import UserProfile from "../../components/UserProfile";
import UserHistory from "../../components/UserHistory";
import ConfirmationModal from "../../components/ConfirmationModal";
import Link from "next/link";

export default function MyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"sets" | "quizzes">("sets");

  const handleDeleteUser = () => {
    console.log("ユーザー削除");
    setIsModalOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">マイページ</h1>

      {/* ユーザープロファイル */}
      <UserProfile onDelete={() => setIsModalOpen(true)} />

      {/* 履歴表示の切り替え */}
      <div className="mt-6">
        <div className="flex gap-4 mb-4">
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
        <UserHistory mode={viewMode} />
      </div>

      {/* ユーザー削除とログアウト */}
      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          ユーザー削除
        </button>
        <Link
          href="/logout"
          className="px-6 py-2 bg-red-500 text-white text-center rounded shadow hover:bg-red-600 transition"
        >
          ログアウト
        </Link>
      </div>

      {/* 削除確認モーダル */}
      {isModalOpen && (
        <ConfirmationModal
          message="本当にユーザーを削除しますか？"
          onConfirm={handleDeleteUser}
          onCancel={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
