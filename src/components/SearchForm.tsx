import React, { useState } from "react";

interface ISearchFormProps {
  onSearch: (searchQuery: {
    mode: "quiz" | "quiz-set";
    searchQuery: string;
    tag?: string;
    level: string;
  }) => void;
}

export default function SearchForm({ onSearch }: ISearchFormProps) {
  const [mode, setMode] = useState<"quiz" | "quiz-set">("quiz");
  const [searchQuery, setSearchQuery] = useState("");
  const [tag, setTag] = useState("");
  const [level, setLevel] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      mode,
      searchQuery,
      tag: mode === "quiz-set" ? tag : undefined,
      level,
    });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded-lg"
      >
        {/* ワード検索 */}
        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-700">
            ワード検索
          </label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-md text-lg"
            placeholder="検索ワードを入力"
          />
        </div>

        {/* タグ・レベル */}
        <div className="flex gap-4 mb-6">
          {/* タグ入力 */}
          {mode === "quiz-set" && (
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">
                タグ
              </label>
              <input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="mt-1 block w-full p-1.5 border border-gray-300 rounded-md text-sm"
                placeholder="タグを入力"
              />
            </div>
          )}

          {/* レベル選択 */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">
              レベル
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              {[...Array(7).keys()].map((i) => (
                <option key={i} value={i + 1}>
                  レベル {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 検索ボタン */}
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          検索
        </button>
      </form>
    </div>
  );
}
