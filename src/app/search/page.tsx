"use client";

import React, { useState } from "react";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";

type QuizSet = {
  name: string;
  description: string;
};

export default function SearchPage() {
  const [searchResults, setSearchResults] = useState<QuizSet[]>([]); // 検索結果の型を指定
  const [isLoading, setIsLoading] = useState(false); // ローディング状態

  // クイズセット仮データ
  const quizSetData: QuizSet[] = [
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
      // クイズセットデータを検索
      const filteredResults = quizSetData.filter((item) =>
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
      <h1 className="text-3xl font-bold mb-6">クイズセット検索</h1>

      {/* 検索フォーム */}
      <SearchForm onSearch={handleSearch} />

      {/* 検索結果 */}
      <div className="mt-6">
        <SearchResults results={searchResults} isLoading={isLoading} />
      </div>
    </div>
  );
}
