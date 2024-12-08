"use client";

import React, { useEffect, useState } from "react";
import { RankingElem } from "@/components/rankingElem"; // 先ほど作成したコンポーネントをインポート

type RankingData = {
  name: string;
  score: number;
}[];

export default function RankingPage() {
  const [rankingData, setRankingData] = useState<RankingData>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // モックデータを使用
    const fetchMockRankingData = async () => {
      try {
        // データ取得のシミュレーション
        // api/ranking
        const mockData: RankingData = [
          { name: "Alice", score: 95 },
          { name: "Bob", score: 90 },
          { name: "Charlie", score: 85 },
          { name: "Dave", score: 80 },
          { name: "Eve", score: 75 },
        ];

        // 擬似的な遅延を追加
        await new Promise((resolve) => setTimeout(resolve, 100));

        setRankingData(mockData);
      } catch (err) {
        setError("モックデータの取得に失敗しました。");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMockRankingData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">ランキング</h1>
      {isLoading ? (
        <p>読み込み中...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul className="flex flex-col items-center w-full">
          {rankingData.map((item, index) => (
            <RankingElem
              rank={index + 1}
              name={item.name}
              score={item.score}
              key={index}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
