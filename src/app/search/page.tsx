"use client";

import React, { useState } from "react";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState([]); // 検索結果
  const [isLoading, setIsLoading] = useState(false); // ローディング状態
  const [mode, setMode] = useState<"quiz" | "quiz-set">("quiz"); // クイズモードの管理

  // クイズ仮データ
  const quizData = [
    { name: "クイズ1", description: "基本的な数学クイズです" },
    { name: "クイズ2", description: "歴史に関するクイズ" },
    { name: "クイズ3", description: "科学に関する基礎クイズ" },
    { name: "クイズ4", description: "スポーツに関するクイズ" },
    { name: "クイズ5", description: "文学に関するクイズ" },
  ];

  // クイズセット仮データ
  const quizSetData = [
    { name: "クイズセット1", description: "数学クイズのセット" },
    { name: "クイズセット2", description: "世界史クイズセット" },
    { name: "クイズセット3", description: "科学クイズセット" },
    { name: "クイズセット4", description: "スポーツクイズセット" },
    { name: "クイズセット5", description: "文学クイズセット" },
  ];

  const handleSearch = async (searchQuery: {
    searchQuery: string;
    level: string;
  }) => {
    setIsLoading(true);

    try {
      // 選択されたモードに応じてデータを選択
      const dataToSearch = mode === "quiz" ? quizData : quizSetData;

      // 検索条件に一致するデータをフィルタリング
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const filteredResults: any = dataToSearch.filter((item) =>
        item.name.includes(searchQuery.searchQuery),
      );

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("検索エラー:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">クイズ検索</h1>

      {/* モード切り替え */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            mode === "quiz" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("quiz")}
        >
          クイズ
        </button>
        <button
          className={`px-4 py-2 rounded ${
            mode === "quiz-set" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("quiz-set")}
        >
          クイズセット
        </button>
      </div>

      {/* 検索フォーム */}
      <SearchForm onSearch={handleSearch} />

      {/* 検索結果 */}
      <div className="mt-6">
        <SearchResults results={searchResults} isLoading={isLoading} />
      </div>
    </div>
  );
}
