import React from "react";
import Link from "next/link";

interface IUserHistoryProps {
  mode: "sets" | "quizzes";
}

export default function UserHistory({ mode }: IUserHistoryProps) {
  const setsHistory = [
    { id: 1, name: "クイズセット1", date: "2023-12-01" },
    { id: 2, name: "クイズセット2", date: "2023-12-02" },
  ];

  const quizzesHistory = [
    { id: 1, name: "クイズ1", date: "2023-12-03" },
    { id: 2, name: "クイズ2", date: "2023-12-04" },
  ];

  const data = mode === "sets" ? setsHistory : quizzesHistory;

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        {mode === "sets" ? "クイズセットの履歴" : "クイズの履歴"}
      </h2>
      <ul>
        {data.map((item) => (
          <li key={item.id} className="mb-2">
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">{item.date}</p>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <Link
          href="/me/attempt"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          もっと見る
        </Link>
      </div>
    </div>
  );
}
