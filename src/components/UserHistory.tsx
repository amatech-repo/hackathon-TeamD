import React, { useState } from "react";

interface IUserHistoryProps {
  mode: "sets" | "quizzes";
}

export default function UserHistory({ mode }: IUserHistoryProps) {
  const setsHistory = [
    { username: "ユーザー1", score: 80 },
    { username: "ユーザー2", score: 90 },
    { username: "ユーザー6", score: 70 },
    { username: "ユーザー7", score: 85 },
  ];

  const quizzesHistory = [
    { username: "ユーザー3", score: 85 },
    { username: "ユーザー4", score: 95 },
    { username: "ユーザー5", score: 78 },
    { username: "ユーザー8", score: 88 },
  ];

  const [visibleCount, setVisibleCount] = useState(2);
  const data = mode === "sets" ? setsHistory : quizzesHistory;

  const handleShowMore = () => {
    setVisibleCount(data.length); // 全て表示
  };

  const handleShowLess = () => {
    setVisibleCount(2); // 初期表示に戻す
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        {mode === "sets" ? "クイズセットの履歴" : "クイズの履歴"}
      </h2>
      <ul>
        {data.slice(0, visibleCount).map((item, index) => (
          <li key={index} className="mb-2">
            <p className="font-medium">ユーザー名: {item.username}</p>
            <p className="text-sm text-gray-500">スコア: {item.score}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        {visibleCount < data.length ? (
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            もっと見る
          </button>
        ) : (
          <button
            onClick={handleShowLess}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            戻す
          </button>
        )}
      </div>
    </div>
  );
}
