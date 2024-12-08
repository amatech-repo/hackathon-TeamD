interface ISearchResultsProps {
  results: { name: string; description?: string }[]; // 仮データ用の型
  isLoading: boolean;
}

export default function SearchResults({
  results,
  isLoading,
}: ISearchResultsProps) {
  if (isLoading) {
    return <p className="text-gray-600">検索中...</p>;
  }

  if (results.length === 0) {
    return (
      <p className="text-gray-600" style={{ paddingLeft: "0.5rem" }}>
        検索結果が見つかりませんでした。
      </p>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">検索結果</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index} className="mb-4 p-4 bg-gray-100 rounded shadow">
            <p className="font-medium">{result.name || "クイズ名/セット名"}</p>
            <p className="text-sm text-gray-500">
              {result.description || "説明なし"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
