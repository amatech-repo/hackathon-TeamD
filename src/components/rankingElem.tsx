"use client";

type RankingElemProps = {
  rank: number; // 順位
  name: string; // 名前
  score: number; // スコア
};

export function RankingElem({ rank, name, score }: RankingElemProps) {
  // ランクに応じた背景色
  const rankClass =
    rank === 1 ? "bg-yellow-100" : rank <= 3 ? "bg-blue-50" : "bg-gray-50";

  return (
    <li
      className={`shadow-lg rounded-lg p-4 mb-4 w-full max-w-md ${rankClass}`}
    >
      <div className="flex items-center justify-between">
        {/* 順位バッジ */}
        <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {rank}
        </span>

        {/* 名前 */}
        <span className="text-gray-700 font-semibold text-lg flex-grow pl-4">
          {name}
        </span>

        {/* スコア */}
        <div className="flex items-center">
          <span className="text-blue-600 font-bold text-lg mr-1">{score}</span>
          <span className="text-yellow-500">⭐</span>
        </div>
      </div>
    </li>
  );
}
