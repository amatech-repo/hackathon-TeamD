import React, { useState } from "react";

interface IUserProfileProps {
  onDelete: () => void;
}

export default function UserProfile({ onDelete }: IUserProfileProps) {
  const [username, setUsername] = useState("ユーザー名");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // 保存処理を追加（例: API呼び出し）
    setTimeout(() => {
      console.log("ユーザー名が保存されました:", username);
      setIsSaving(false);
    }, 1000);
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">プロフィール</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          ユーザー名
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">ID</label>
        <input
          type="text"
          value="12345"
          disabled
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Eメール
        </label>
        <input
          type="email"
          value="user@example.com"
          disabled
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-100"
        />
      </div>
      <button
        onClick={handleSave}
        disabled={isSaving}
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        {isSaving ? "保存中..." : "保存"}
      </button>
    </div>
  );
}
